"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./user"));

var _follower = _interopRequireDefault(require("./follower"));

var _post = _interopRequireDefault(require("./post"));

var _comment = _interopRequireDefault(require("./comment"));

var route = _express["default"].Router();

route.use('/users', _user["default"]);
route.use('/follow', _follower["default"]);
route.use('/post', _post["default"]);
route.use('/comment', _comment["default"]);
var _default = route;
exports["default"] = _default;