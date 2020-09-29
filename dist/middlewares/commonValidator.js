"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _check = _interopRequireDefault(require("express-validator/check"));

var _checkForErrors = _interopRequireDefault(require("./checkForErrors"));

var makeLowerCase = function makeLowerCase(value) {
  if (value !== '') {
    return value.toLowerCase();
  }

  return value;
};

var check = _check["default"].check;
/**
 * @class UserValidator
 * @classdesc Provides common validation middlewares
 */

var CommonValidator = /*#__PURE__*/function () {
  function CommonValidator() {
    (0, _classCallCheck2["default"])(this, CommonValidator);
  }

  (0, _createClass2["default"])(CommonValidator, null, [{
    key: "genericCheck",

    /**
    * Generic validator to be used by all others
    * @param {string} field
    * @returns {function} call to a Check API middleware
    * @memberof CommonValidator
    */
    value: function genericCheck(field) {
      return check("".concat(field)).exists().withMessage("".concat(field, " is missing")).not().isEmpty({
        ignore_whitespace: true
      }).withMessage("".concat(field, " cannot be blank"));
    }
    /**
    * input validator to be used by all others
    * @param {string} field
    * @returns {function} call to a Check API middleware
    * @memberof CommonValidator
    */

  }, {
    key: "inputCheck",
    value: function inputCheck(field) {
      return check("".concat(field)).optional().trim().not().isEmpty({
        ignore_whitespace: true
      });
    }
    /**
    * Email validator
    * @returns {function} call to a Check API middleware
    * @memberof CommonValidator
    */

  }, {
    key: "checkEmail",
    value: function checkEmail() {
      return CommonValidator.genericCheck('email').trim().isEmail().withMessage('email is not valid').customSanitizer(function (value) {
        return makeLowerCase(value);
      });
    }
  }]);
  return CommonValidator;
}();

exports["default"] = CommonValidator;