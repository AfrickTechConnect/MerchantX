"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelizeSlugify = _interopRequireDefault(require("sequelize-slugify"));

module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 250],
          msg: 'title must be strings between 2 and 250 chars long'
        }
      }
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {});

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'Author',
      onDelete: 'CASCADE'
    });
    Post.hasMany(models.Comment, {
      foreignKey: 'postId'
    });
  };

  Post.findBySlug = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(slug) {
      var post;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Post.findOne({
                where: {
                  slug: slug
                }
              });

            case 2:
              post = _context.sent;

              if (!post) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", post);

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

  _sequelizeSlugify["default"].slugifyModel(Post, {
    source: ['title'],
    overwrite: false,
    replacement: '-'
  });

  return Post;
};