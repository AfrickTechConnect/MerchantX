"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _serverResponse = _interopRequireDefault(require("./serverResponse"));

var emptyBody = function emptyBody(request, response, next) {
  var body = request.body;

  if (Object.keys(body).length === 0) {
    (0, _serverResponse["default"])(response, 400, {
      message: 'empty request body'
    });
  } else {
    next();
  }
};

var _default = emptyBody;
exports["default"] = _default;