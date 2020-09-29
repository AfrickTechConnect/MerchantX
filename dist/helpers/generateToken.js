"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var JWT_KEY = process.env.JWT_KEY;
/**
 * @name generateToken
 * @param {object} payload
 * @param {String} expiresIn
 * @return {string} token
 */

var generateToken = function generateToken(payload, expiresIn) {
  if (!expiresIn) return _jsonwebtoken["default"].sign(payload, JWT_KEY);
  return _jsonwebtoken["default"].sign(payload, JWT_KEY, {
    expiresIn: expiresIn
  });
};

var _default = generateToken;
exports["default"] = _default;