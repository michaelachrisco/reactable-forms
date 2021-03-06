'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _base_input = require('./base_input');

var _base_input2 = _interopRequireDefault(_base_input);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _pikaday = require('pikaday');

var _pikaday2 = _interopRequireDefault(_pikaday);

var DateInput = (function (_BaseInput) {
  function DateInput(props) {
    _classCallCheck(this, DateInput);

    _get(Object.getPrototypeOf(DateInput.prototype), 'constructor', this).call(this, props);

    this.onBlur = this.onBlur.bind(this);
  }

  _inherits(DateInput, _BaseInput);

  _createClass(DateInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var target = _react2['default'].findDOMNode(this.refs[this.props.name]);

      this.picker = new _pikaday2['default']({
        field: target,
        format: this.props.dateFormat || 'MM-DD-YYYY',
        defaultValue: this.props.defaultValue,
        setDefaultValue: true
      });
    }
  }, {
    key: 'value',
    value: function value() {
      return _react2['default'].findDOMNode(this.refs[this.props.name]).value;
    }
  }, {
    key: 'serialize',
    value: function serialize(date) {
      var formValue = {};
      formValue['value'] = this.value();
      return formValue;
    }
  }, {
    key: 'onBlur',
    value: function onBlur(date) {
      if (date) {
        this.props.onBlur(null, this.picker.toString());
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('input', {
        className: this.props.classes,
        type: 'text',
        ref: this.props.name,
        name: this.props.name,
        defaultValue: this.props.defaultValue
      });
    }
  }]);

  return DateInput;
})(_base_input2['default']);

exports['default'] = DateInput;
module.exports = exports['default'];