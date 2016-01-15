var ReactDomServer = require('react-dom/server');
var cheerio = require('cheerio');
var React = require('react');
var madge = require('madge');
var fs = require('fs');

module.exports = {
  /**
  * Generate a remap object for requirejs to have it ignore certain dependencies that are not needed
  * for rendering and are not local, which throw module not found errors when trying to prerender
  * @param {string} rootModulePath - Path to the main module
  * @param {string} remapModule - Module to remap modules to that have remote dependencies, this one should have none
  * @param {string|array} ignores - string or array of search terms that will be used to find files to be remapped
  * @return {object} map - map of files to be remapped
  * Example output:
  * {
  *   'esri/map': 'js/config',
  *   'dojo/Deferred': 'js/config'
  * }
  */
  generateRemap: function (rootModulePath, remapModule, ignores) {
    var tree = madge(rootModulePath, { format: 'amd' }).tree,
        files = [],
        map = {};

    //- filter function to remove files that match the ignores
    var filter = function filter (filepath) {
      if (typeof ignores === 'string') {
        return filepath.search(ignores) > -1;
      } else {
        return ignores.some(function (str) { return filepath.search(str) > -1; });
      }
    };

    //- Create an array of paths that need to be ignored
    for (var dependency in tree) {
      files = files.concat(tree[dependency].filter(filter));
    }

    //- Create a map of paths to ignore mapped to the remapModule
    files.forEach(function (filepath) {
      map[filepath] = remapModule;
    });

    return map;
  },

  /**
  * Generate and return Static Markup of components
  * @return {string} html markup from prerendered component
  */
  generateMarkup: function (module) {
    return ReactDomServer.renderToStaticMarkup(React.createFactory(module)());
  },

  /**
  * Read a Require.js build profile and return the config from it, use with caution
  * @param {string} profilePath - path to build profile containing baseUrl and paths
  * NOTE:
  * This may be changed if there are better ways to get this config without
  * eval and recreating it manually, for now this works
  */
  getRequireConfig: function (profilePath) {
    var profile = fs.readFileSync(profilePath, 'utf-8');
    return eval(profile);
  },

  /**
  * Read the html file, inject some markup, and write back to the same file
  * @param {string} filepath
  * @param {string} markup - static markup of component
  * @param {string} mountNode - id of node to mount react component into
  */
  renderToFile: function (filepath, markup, mountNode) {
    try {
      var file = fs.readFileSync(filepath, 'utf-8');
      var $ = cheerio.load(file);
      $('#' + mountNode).append(markup);
      fs.writeFileSync(filepath, $.html());
    } catch (err) {
      console.error(err);
    }
    console.log('Prerendered into ' + filepath + ' successfully');
  }
};
