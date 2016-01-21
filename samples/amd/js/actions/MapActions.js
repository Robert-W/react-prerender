define(['exports', 'js/constants/AppConstants', 'js/dispatcher', 'js/utils/params', 'esri/map'], function (exports, _jsConstantsAppConstants, _jsDispatcher, _jsUtilsParams, _esriMap) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _EsriMap = _interopRequireDefault(_esriMap);

  var MapActions = {
    /**
    * Simple method to create a new Map
    * @param {object} mapConfig - config object containing id and options
    * @return {Promise} deferred - Promise that resolves on map load event
    */
    createMap: function createMap(mapConfig) {
      app.debug('MapActions >>> createMap');
      var basemap = (0, _jsUtilsParams.getUrlParams)(location.href)[_jsConstantsAppConstants.MAP.basemap];
      if (basemap) {
        mapConfig.options.basemap = basemap;
      }
      var deferred = new Promise(function (resolve) {
        app.map = new _EsriMap['default'](mapConfig.id, mapConfig.options);
        app.map.on('load', function () {
          resolve();
        });
      });

      return deferred;
    },

    /**
    * Method to update the basemap
    * @param {string} basemap - the value of the basemap to be updated, should come from config.js basemaps
    */
    setBasemap: function setBasemap(basemap) {
      app.debug('MapActions >>> setBasemap');
      app.map.setBasemap(basemap);
      _jsDispatcher.Dispatcher.dispatch({
        actionType: _jsConstantsAppConstants.MAP.basemap,
        data: basemap
      });
    }

  };
  exports.MapActions = MapActions;
});