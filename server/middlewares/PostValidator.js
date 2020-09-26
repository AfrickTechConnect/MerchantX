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
 * @class PostValidator
 * @classdesc Provides validation middlewares for login and signup route
 */
export default class PostValidator {
  /**
   * Post title validation
   * @returns {array} an array of Check API middlewares
   * @memberof HubValidator
   */
  static checkPostTitle() {
    return CommonValidator.genericCheck('title')
      .trim()
      .isLength({ min: 2 })
      .isString()
      .customSanitizer(value => makeLowerCase(value));
  }

  /**
   * Post title validation
   * @returns {array} an array of Check API middlewares
   * @memberof HubValidator
   */
  static checkPostDescription() {
    return CommonValidator.genericCheck('description')
      .trim()
      .isLength({ min: 2 })
      .isString()
      .customSanitizer(value => makeLowerCase(value));
  }

  /**
  * Login validation
  * @returns {array} an array of Check API middlewares
  * @memberof Validation
  */
  static createPostValidation() {
    return [
      PostValidator.checkPostTitle(),
      PostValidator.checkPostDescription(),
      checkForErrors,
      emptyBody
    ];
  }
}
