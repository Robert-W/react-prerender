define(['exports', 'module', 'react'], function (exports, module, _react) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var BasemapGalleryItem = (function (_React$Component) {
    _inherits(BasemapGalleryItem, _React$Component);

    function BasemapGalleryItem() {
      _classCallCheck(this, BasemapGalleryItem);

      _get(Object.getPrototypeOf(BasemapGalleryItem.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(BasemapGalleryItem, [{
      key: 'render',
      value: function render() {
        return _React['default'].createElement(
          'li',
          {
            key: this.props.value,
            onClick: this.props.click.bind(this, this.props.value),
            className: 'basemap-gallery-item relative pointer' + (this.props.active ? ' active' : '')
          },
          _React['default'].createElement('span', { className: 'basemap-gallery-item-icon ' + this.props.iconClass }),
          _React['default'].createElement(
            'div',
            { className: 'basemap-gallery-item-label' },
            this.props.label
          )
        );
      }
    }]);

    return BasemapGalleryItem;
  })(_React['default'].Component);

  BasemapGalleryItem.propTypes = {
    label: _React['default'].PropTypes.string.isRequired,
    value: _React['default'].PropTypes.string.isRequired,
    iconClass: _React['default'].PropTypes.string.isRequired,
    click: _React['default'].PropTypes.func.isRequired,
    active: _React['default'].PropTypes.bool.isRequired
  };

  module.exports = BasemapGalleryItem;
});