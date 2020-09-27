import expressValidator from 'express-validator/check';
import checkForErrors from './checkForErrors';


const makeLowerCase = (value) => {
    if (value !== '') {
      return value.toLowerCase();
    }
    return value;
  };

const { check } = expressValidator;
/**
 * @class UserValidator
 * @classdesc Provides common validation middlewares
 */
export default class CommonValidator {
  /**
  * Generic validator to be used by all others
  * @param {string} field
  * @returns {function} call to a Check API middleware
  * @memberof CommonValidator
  */
  static genericCheck(field) {
    return check(`${field}`)
      .exists().withMessage(`${field} is missing`)
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage(`${field} cannot be blank`);
  }

  /**
* input validator to be used by all others
* @param {string} field
* @returns {function} call to a Check API middleware
* @memberof CommonValidator
*/
  static inputCheck(field) {
    return check(`${field}`)
      .optional()
      .trim()
      .not()
      .isEmpty({ ignore_whitespace: true });
  }

  /**
  * Email validator
  * @returns {function} call to a Check API middleware
  * @memberof CommonValidator
  */
  static checkEmail() {
    return CommonValidator.genericCheck('email')
      .trim()
      .isEmail()
      .withMessage('email is not valid')
      .customSanitizer(value => makeLowerCase(value));
  }
}
