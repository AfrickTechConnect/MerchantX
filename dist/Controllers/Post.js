"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _models = _interopRequireDefault(require("../models"));

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Post = _models["default"].Post;
/**
 * @export
 * @class Posts
 */

var Posts = /*#__PURE__*/function () {
  function Posts() {
    (0, _classCallCheck2["default"])(this, Posts);
  }

  (0, _createClass2["default"])(Posts, null, [{
    key: "Create",

    /**
     * @name Create
     * @async
     * @static
     * @memberof Posts
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @returns {JSON} JSON object with details of new article
     */
    value: function () {
      var _Create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var body, id, myArticle;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                body = req.body, id = req.user.id;
                _context.next = 4;
                return Post.create(_objectSpread({
                  authorId: id
                }, body));

              case 4:
                myArticle = _context.sent;
                return _context.abrupt("return", (0, _helpers.serverResponse)(res, 200, {
                  message: 'successful',
                  data: _objectSpread({}, myArticle.dataValues)
                }));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", (0, _helpers.serverError)(req, res, _context.t0));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function Create(_x, _x2) {
        return _Create.apply(this, arguments);
      }

      return Create;
    }()
    /**
     * @name GetAll
     * @async
     * @static
     * @memberof Posts
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @returns {JSON} JSON object with details of new article
     */

  }, {
    key: "AllPosts",
    value: function () {
      var _AllPosts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, _req$query, page, pageItems, _paginationValues, offset, limit, userPosts, count, _pageCounter, totalPages, itemsOnPage, parsedPage, userPost;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                id = req.user.id;
                _req$query = req.query, page = _req$query.page, pageItems = _req$query.pageItems;
                _paginationValues = (0, _helpers.paginationValues)(req.query), offset = _paginationValues.offset, limit = _paginationValues.limit;
                _context2.next = 6;
                return Post.findAndCountAll({
                  where: {
                    authorId: id
                  },
                  limit: limit,
                  offset: offset,
                  include: [{
                    model: _models["default"].Comment,
                    include: [{
                      model: _models["default"].User,
                      as: 'author',
                      attributes: ['id', 'firstname', 'lastname', 'avatarUrl']
                    }]
                  }]
                });

              case 6:
                userPosts = _context2.sent;
                count = userPosts.count;
                _pageCounter = (0, _helpers.pageCounter)(count, page, pageItems), totalPages = _pageCounter.totalPages, itemsOnPage = _pageCounter.itemsOnPage, parsedPage = _pageCounter.parsedPage;
                userPost = {
                  totalPages: totalPages,
                  itemsOnPage: itemsOnPage,
                  parsedPage: parsedPage,
                  data: userPosts.rows
                };
                return _context2.abrupt("return", (0, _helpers.serverResponse)(res, 200, {
                  message: 'successful',
                  data: {
                    userPost: userPost
                  }
                }));

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", (0, _helpers.serverError)(req, res, _context2.t0));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 13]]);
      }));

      function AllPosts(_x3, _x4) {
        return _AllPosts.apply(this, arguments);
      }

      return AllPosts;
    }()
  }]);
  return Posts;
}();

var _default = Posts;
exports["default"] = _default;