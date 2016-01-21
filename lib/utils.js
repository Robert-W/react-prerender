var ReactDomServer = require('react-dom/server');
var messages = require('./messages');
var cheerio = require('cheerio');
var React = require('react');
var madge = require('madge');
var fs = require('fs');
/**
* Return data type of the arg
* @param {AnyObject} arg
* @return {string} ex. "[object Object]"
*/
var type = function type (arg) {
  return Object.prototype.toString.call(arg);
};

/**
* Type Constants
*/
var TYPES = {
  STRING: '[object String]',
  OBJECT: '[object Object]',
  REGEXP: '[object RegExp]',
  ARRAY: '[object Array]'
};

module.exports = {

  /**
  * Checks for mount, target, and component since they are the minimum required options
  * Also checks to make sure they are the correct type
  * @param {object} options
  * @return {bool}
  */
  optionsAreValid: function (options) {
    return options.mount && options.target && options.component
      && type(options.component) === TYPES.STRING
      && type(options.target) === TYPES.STRING
      && type(options.mount) === TYPES.STRING;
  },

  /**
  * Checks for baseUrl and paths or a build profile at minimum
  * Also checks to make sure they are the correct type
  * @param {object} options
  * @return {bool}
  */
  requirejsOptionsAreValid: function (options) {
    return (
        options.paths
        && options.baseUrl
        && type(options.paths) === TYPES.OBJECT
        && type(options.baseUrl) === TYPES.STRING
      ) || (
        options.buildProfile
        && type(options.buildProfile) === TYPES.STRING
    );
  },

  /**
  * Checks for moduleRoot, remapModule, and ignorePatterns at minimum
  * Also checks to make sure they are the correct type
  * @param {object} options
  * @return {bool}
  */
  mapOptionsAreValid: function (options) {
    return options.moduleRoot && options.remapModule && options.ignorePatterns
      && type(options.moduleRoot) === TYPES.STRING
      && type(options.remapModule) === TYPES.STRING
      && (
        (type(options.ignorePatterns) === TYPES.STRING || type(options.ignorePatterns) === TYPES.REGEXP)
        ||
        (
          type(options.ignorePatterns) === TYPES.ARRAY
          && options.ignorePatterns.every(function (pattern) {
            return type(pattern) === TYPES.STRING || type(pattern) === TYPES.REGEXP;
          })
        )
      );
  },

  /**
  * Load and attempt to evaluate a requirejs build profile
  * @param {string} path path to a requirejs build profile
  * @return {object} requirejsConfig
  */
  loadBuildProfile: function (path) {
    var profile;
    try {
      profile = eval(fs.readFileSync(path, 'utf-8'));
    } catch (err) {
      // set profile to empty, check in prerender will throw an error
      // if no path or baseUrl is present
      profile = {};
    }
    return profile;
  },

  /**
  * Generate a map object that maps all modules matching the ignores pattern to the emptyModule
  * @param {string} moduleRoot - base dir of your modules
  * @param {string} remapModule - path to empty module (by empty module I mean a dependency free module)
  * @param {string|array} ignores - RegEx patterns or basic strings to include in the map
  * @return {object} map
  */
  generateRemap: function (moduleRoot, remapModule, ignores) {
    var tree = madge(moduleRoot, { format: 'amd' }).tree,
        paths = [],
        map = {};

    /**
    * Filter function to test module paths, ignores can be array[string|regexp]|string|regexp
    * @param {string} path - module path
    */
    var matches = function matches (path) {
      if (type(ignores) === TYPES.STRING) {
        return path.search(ignores) > -1;
      } else if (type(ignores) === TYPES.REGEXP) {
        return ignores.test(path);
      } else {
        return ignores.some(function (ignore) {
          return type(ignore) === TYPES.STRING ? (path.search(ignore) > -1) : ignore.test(path);
        });
      }
    };

    //- Generate an array of paths to ignore
    for (var dependency in tree) {
      paths = paths.concat(tree[dependency].filter(matches));
    }

    if (paths.length === 0) {
      console.warn(messages.moduleRemapFoundNone);
    }

    //- Put in a format requirejs can understand
    paths.forEach(function (path) {
      map[path] = remapModule;
    });

    return map;
  },

  /**
  * Generate a string representation of a react component
  * @param {function} component - react component
  * @param {object} props - default props to pass in to the component
  * @return {string} string representation of your component
  */
  generateMarkup: function (component, props) {
    var Component = React.createFactory(component);
    return ReactDomServer.renderToStaticMarkup(Component(props || {}));
  },

  /**
  * Insert the string into the target html file at the mount point
  * @param {string} target - path to html file
  * @param {string} mount - query for a dom node that the component will be injected into
  * @param {string} component - string representation of a react component
  */
  renderIntoFile: function (target, mount, component) {
    var file = fs.readFileSync(target, 'utf-8');
    var $ = cheerio.load(file);
    //- returns true if any of the elements match mount, so throw if false
    if (!$(mount).is(mount)) { throw messages.errors.domNodeNotFound(mount); }
    //- write to html
    $(mount).append(component);
    fs.writeFileSync(target, $.html());
  }

};
