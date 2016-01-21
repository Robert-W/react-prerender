define(['exports', 'js/actions/MapActions', 'js/constants/AppConstants', 'js/map/BasemapGalleryItem', 'js/stores/MapStore', 'react'], function (exports, _jsActionsMapActions, _jsConstantsAppConstants, _jsMapBasemapGalleryItem, _jsStoresMapStore, _react) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _BasemapGalleryItem = _interopRequireDefault(_jsMapBasemapGalleryItem);

  var _MapStore = _interopRequireDefault(_jsStoresMapStore);

  var _React = _interopRequireDefault(_react);

  var getCurrentBasemap = function getCurrentBasemap() {
    return _MapStore['default'].get(_jsConstantsAppConstants.MAP.basemap) || app.map.getBasemap();
  };

  var BasemapGallery = (function (_React$Component) {
    _inherits(BasemapGallery, _React$Component);

    function BasemapGallery(props) {
      _classCallCheck(this, BasemapGallery);

      _get(Object.getPrototypeOf(BasemapGallery.prototype), 'constructor', this).call(this, props);
      this.state = {
        open: false,
        activeBasemap: getCurrentBasemap()
      };
    }

    _createClass(BasemapGallery, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        _MapStore['default'].registerCallback(this.storeDidUpdate.bind(this));
      }
    }, {
      key: 'storeDidUpdate',
      value: function storeDidUpdate() {
        this.setState({ activeBasemap: getCurrentBasemap() });
      }
    }, {
      key: 'render',
      value: function render() {
        return _React['default'].createElement(
          'div',
          { className: 'map-buttons basemap-gallery' + (this.state.open ? ' open' : '') },
          _React['default'].createElement(
            'div',
            { className: 'basemap-gallery-icon pointer', onClick: this.toggleGallery.bind(this) },
            'BG'
          ),
          _React['default'].createElement(
            'ul',
            { className: 'basemap-gallery-list' },
            this.renderBasemapItems(this.props.basemaps)
          )
        );
      }
    }, {
      key: 'renderBasemapItems',
      value: function renderBasemapItems(basemaps) {
        var _this = this;

        if (!basemaps) {
          return null;
        }
        return basemaps.map(function (basemap) {
          return _React['default'].createElement(_BasemapGalleryItem['default'], {
            value: basemap.value,
            label: basemap.label,
            iconClass: basemap.iconClass,
            click: _this.onSelect,
            active: _this.state.activeBasemap === basemap.value
          });
        });
      }
    }, {
      key: 'toggleGallery',
      value: function toggleGallery() {
        this.setState({ open: !this.state.open });
      }
    }, {
      key: 'onSelect',
      value: function onSelect(basemap) {
        _jsActionsMapActions.MapActions.setBasemap(basemap);
      }
    }]);

    return BasemapGallery;
  })(_React['default'].Component);

  exports.BasemapGallery = BasemapGallery;
});