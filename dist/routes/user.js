"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../Controllers/User"));

var _middlewares = require("../middlewares");

var route = _express["default"].Router();

route.post('/signup', _middlewares.UserValidator.signUpValidation(), _User["default"].create);
route.post('/signin', _middlewares.UserValidator.loginValidation(), _User["default"].login);
route.get('/details', _middlewares.verifyToken, _User["default"].getUser);
var _default = route;
exports["default"] = _default;