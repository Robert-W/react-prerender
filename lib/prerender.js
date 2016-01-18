var requirejs = require('requirejs');
var messages = require('./messages');
var utils = require('./utils');
var path = require('path');

/**
* Prerender function
* @param {object} options - Configuration for the prerender script
* @param {string} options.target - Html file the script will target, it will read it and append to it, should not be your source html
* @param {string} options.component - Path to your component, if using requirejs or amd, its relative to your baseUrl
* @param {string} options.mount - String ID of the dom node your component is mounting to
* @param {object=} options.props - default props for your component
* @param {string=} options.exportName - If your using babel, and your component is not the default export then provide it here, default is default, then the name of the file
* @param {object=} options.requirejs - requirejs configuration
* @param {object=} options.requirejs.paths - path/package configuration
* @param {string=} options.requirejs.baseUrl - baseUrl of your paths/packages
* @param {string=} options.requirejs.buildProfile - path to your build profile, must have baseUrl and paths
* @param {string=} options.requirejs.map.moduleRoot - root of your js modules
* @param {string=} options.requirejs.map.remapModule - dependency free module to remap cdn modules
* @param {string|array[string|RegEx]=} options.requirejs.map.ignorePatterns - patterns of modules that are not available locally, cdn, or runtime loaded modules
*/
module.exports = function (options) {
  'use strict';

  var useRequirejs = false,
      component,
      markup,
      cwd;

  cwd = process.cwd();

  if (typeof options !== 'object') {
    throw messages.errors.invalidArgument();
  }

  // bail if options are not valid
  if (!utils.optionsAreValid(options)) {
    throw messages.errors.invalidOptions();
  }

  useRequirejs = typeof options.requirejs === 'object';

  // if we need requirejs, make sure we have the proper configurations
  if (useRequirejs && !utils.requirejsOptionsAreValid(options.requirejs)) {
    throw messages.errors.invalidRequireConfig();
  }

  // Generate requirejs config & setup requirejs
  if (useRequirejs) {
    var buildProfile = options.requirejs.buildProfile,
        mapConfig = options.requirejs.map,
        requirejsConfig = {},
        profile,
        baseUrl,
        paths;

    // evaluate the build profile and build some config
    if (buildProfile) {
      profile = utils.loadBuildProfile(path.join(cwd, buildProfile));
      baseUrl = profile.baseUrl;
      paths = profile.paths;
    } else {
      baseUrl = options.requirejs.baseUrl;
      paths = options.requirejs.paths;
    }

    // generate map if necessary for cdn, or locally unavaiable modules
    if (typeof mapConfig === 'object' && utils.mapOptionsAreValid(mapConfig)) {
      var modulesBase = path.join(cwd, mapConfig.moduleRoot);
      requirejsConfig.map = {
        '*': utils.generateRemap(modulesBase, mapConfig.remapModule, mapConfig.ignorePatterns)
      };
    }

    // configure requirejs
    requirejsConfig.nodeRequire = require;
    requirejsConfig.baseUrl = path.join(cwd, baseUrl);
    requirejsConfig.paths = paths;
    requirejs(requirejsConfig);

    // load the component
    component = requirejs(options.component);

  } else {
    component = require(options.component);
  }

  // try to parse the component and generate markup
  if (typeof component !== 'function') {
    // try to use the exportName if it is provided
    if (options.exportName && typeof component[options.exportName] === 'function') {
      component = component[options.exportName];
    // es6 default exports in babel > 6.0 export to default property in object in node.
    // e.g. { default: function () {...} }
    } else if (typeof component.default === 'function') {
      component = component.default;
    }
  }

  try {
    markup = utils.generateMarkup(component);
  } catch (err) {
    throw utils.cannotGenerateMarkup(err);
  }

  try {
    var target = path.join(cwd, options.target);
    utils.renderIntoFile(target, options.mount, markup);
  } catch (err) {
    throw utils.cannotRenderToFile(err);
  }

};
