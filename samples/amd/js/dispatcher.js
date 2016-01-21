define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var callbacks = {};
  var prefix = '_';
  var count = 1;

  var Dispatcher = {

    /**
    * Register callbacks to the dispatcher
    * @param {function} callback - The callback were registering
    * @return {number} index of callback
    */
    register: function register(callback) {
      var id = prefix + count++;
      callbacks[id] = callback;
      return id;
    },

    /**
    * Dispatch a payload from an action
    * @param {object} payload - Data coming from an action
    */
    dispatch: function dispatch(payload) {
      for (var id in callbacks) {
        callbacks[id](payload);
      }
    }

  };
  exports.Dispatcher = Dispatcher;
});