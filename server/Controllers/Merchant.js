import Decimal from 'decimal.js';
import models from '../models';
import {
  serverResponse,
  serverError
}
  from '../helpers';

const { Merchant, Investment } = models;
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
        name: `${user.firstname} ${user.lastname}`,
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
      if (user.type !== 'admin') {
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

  /**
   * Method for handling signin route(POST api/v1/auth/login)
   * @param {object} request - the request object
   * @param {object} response  - object
   * @return { json }  - the response json
   */
  static async getAll(request, response) {
    const merchant = await Merchant.findAndCountAll();
    const all = merchant.rows.map(x => x.dataValues);
    return serverResponse(request, response, 200, {
      message: 'merchant gotten successfully',
      Merchant: all
    });
  }

  /**
   * Method for handling signin route(POST api/v1/auth/login)
   * @param {object} request - the request object
   * @param {object} response  - object
   * @return { json }  - the response json
   */
  static async fundPool(request, response) {
    try {
      const {
        user
      } = request;

      const merchant = await Merchant.findOne({
        where: {
          userId: user.id
        },
        include: [
          {
            model: models.Investment,
          }
        ]
      });
      if (!merchant) {
        return serverResponse(request, response, 404, { message: 'merchant does not exits' });
      }
      let totalFunding = new Decimal('0.00');

      merchant.dataValues.Investments.map((x) => {
        const currentAmount = new Decimal(x.amount);
        totalFunding = totalFunding.plus(currentAmount);
      });

      return serverResponse(request, response, 200, {
        message: 'all Investments gotten successfully',
        totalFunding,
        Investments: merchant.dataValues.Investments
      });
    } catch (e) {
      console.log(e, 'error>>><<<');
    }
  }
}

export default Merchants;
