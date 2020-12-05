
import models from '../models';
import {
  serverResponse,
  serverError
}
  from '../helpers';

const { Investor } = models;
/**
 * @export
 * @class Users
 */
class Investors {
  /**
     * @name create
     * @async
     * @static
     * @memberof Investor
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
      const { govtId, investmentLimit } = req.body;
      const investor = await Investor.create({
        investmentLimit,
        govtId,
        userId: user.id
      });
      return serverResponse(req, res, 201, { message: 'investor added successfully', ...investor.dataValues });
    } catch (error) {
      return serverError(res);
    }
  }

  /**
     * @name Invest
     * @async
     * @static
     * @memberof Investor
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @returns {JSON} JSON object with details of new user
     */
  static async Invest(req, res) {
    try {
    // const { user } = req;
      return serverResponse(req, res, 201, { message: 'investor added successfully', ...investor.dataValues });
    } catch (error) {
      return serverError(res);
    }
  }
}

export default Investors;
