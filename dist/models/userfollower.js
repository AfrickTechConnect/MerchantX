"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var UserFollower = sequelize.define('UserFollower', {
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'userId must be an integer'
        }
      }
    },
    followerId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'followerId must be an integer'
        }
      }
    }
  }, {});

  UserFollower.associate = function (models) {
    UserFollower.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'following'
    });
    UserFollower.belongsTo(models.User, {
      foreignKey: 'followerId',
      onDelete: 'CASCADE',
      as: 'follower'
    });
  };

  return UserFollower;
};

exports["default"] = _default;