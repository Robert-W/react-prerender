/**
* This module cotains all the messaging produced by the script
*/
module.exports = {

  errors: {
    invalidArgument: function () {
      return new Error('Invalid Arguments: react-prerender takes an options object as it\'s only argument.');
    },
    invalidOptions: function () {
      return new Error('You are missing some required configurations.');
    },
    invalidRequireConfig: function () {
      return new Error('You are missing some required configurations for requirejs to work properly.');
    },
    cannotLoadProfile: function (path) {
      return new Error('Unable to load ' + path + '. Please check you \'buildProfile\' configuration.');
    },
    domNodeNotFound: function (domNode) {
      return new Error('Cannot inject component into html. ' + domNode + ' found no nodes in your html file.  Check your configuration.');
    }
  },

  moduleRemapFoundNone: 'We could not find any modules matching the pattern you provided.  We are trying anyway but you may want to check your \'ignorePatterns\'',
  htmlFileNotFound: function (file) {
    return 'Cannot render to ' + file + '. File does not exist.  Check your path configuration.';
  },
  referToDocumentation: function (id) {
    return 'If you are unsure why you are seeing this error, please refer to the documentation. https://github.com/Robert-W/react-prerender#' + id;
  }
};
