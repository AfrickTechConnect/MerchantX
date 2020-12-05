import models from '../models';
import {
  serverResponse,
  serverError,
  paginationValues,
  pageCounter
}
  from '../helpers';

const { User, Post, Comment } = models;
/**
 * @export
 * @class Users
 */
class Admin {
  /**
     * @name AllUsers
     * @async
     * @static
     * @memberof Users
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @returns {JSON} JSON object with details of new user
     */
  static async AllUsers(req, res) {
    try {
      const { offset, limit } = paginationValues(req.query);
      const {
        page, pageItem
      } = req.query;
      let allUsers = await User.findAndCountAll({
        offset,
        limit
      });
      const { count } = allUsers;
      const { totalPages, itemsOnPage, parsedPage } = pageCounter(count, page, pageItem);
      allUsers = {
        total: count,
        totalPages,
        itemsOnPage,
        parsedPage,
        data: allUsers.rows
      };
      serverResponse(res, 200, allUsers);
    } catch (error) {
      return res.status(500).json({ message: 'failed to get all post' });
    }
  }
}

export default Admin;
