"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Post = _interopRequireDefault(require("../Controllers/Post"));

var _middlewares = require("../middlewares");

var route = _express["default"].Router();

route.post('/', _middlewares.PostValidator.createPostValidation(), _middlewares.verifyToken, _Post["default"].Create);
route.get('/', _middlewares.verifyToken, _Post["default"].AllPosts);
var _default = route;
exports["default"] = _default;