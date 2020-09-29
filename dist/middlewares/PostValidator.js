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

var makeLowerCase = function makeLowerCase(value) {
  if (value !== '') {
    return value.toLowerCase();
  }

  return value;
};
/**
 * @class PostValidator
 * @classdesc Provides validation middlewares for user posts
 */


var PostValidator = /*#__PURE__*/function () {
  function PostValidator() {
    (0, _classCallCheck2["default"])(this, PostValidator);
  }

  (0, _createClass2["default"])(PostValidator, null, [{
    key: "checkPostTitle",

    /**
     * Post title validation
     * @returns {array} an array of Check API middlewares
     * @memberof HubValidator
     */
    value: function checkPostTitle() {
      return _commonValidator["default"].genericCheck('title').trim().isLength({
        min: 2
      }).isString().customSanitizer(function (value) {
        return makeLowerCase(value);
      });
    }
    /**
     * Post title validation
     * @returns {array} an array of Check API middlewares
     * @memberof HubValidator
     */

  }, {
    key: "checkPostDescription",
    value: function checkPostDescription() {
      return _commonValidator["default"].genericCheck('description').trim().isLength({
        min: 2
      }).isString().customSanitizer(function (value) {
        return makeLowerCase(value);
      });
    }
    /**
    * Login validation
    * @returns {array} an array of Check API middlewares
    * @memberof Validation
    */

  }, {
    key: "createPostValidation",
    value: function createPostValidation() {
      return [PostValidator.checkPostTitle(), PostValidator.checkPostDescription(), _checkForErrors["default"], _helpers.emptyBody];
    }
  }]);
  return PostValidator;
}();

exports["default"] = PostValidator;