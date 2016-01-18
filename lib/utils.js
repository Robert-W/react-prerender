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

  loadBuildProfile: function () {

  },

  generateRemap: function () {

  },

  generateMarkup: function () {

  },

  renderIntoFile: function () {

  }

};
