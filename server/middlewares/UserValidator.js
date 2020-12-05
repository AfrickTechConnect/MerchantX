
import checkForErrors from './checkForErrors';
import CommonValidator from './commonValidator';
import { emptyBody } from '../helpers';


const makeLowerCase = (value) => {
  if (value !== '') {
    return value.toLowerCase();
  }
  return value;
};

/**
 * @class UserValidator
 * @classdesc Provides validation middlewares for login and signup route
 */
export default class UserValidator {
  /**
  * Firstname and lastname validator
  * @param {string} name
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkName(name) {
    return CommonValidator.genericCheck(`${name}`)
      .trim()
      .isLength({ min: 2, max: 20 })
      .withMessage(`${name} must be at least 2 characters, and maximum 20`)
      .not()
      .matches(/^[A-Za-z]+[-]{1}[A-Za-z]+([-]{1}[A-Za-z]+)+$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .not()
      .matches(/^[A-Za-z]+[']+[A-Za-z]+[']+[A-Za-z]+$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .matches(/^[A-Za-z]+(['-]?[A-Za-z]+)?([ -]?[A-Za-z]+)?(['-]?[A-Za-z]+)?$/, 'g')
      .withMessage(`invalid input for ${name}`)
      .customSanitizer(value => makeLowerCase(value));
  }

  /**
  * Password validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkPassword() {
    return CommonValidator.genericCheck('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('password must be at least 6 characters')
      .not()
      .matches(/\s/, 'g')
      .withMessage('password cannot contain whitespace');
  }

  /**
  * identificationUrl validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkIdentificationUrl() {
    return CommonValidator.genericCheck('identificationUrl')
      .isLength({ min: 6 })
      .withMessage('identificationUrl must be at least 6 characters')
      .not()
      .matches(/\s/, 'g')
      .withMessage('identificationUrl cannot contain whitespace');
  }

  /**
  * address validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkAddress() {
    return CommonValidator.genericCheck('address')
      .isLength({ min: 2 })
      .withMessage('address must be at least 6 characters');
  }

  /**
  * proof of address validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkAddressProof() {
    return CommonValidator.genericCheck('proofAddress')
      .isLength({ min: 6 })
      .withMessage('proofAddress must be at least 6 characters');
  }


  /**
   * Generic Number validator
   * @param {string} item
   * @returns {function} call to a check API middleware
   * @memberof Validation
   */
  static checkNumber(item) {
    return CommonValidator.genericCheck(item)
      .trim()
      .isInt({ min: 1 })
      .withMessage(`${item} value must be at least 1 and an integer`);
  }

  /**
  * Signup validation
  * @returns {array} an array of Check API middlewares
  * @memberof Validation
  */
  static signUpValidation() {
    return [
      CommonValidator.checkEmail(),
      UserValidator.checkName('firstname'),
      UserValidator.checkName('lastname'),
      UserValidator.checkPassword(),
      UserValidator.checkAddressProof(),
      UserValidator.checkAddress(),
      UserValidator.checkIdentificationUrl(),
      checkForErrors,
      emptyBody
    ];
  }

  /**
  * Login validation
  * @returns {array} an array of Check API middlewares
  * @memberof Validation
  */
  static loginValidation() {
    return [
      CommonValidator.checkEmail(),
      UserValidator.checkPassword(),
      checkForErrors,
      emptyBody
    ];
  }
}
