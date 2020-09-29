"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [2, 5000],
          msg: 'comment must be text between 2 and 5000 chars long'
        }
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'postId must be an integer'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'userId must be an integer'
        }
      }
    }
  }, {});

  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE'
    });
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post',
      onDelete: 'CASCADE'
    });
  };

  return Comment;
};

exports["default"] = _default;