/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import Decimal from 'decimal.js';
import models from '../models';
import {
  serverResponse,
  serverError
}
  from '../helpers';

const {
  Investor, Wallet, Investment, Merchant
} = models;
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
      let id;
      if (user.Merchant || user.Investor) {
        return serverResponse(req, res, 409, {
          message: 'user has already been registered as an investor or merchant'
        });
      }
      const { govtId, investmentLimit } = req.body;
      await models.sequelize.transaction(async (t) => {
        const investor = await Investor.create({
          investmentLimit,
          govtId,
          userId: user.id
        }, { transaction: t });
        id = investor.dataValues.id;
        await Wallet.create({
          investorId: id,
          balance: 0,
          cummulativeGain: 0,
          cummulativeLoss: 0
        }, { transaction: t });
      });
      const investorData = await Investor.findOne({
        where: { id },
        include: [
          {
            model: models.Wallet,
          }
        ]
      });
      return serverResponse(req, res, 201, { message: 'user made an investor successfully', ...investorData.dataValues });
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
      const {
        user, body: {
          amount, maturityDate, interestRate, investmentType, merchantId
        }
      } = req;
      let newWallet;
      await models.sequelize.transaction(async (t) => {
        const investor = await Investor.findOne({
          where: {
            userId: user.id
          },
          include: [
            {
              model: models.Wallet,
            }
          ]
        }, { transaction: t });

        if (!investor) {
          return serverResponse(req, res, 404, { message: 'investor does not exits' });
        }

        const marchants = await Merchant.findOne({
          where: {
            id: merchantId
          }
        }, { transaction: t });

        if (!marchants) {
          return serverResponse(req, res, 404, { message: 'marchant does not exits' });
        }


        const newAmount = new Decimal(amount);
        newWallet = investor.Wallet;
        const currentWalletBalance = new Decimal(newWallet.balance);
        if (!currentWalletBalance.greaterThan(newAmount)) {
          return serverResponse(req, res, 400, { message: 'investor cannot invest due to insufficient funds' });
        }

        const totalbal = currentWalletBalance.minus(newAmount);
        await Wallet.update(
          { balance: totalbal },
          { where: { id: newWallet.id } }, { transaction: t }
        );

        const newInvestment = await Investment.create({
          amount,
          date: maturityDate,
          interestRate,
          merchantId,
          investmentType,
          investorId: investor.dataValues.id
        }, { transaction: t });
        await investor.addMerchants(marchants.id, { transaction: t });
      });
      return serverResponse(req, res, 201, { message: 'investment made successfully' });
    } catch (error) {
      return serverError(res);
    }
  }

  /**
     * @name Fund
     * @async
     * @static
     * @memberof Investor
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @returns {JSON} JSON object with details of new user
     */
  static async Fund(req, res) {
    try {
      const {
        user, body: {
          amount
        }
      } = req;

      const investor = await Investor.findOne({
        where: {
          userId: user.id
        },
        include: [
          {
            model: models.Wallet,
          }
        ]
      });

      if (!investor) {
        return serverResponse(req, res, 404, { message: 'investor does not exits' });
      }
      const newAmount = new Decimal(amount);
      const totalAmount = newAmount.plus(investor.Wallet.balance);
      const newWallet = await Wallet.update(
        { balance: totalAmount },
        { where: { id: investor.Wallet.id } }
      );

      if (!newWallet) {
        return serverResponse(req, res, 400, { message: 'wallet failed to fund' });
      }
      return serverResponse(req, res, 201, { message: 'wallet funded successfully', totalAmount });
    } catch (e) {
      return serverError(res);
    }
  }

  /**
     * @name Investment
     * @async
     * @static
     * @memberof Investor
     * @param {Object} request express request object
     * @param {Object} response express response object
     * @returns {JSON} JSON object with details of new user
     */
  static async Investment(request, response) {
    try {
      const {
        user
      } = request;

      const investor = await Investor.findOne({
        where: {
          userId: user.id
        },
        include: [
          {
            model: models.Investment,
          }
        ]
      });
      if (!investor) {
        return serverResponse(request, response, 404, { message: 'investor does not exits' });
      }
      return serverResponse(request, response, 200, {
        message: 'all Investments gotten successfully',
        Investments: investor.dataValues.Investments
      });
    } catch (e) {
      return serverError(res);
    }
  }

  /**
     * @name Investment
     * @async
     * @static
     * @memberof Investor
     * @param {Object} request express request object
     * @param {Object} response express response object
     * @returns {JSON} JSON object with details of new user
     */
  static async WalletBalance(request, response) {
    try {
      const {
        user
      } = request;

      const investor = await Investor.findOne({
        where: {
          userId: user.id
        },
        include: [
          {
            model: models.Wallet,
          },
          {
            model: models.Investment,
          }
        ]
      });
      if (!investor) {
        return serverResponse(request, response, 404, { message: 'investor does not exits' });
      }

      return serverResponse(request, response, 200, {
        message: 'wallet current balance',
        balance: investor.dataValues.Wallet.balance,
        investment: investor.dataValues.Investments.length
      });
    } catch (e) {
      return serverError(res);
    }
  }

  /**
     * @name Investment
     * @async
     * @static
     * @memberof Investor
     * @param {Object} request express request object
     * @param {Object} response express response object
     * @returns {JSON} JSON object with details of new user
     */
  static async getAllInvestorsCount(request, response) {
    try {
      const investorCount = await Investor.count();
      return serverResponse(request, response, 200, {
        message: 'total Investors',
        investors: investorCount
      });
    } catch (e) {
      return serverError(res);
    }
  }
}

export default Investors;
