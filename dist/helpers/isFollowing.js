"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var UserFollower = _models["default"].UserFollower;
/**
 * @name isFollowing
 * @async
 * @param {integer} userId express request object
 * @param {integer} followerId express response object
 * @returns {bolean} retunn boolean
 */

var isFollowing = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId, followerId) {
    var following;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return UserFollower.findOne({
              where: {
                userId: userId,
                followerId: followerId
              }
            });

          case 2:
            following = _context.sent;
            return _context.abrupt("return", !!following);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isFollowing(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = isFollowing;
exports["default"] = _default;