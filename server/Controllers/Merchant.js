import models from '../models';
import {
  serverResponse,
  serverError
}
  from '../helpers';

const { User, Merchant } = models;
/**
 * @export
 * @class Users
 */
class Merchants {
  /**
     * @name create
     * @async
     * @static
     * @memberof Users
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @returns {JSON} JSON object with details of new user
     */
  static async create(req, res) {
    try {
      const { user } = req;
      if (user.Merchant || user.Investor) {
        return serverResponse(req, res, 409, {
          message: 'user has already been registered as an investor or merchant'
        });
      }
      const { cacDocumentUrl, attachmentPitchUrl } = req.body;
      const merchant = await Merchant.create({
        cacDocumentUrl,
        attachementPitch: attachmentPitchUrl,
        creditScore: 0,
        userId: user.id
      });
      return serverResponse(req, res, 201, { message: 'merchant added successfully', ...merchant.dataValues });
    } catch (error) {
      return serverError(res);
    }
  }

  /**
   * Method for handling signin route(POST api/v1/auth/login)
   * @param {object} request - the request object
   * @param {object} response  - object
   * @return { json }  - the response json
   */
  static async rate(request, response) {
    try {
      const { id, creditScore } = request.body;
      const { user } = request;
      if (user.type !== 'user') {
        return serverResponse(request, response, 401, { message: 'user not authorized to perfom this action' });
      }
      const merchant = await Merchant.update({ creditScore }, { where: { id } });
      if (!merchant[0]) {
        return serverResponse(request, response, 400, {
          message: 'failed to update merchant',
        });
      }
      return serverResponse(request, response, 400, {
        message: 'merchant updated successfully',
      });
    } catch (error) {
      return serverError(response);
    }
  }
}

export default Merchants;
