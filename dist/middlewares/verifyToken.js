"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = _interopRequireDefault(require("../models"));

var _helpers = require("../helpers");

var User = _models["default"].User;
/**
 * @name verifyToken
 * @param {object} request
 * @param {object} response
 * @param {object} next
 * @return {string} object
 */

var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
    var token, decoded, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = request.headers.authorization || request.params.token;

            if (token) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", (0, _helpers.serverResponse)(response, 401, {
              message: 'no token provided'
            }));

          case 4:
            _context.next = 6;
            return _jsonwebtoken["default"].verify(token, process.env.JWT_KEY);

          case 6:
            decoded = _context.sent;
            _context.next = 9;
            return User.findById(decoded.id);

          case 9:
            user = _context.sent;

            if (user) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", (0, _helpers.serverResponse)(response, 404, {
              message: 'user does not exist'
            }));

          case 12:
            request.user = user;
            response.locals.token = token;
            next();
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", (0, _helpers.serverError)(request, response, _context.t0.message === 'jwt expired' ? 'kindly login again' : _context.t0));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = verifyToken;
exports["default"] = _default;