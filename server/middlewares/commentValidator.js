import checkForErrors from './checkForErrors';
import CommonValidator from './commonValidator';
import { emptyBody } from '../helpers';


/**
 * @class CommentValidator
 * @classdesc Provides validation middlewares for comment route
 */
export default class CommentValidator {
  /**
   * Post title validation
   * @returns {array} an array of Check API middlewares
   * @memberof HubValidator
   */
  static checkComment() {
    return CommonValidator.genericCheck('comment')
      .trim()
      .isLength({ min: 1 })
      .isString();
  }

  /**
  * Login validation
  * @returns {array} an array of Check API middlewares
  * @memberof Validation
  */
  static createCommentValidation() {
    return [
      CommentValidator.checkComment(),
      checkForErrors,
      emptyBody
    ];
  }
}
