"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable func-names */
var _default = function _default(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: {
      type: DataTypes.TEXT,
      defaultValue: 'user'
    },
    avatarUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png',
      validate: {
        isUrl: {
          msg: 'avatar url format is invalid'
        }
      }
    },
    followingsCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'user followings count must be an integer'
        },
        min: {
          args: [0],
          msg: 'user followings count must not be less than 0'
        }
      }
    },
    followersCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'user followers count must be an integer'
        },
        min: {
          args: [0],
          msg: 'user followers count must not be less than 0'
        }
      }
    }
  }, {});

  User.associate = function (models) {
    User.hasMany(models.UserFollower, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'AllFollowers'
    });
    User.hasMany(models.UserFollower, {
      foreignKey: 'followerId',
      onDelete: 'CASCADE',
      as: 'AllFollowings'
    });
  };

  User.findByEmail = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email) {
      var user;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return User.findOne({
                where: {
                  email: email
                }
              });

            case 2:
              user = _context.sent;

              if (!user) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", user);

            case 5:
              return _context.abrupt("return", null);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  User.findById = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
      var user;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return User.findOne({
                where: {
                  id: id
                }
              });

            case 2:
              user = _context2.sent;

              if (!user) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", user);

            case 5:
              return _context2.abrupt("return", null);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  User.updatePasswordById = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, newPassword) {
      var user;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return User.update({
                password: newPassword
              }, {
                where: {
                  id: id
                }
              });

            case 2:
              user = _context3.sent;
              return _context3.abrupt("return", user[0]);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  return User;
};

exports["default"] = _default;