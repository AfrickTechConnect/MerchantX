
import checkForErrors from './checkForErrors';
import CommonValidator from './commonValidator';
import { emptyBody } from '../helpers';

/**
 * @class MerchantValidator
 * @classdesc Provides validation middlewares for login and signup route
 */
export default class MerchantValidator {
  /**
  * checkCacDocumentUrl validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkCacDocumentUrl() {
    return CommonValidator.genericCheck('cacDocumentUrl')
      .isLength({ min: 6 })
      .withMessage('cacDocumentUrl must be at least 6 characters')
      .not()
      .matches(/\s/, 'g')
      .withMessage('cacDocumentUrl cannot contain whitespace');
  }

  /**
  * checkCacDocumentUrl validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkMerchantId() {
    return CommonValidator.genericCheck('id')
      .isUUID()
      .withMessage('merchant id cannot contain whitespace');
  }

  /**
  * attachmentPitchUrl validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkAttachementPitchUrl() {
    return CommonValidator.genericCheck('attachmentPitchUrl')
      .isLength({ min: 6 })
      .withMessage('attachmentPitchUrl must be at least 6 characters')
      .not()
      .matches(/\s/, 'g')
      .withMessage('attachmentPitchUrl cannot contain whitespace');
  }

  /**
  * attachmentPitchUrl validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkCreditScore() {
    return CommonValidator.genericCheck('creditScore')
      .trim()
      .isInt({ gt: 0, allow_leading_zeroes: false })
      .withMessage(
        'creditScore must be an integer, greater than 0 and must not contain leading zeros'
      );
  }

  /**
  * Signup validation
  * @returns {array} an array of Check API middlewares
  * @memberof Validation
  */
  static createMerchantValidation() {
    return [
      MerchantValidator.checkCacDocumentUrl(),
      MerchantValidator.checkAttachementPitchUrl(),
      checkForErrors,
      emptyBody
    ];
  }

  /**
  * Signup validation
  * @returns {array} an array of Check API middlewares
  * @memberof Validation
  */
  static rateMerchantValidation() {
    return [
      MerchantValidator.checkCreditScore(),
      MerchantValidator.checkMerchantId(),
      checkForErrors,
      emptyBody
    ];
  }
}
