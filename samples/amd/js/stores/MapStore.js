define(['exports', 'module', 'js/constants/AppConstants', 'js/dispatcher'], function (exports, module, _jsConstantsAppConstants, _jsDispatcher) {
  'use strict';

  var store = {};
  var callbacks = [];

  /**
  * @param {string} key - name of property in the store
  * @param {AnyObject} value - value to be stored
  */
  var set = function set(key, value) {
    store[key] = value;
  };
  /**
  * Update anyone observing this store
  */
  var emit = function emit() {
    callbacks.forEach(function (observer) {
      observer();
    });
  };

  module.exports = {
    /**
    * Get value of a property from the store
    * @param {string} key - name of property in the store
    * @return {any object} - value stored
    */
    get: function get(key) {
      return store[key];
    },
    /**
    * Stringify the store for debugging
    * @return {string} Stringified version of the store
    */
    debug: function debug() {
      return JSON.stringify(store);
    },
    /**
    * Register a observer for the store
    * @param {function} callback - callback function to invoke when the store changes
    */
    registerCallback: function registerCallback(callback) {
      callbacks.push(callback);
    }
  };

  _jsDispatcher.Dispatcher.register(function (payload) {

    switch (payload.actionType) {
      case _jsConstantsAppConstants.MAP.basemap:
        set(_jsConstantsAppConstants.MAP.basemap, payload.data);
        emit();
        break;
    }
  });
});