"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Followers = _interopRequireDefault(require("../Controllers/Followers"));

var _middlewares = require("../middlewares");

var route = _express["default"].Router();

route.post('/:username', _middlewares.verifyToken, _Followers["default"].follow);
route["delete"]('/:username', _middlewares.verifyToken, _Followers["default"].unfollow);
var _default = route;
exports["default"] = _default;