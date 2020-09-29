"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _serverResponse = require("../helper/serverResponse");

/**
 * @name authAdmin
 * @param {Object} request express request object
 * @param {Object} response express response object
 * @param {Object} next express next function that calls the next middleware
 * @returns {Void} it calls the next middleware
 */
var authAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
    var type;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = request.user.type;

            if (!(type !== 'admin')) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", (0, _serverResponse.serverResponse)(request, response, 403, {
              message: 'unauthorized user'
            }));

          case 3:
            next();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function authAdmin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = authAdmin;
exports["default"] = _default;