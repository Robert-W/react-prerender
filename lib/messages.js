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
    cannotGenerateMarkup: function (error) {
      error.message = 'Unable to render your component to a string. ' + error.message;
      return error;
    },
    cannotRenderToFile: function (error) {
      error.message = 'Unable to render to the configured target. ' + error.message;
      return error;
    }
  },

  moduleRemapFoundNone: 'We could not find any modules matching the pattern you provided.  We are trying anyway but you may want to check your \'ignorePatterns\'',
  htmlFileNotFound: function (file) {
    return 'Cannot render to ' + file + '. File does not exist.  Check your path configuration.';
  },
  domNodeNotFound: function (domNode) {
    return 'Cannot inject component into node ' + domNode + '. Node does not exist in your html file.  Check your configuration.';
  },
  referToDocumentation: function (id) {
    return 'If you are unsure why you are seeing this error, please refer to the documentation. https://github.com/Robert-W/react-prerender#' + id;
  }
};
