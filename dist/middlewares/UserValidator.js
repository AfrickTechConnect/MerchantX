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
 * @class UserValidator
 * @classdesc Provides validation middlewares for login and signup route
 */


var UserValidator = /*#__PURE__*/function () {
  function UserValidator() {
    (0, _classCallCheck2["default"])(this, UserValidator);
  }

  (0, _createClass2["default"])(UserValidator, null, [{
    key: "checkName",

    /**
    * Firstname and lastname validator
    * @param {string} name
    * @returns {function} call to a Check API middleware
    * @memberof Validation
    */
    value: function checkName(name) {
      return _commonValidator["default"].genericCheck("".concat(name)).trim().isLength({
        min: 2,
        max: 20
      }).withMessage("".concat(name, " must be at least 2 characters, and maximum 20")).not().matches(/^[A-Za-z]+[-]{1}[A-Za-z]+([-]{1}[A-Za-z]+)+$/, 'g').withMessage("invalid input for ".concat(name)).not().matches(/^[A-Za-z]+[']+[A-Za-z]+[']+[A-Za-z]+$/, 'g').withMessage("invalid input for ".concat(name)).matches(/^[A-Za-z]+(['-]?[A-Za-z]+)?([ -]?[A-Za-z]+)?(['-]?[A-Za-z]+)?$/, 'g').withMessage("invalid input for ".concat(name)).customSanitizer(function (value) {
        return makeLowerCase(value);
      });
    }
    /**
    * Password validator
    * @returns {function} call to a Check API middleware
    * @memberof Validation
    */

  }, {
    key: "checkPassword",
    value: function checkPassword() {
      return _commonValidator["default"].genericCheck('password').isLength({
        min: 6,
        max: 20
      }).withMessage('password must be at least 6 characters').not().matches(/\s/, 'g').withMessage('password cannot contain whitespace');
    }
    /**
     * Generic Number validator
     * @param {string} item
     * @returns {function} call to a check API middleware
     * @memberof Validation
     */

  }, {
    key: "checkNumber",
    value: function checkNumber(item) {
      return _commonValidator["default"].genericCheck(item).trim().isInt({
        min: 1
      }).withMessage("".concat(item, " value must be at least 1 and an integer"));
    }
    /**
    * Signup validation
    * @returns {array} an array of Check API middlewares
    * @memberof Validation
    */

  }, {
    key: "signUpValidation",
    value: function signUpValidation() {
      return [_commonValidator["default"].checkEmail(), UserValidator.checkName('firstname'), UserValidator.checkName('lastname'), UserValidator.checkPassword(), _checkForErrors["default"], _helpers.emptyBody];
    }
    /**
    * Login validation
    * @returns {array} an array of Check API middlewares
    * @memberof Validation
    */

  }, {
    key: "loginValidation",
    value: function loginValidation() {
      return [_commonValidator["default"].checkEmail(), UserValidator.checkPassword(), _checkForErrors["default"], _helpers.emptyBody];
    }
  }]);
  return UserValidator;
}();

exports["default"] = UserValidator;