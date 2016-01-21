define(['exports', 'babel-polyfill', 'js/config', 'js/layout/App', 'react-dom', 'react'], function (exports, _babelPolyfill, _jsConfig, _jsLayoutApp, _reactDom, _react) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

  var _ReactDOM = _interopRequireDefault(_reactDom);

  var _React = _interopRequireDefault(_react);

  if (!_babelPolyfill2['default']) {
    console.error('Error: babel-polyfill could not be detected.');
  }

  // Set up globals
  window.app = {
    debugEnabled: true,
    debug: function debug(message) {
      if (this.debugEnabled) {
        var print = typeof message === 'string' ? console.log : console.dir;
        print.apply(console, [message]);
      }
    }
  };

  // Shim for rAF with timeout for callback
  window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  /**
  * @param {string} url - Url of resource to be loaded
  */
  var loadCss = function loadCss(url) {
    var sheet = document.createElement('link');
    sheet.rel = 'stylesheet';
    sheet.type = 'text/css';
    sheet.href = url;
    requestAnimationFrame(function () {
      document.getElementsByTagName('head')[0].appendChild(sheet);
    });
  };

  var lazyloadStylesheets = function lazyloadStylesheets() {
    app.debug('main >>> lazyloadStylesheets');
    loadCss(_jsConfig.arcgisConfig.css);
    loadCss('css/app.css');
  };

  var configureApp = function configureApp() {
    app.debug('main >>> configureApp');
    // Setup defaults such as esri proxy url or cors enabled servers
  };

  var initializeApp = function initializeApp() {
    app.debug('main >>> initializeApp');
    _ReactDOM['default'].render(_React['default'].createElement(_jsLayoutApp.App, null), document.body);
  };

  lazyloadStylesheets();
  configureApp();
  initializeApp();
});