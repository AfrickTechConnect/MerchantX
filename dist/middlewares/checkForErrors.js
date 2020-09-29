"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _check = _interopRequireDefault(require("express-validator/check"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var validationResult = _check["default"].validationResult;

var _default = function _default(request, response, next) {
  var errors = {};

  var errorFormatter = function errorFormatter(_ref) {
    var location = _ref.location,
        msg = _ref.msg,
        param = _ref.param;

    if (!Object.keys(errors).includes(location)) {
      errors["".concat(location)] = {};
    }

    errors["".concat(location)]["".concat(param)] = msg;
    return errors;
  };

  var validationResults = validationResult(request).array({
    onlyFirstError: true
  });
  validationResults.forEach(function (resultObject) {
    return errorFormatter(resultObject);
  });

  if (Object.keys(errors).length > 0) {
    response.status(400).json(_objectSpread({}, errors));
  } else {
    next();
  }
};

exports["default"] = _default;