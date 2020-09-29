"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _models = _interopRequireDefault(require("../models"));

var _helpers = require("../helpers");

var User = _models["default"].User,
    UserFollower = _models["default"].UserFollower;
var userAttributes = ['id', 'firstname', 'lastname', 'email'];
/**
 * @export
 * @class Followers
 */

var Followers = /*#__PURE__*/function () {
  function Followers() {
    (0, _classCallCheck2["default"])(this, Followers);
  }

  (0, _createClass2["default"])(Followers, null, [{
    key: "follow",

    /**
     * @name follow
     * @async
     * @static
     * @memberof Users
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @returns {JSON} JSON object with details of new follower
     */
    value: function () {
      var _follow = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var id, username, userThatWantsToFollow, userToBeFollowed, error, follower, dataValues;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                id = req.user.id, username = req.params.username;
                _context.next = 4;
                return User.findById(id);

              case 4:
                userThatWantsToFollow = _context.sent;
                _context.next = 7;
                return User.findByEmail(username);

              case 7:
                userToBeFollowed = _context.sent;
                error = Followers.canFollowOrUnfollow(userToBeFollowed, id);

                if (!error) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", (0, _helpers.serverResponse)(res, error.status, error.message));

              case 11:
                _context.next = 13;
                return UserFollower.findOrCreate({
                  where: {
                    userId: userToBeFollowed.id,
                    followerId: id
                  }
                });

              case 13:
                follower = _context.sent;
                dataValues = follower[0].dataValues;
                _context.next = 17;
                return Followers.updateFollowsCount(userThatWantsToFollow, userToBeFollowed);

              case 17:
                return _context.abrupt("return", (0, _helpers.serverResponse)(res, 200, {
                  following: {
                    message: 'followed successfully',
                    data: dataValues
                  }
                }));

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", (0, _helpers.serverError)(req, res, _context.t0));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 20]]);
      }));

      function follow(_x, _x2) {
        return _follow.apply(this, arguments);
      }

      return follow;
    }()
    /**
     * @name unfollow
     * @async
     * @static
     * @memberof Users
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @returns {JSON} JSON object with details of an unfollowed user
     */

  }, {
    key: "unfollow",
    value: function () {
      var _unfollow = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, username, userThatWantsToUnfollow, userToBeUnfollowed, error;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                id = req.user.id, username = req.params.username;
                _context2.next = 4;
                return User.findById(id);

              case 4:
                userThatWantsToUnfollow = _context2.sent;
                _context2.next = 7;
                return User.findByEmail(username);

              case 7:
                userToBeUnfollowed = _context2.sent;
                error = Followers.canFollowOrUnfollow(userToBeUnfollowed, id);

                if (!error) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", (0, _helpers.serverResponse)(res, error.status, error.message));

              case 11:
                _context2.next = 13;
                return UserFollower.destroy({
                  where: {
                    userId: userToBeUnfollowed.id,
                    followerId: id
                  }
                });

              case 13:
                _context2.next = 15;
                return Followers.updateFollowsCount(userThatWantsToUnfollow, userToBeUnfollowed);

              case 15:
                return _context2.abrupt("return", (0, _helpers.serverResponse)(res, 200, {
                  data: {
                    message: "you sucessfully unfollowed ".concat(username),
                    id: userToBeUnfollowed.id
                  }
                }));

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", (0, _helpers.serverError)(req, res, _context2.t0));

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 18]]);
      }));

      function unfollow(_x3, _x4) {
        return _unfollow.apply(this, arguments);
      }

      return unfollow;
    }()
    /**
     * @name canFollowOrUnfollow
     * @async
     * @static
     * @memberof Users
     * @param {Object} user user object
     * @param {integer} id id of other user
     * @returns {object} object with details of a user
     */

  }, {
    key: "canFollowOrUnfollow",
    value: function canFollowOrUnfollow(user, id) {
      if (!user) {
        return {
          status: 404,
          message: {
            error: 'user not found'
          }
        };
      }

      if (id === user.id) {
        return {
          status: 409,
          message: {
            message: 'user cannot perform this action'
          }
        };
      }

      return false;
    }
    /**
     * @name UpdateFollowsCount
     * @async
     * @static
     * @memberof Followers
     * @param {Object} source the source user object
     * @param {Object} target the target user object
     * @returns {Null} Null object
     */

  }, {
    key: "updateFollowsCount",
    value: function () {
      var _updateFollowsCount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(source, target) {
        var followingsCount, followersCount;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return source.countAllFollowings();

              case 2:
                followingsCount = _context3.sent;
                _context3.next = 5;
                return target.countAllFollowers();

              case 5:
                followersCount = _context3.sent;
                _context3.next = 8;
                return User.update({
                  followingsCount: followingsCount
                }, {
                  where: {
                    id: source.id
                  }
                });

              case 8:
                _context3.next = 10;
                return User.update({
                  followersCount: followersCount
                }, {
                  where: {
                    id: target.id
                  }
                });

              case 10:
                return _context3.abrupt("return", null);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function updateFollowsCount(_x5, _x6) {
        return _updateFollowsCount.apply(this, arguments);
      }

      return updateFollowsCount;
    }()
    /**
     * @name allFollowings
     * @async
     * @static
     * @memberof Users
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @returns {JSON} JSON object with details of an unfollowed user
     */

  }, {
    key: "allFollowings",
    value: function () {
      var _allFollowings = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var id, user, followings, users;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.user.id;
                _context4.next = 4;
                return User.findById(id);

              case 4:
                user = _context4.sent;
                _context4.next = 7;
                return user.getAllFollowings({
                  include: [{
                    model: User,
                    as: 'following',
                    attributes: userAttributes
                  }]
                });

              case 7:
                followings = _context4.sent;
                users = followings.map(function (following) {
                  return following.dataValues;
                });
                (0, _helpers.serverResponse)(res, 200, {
                  followings: users
                });
                _context4.next = 15;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", (0, _helpers.serverError)(req, res, _context4.t0));

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 12]]);
      }));

      function allFollowings(_x7, _x8) {
        return _allFollowings.apply(this, arguments);
      }

      return allFollowings;
    }()
  }]);
  return Followers;
}();

var _default = Followers;
exports["default"] = _default;