"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serverError = exports.serverResponse = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @name serverResponse
 * @param {Object} res express response object
 * @param {Number} code status code to return
 * @param {Ojectb} data object with response details
 * @returns {JSON} JSON response with status and response information
 */
var serverResponse = function serverResponse(res, code, data) {
  return res.status(code).json(_objectSpread({}, data));
};
/**
 * @name serverError
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {error} error the error message
 * @returns {JSON} JSON response with server error details
 */


exports.serverResponse = serverResponse;

var serverError = function serverError(req, res, error) {
  res.status(500).json({
    error: error
  });
};

exports.serverError = serverError;