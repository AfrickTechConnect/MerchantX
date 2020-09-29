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

var Comment = _models["default"].Comment,
    Post = _models["default"].Post;
/**
 *
 *
 * @class Comments
 */

var Comments = /*#__PURE__*/function () {
  function Comments() {
    (0, _classCallCheck2["default"])(this, Comments);
  }

  (0, _createClass2["default"])(Comments, null, [{
    key: "create",

    /**
     * @name create
     * @async
     * @static
     * @memberof Comments
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @returns {JSON} JSON object with details of new follower
     */
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var userId, slug, comment, post, postAuthorId, isFollow, commentData;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                userId = req.user.id;
                slug = req.params.slug;
                comment = req.body.comment;
                _context.next = 6;
                return Post.findBySlug(slug);

              case 6:
                post = _context.sent;

                if (post) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", (0, _helpers.serverResponse)(res, 404, {
                  message: 'post not found'
                }));

              case 9:
                postAuthorId = post.authorId;
                _context.next = 12;
                return (0, _helpers.isFollowing)(postAuthorId, userId);

              case 12:
                isFollow = _context.sent;

                if (isFollow) {
                  _context.next = 16;
                  break;
                }

                if (!(postAuthorId !== userId)) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return", (0, _helpers.serverResponse)(res, 401, {
                  message: 'user not authorized to comment'
                }));

              case 16:
                _context.next = 18;
                return Comment.create({
                  userId: userId,
                  comment: comment,
                  postId: post.id
                });

              case 18:
                commentData = _context.sent;
                return _context.abrupt("return", (0, _helpers.serverResponse)(res, 200, {
                  message: 'comment added successfully',
                  data: {
                    commentData: commentData
                  }
                }));

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", (0, _helpers.serverError)(req, res, _context.t0));

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 22]]);
      }));

      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);
  return Comments;
}();

var _default = Comments;
exports["default"] = _default;