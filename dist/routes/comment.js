"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Comment = _interopRequireDefault(require("../Controllers/Comment"));

var _middlewares = require("../middlewares");

var route = _express["default"].Router();

route.post('/:slug', _middlewares.CommentValidator.createCommentValidation(), _middlewares.verifyToken, _Comment["default"].create);
var _default = route;
exports["default"] = _default;