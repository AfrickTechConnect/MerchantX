"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _checkForErrors = _interopRequireDefault(require("./checkForErrors"));

var _commonValidator = _interopRequireDefault(require("./commonValidator"));

var _helpers = require("../helpers");

/**
 * @class CommentValidator
 * @classdesc Provides validation middlewares for comment route
 */
var CommentValidator = /*#__PURE__*/function () {
  function CommentValidator() {
    (0, _classCallCheck2["default"])(this, CommentValidator);
  }

  (0, _createClass2["default"])(CommentValidator, null, [{
    key: "checkComment",

    /**
     * Post title validation
     * @returns {array} an array of Check API middlewares
     * @memberof HubValidator
     */
    value: function checkComment() {
      return _commonValidator["default"].genericCheck('comment').trim().isLength({
        min: 1
      }).isString();
    }
    /**
    * Login validation
    * @returns {array} an array of Check API middlewares
    * @memberof Validation
    */

  }, {
    key: "createCommentValidation",
    value: function createCommentValidation() {
      return [CommentValidator.checkComment(), _checkForErrors["default"], _helpers.emptyBody];
    }
  }]);
  return CommentValidator;
}();

exports["default"] = CommentValidator;