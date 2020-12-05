
import checkForErrors from './checkForErrors';
import CommonValidator from './commonValidator';
import { emptyBody } from '../helpers';

/**
 * @class InvestorValidation
 * @classdesc Provides validation middlewares for login and signup route
 */
export default class InvestorValidator {
  /**
  * checkCacDocumentUrl validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkInvestmentLimit() {
    return CommonValidator.genericCheck('investmentLimit')
      .isDecimal()
      .withMessage('investmentLimit not valid');
  }

  /**
  * attachmentPitchUrl validator
  * @returns {function} call to a Check API middleware
  * @memberof Validation
  */
  static checkGovernmentId() {
    return CommonValidator.genericCheck('govtId')
      .isLength({ min: 6 })
      .withMessage('govtId must be at least 6 characters')
      .not()
      .matches(/\s/, 'g')
      .withMessage('govtId cannot contain whitespace');
  }

  /**
  * Signup validation
  * @returns {array} an array of Check API middlewares
  * @memberof Validation
  */
  static createInvestorValidation() {
    return [
      InvestorValidator.checkGovernmentId(),
      InvestorValidator.checkInvestmentLimit(),
      checkForErrors,
      emptyBody
    ];
  }
}
