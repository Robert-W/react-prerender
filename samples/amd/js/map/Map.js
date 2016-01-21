define(['exports', 'js/actions/MapActions', 'js/map/BasemapGallery', 'js/config', 'js/map/Loader', 'react'], function (exports, _jsActionsMapActions, _jsMapBasemapGallery, _jsConfig, _jsMapLoader, _react) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var Map = (function (_React$Component) {
    _inherits(Map, _React$Component);

    function Map(props) {
      _classCallCheck(this, Map);

      _get(Object.getPrototypeOf(Map.prototype), 'constructor', this).call(this, props);
      this.state = { loaded: false };
    }

    _createClass(Map, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this = this;

        _jsActionsMapActions.MapActions.createMap(_jsConfig.mapConfig).then(function () {
          _this.setState({ loaded: true });
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var widgets = [_React['default'].createElement(_jsMapBasemapGallery.BasemapGallery, { basemaps: _jsConfig.basemaps })];

        return _React['default'].createElement(
          'div',
          { className: 'map', id: _jsConfig.mapConfig.id },
          _React['default'].createElement(_jsMapLoader.Loader, { text: 'loading...', visible: !this.state.loaded }),
          !this.state.loaded ? null : widgets
        );
      }
    }]);

    return Map;
  })(_React['default'].Component);

  exports.Map = Map;
});