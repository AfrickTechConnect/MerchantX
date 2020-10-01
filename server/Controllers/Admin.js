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

  /**
     * @name AllComments
     * @async
     * @static
     * @memberof Users
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @returns {JSON} JSON object with details of new user
     */
  static async AllComments(req, res) {
    try {
      const { offset, limit } = paginationValues(req.query);
      const {
        page, pageItem
      } = req.query;
      let allComments = await Comment.findAndCountAll({
        offset,
        limit
      });
      const { count } = allComments;
      const { totalPages, itemsOnPage, parsedPage } = pageCounter(count, page, pageItem);
      allComments = {
        total: count,
        totalPages,
        itemsOnPage,
        parsedPage,
        data: allComments.rows
      };
      serverResponse(res, 200, allComments);
    } catch (error) {
      return res.status(500).json({ message: 'failed to get all post' });
    }
  }

  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @memberof User
   * @returns {json}  object
   */
  static async EditPost(req, res) {
    try {
      const { id } = req.params;
      const possiblePost = await Post.findOne({
        where: {
          id
        }
      });

      if (!possiblePost) {
        return serverResponse(res, 404, {
          message: 'Post does not exist'
        });
      }

      await Post.update({ ...req.body }, { where: { id } });

      const updatedPost = await Post.findOne({
        where: {
          id
        }
      });

      return serverResponse(req, res, 200, {
        message: 'post updated successfully',
        data: {
          ...updatedPost.dataValues
        }
      });
    } catch (error) {
      return serverError(res, { message: 'an error occoured, will be resolved shortly' });
    }
  }

  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @memberof User
   * @returns {json}  object
   */
  static async EditUser(req, res) {
    try {
      const { id } = req.params;
      const possibleUser = await User.findOne({
        where: {
          id
        }
      });

      if (!possibleUser) {
        return serverResponse(res, 404, {
          message: 'User does not exist'
        });
      }

      await User.update({ ...req.body }, { where: { id } });

      const updatedPost = await User.findOne({
        where: {
          id
        }
      });

      return serverResponse(req, res, 200, {
        message: 'user updated successfully',
        data: {
          ...updatedPost.dataValues
        }
      });
    } catch (error) {
      return serverError(res, { message: 'an error occoured,  will be resolved shortly' });
    }
  }

  /**
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @memberof User
   * @returns {json}  object
   */
  static async EditComment(req, res) {
    try {
      const { id } = req.params;
      const possibleComment = await Comment.findOne({
        where: {
          id
        }
      });

      if (!possibleComment) {
        return serverResponse(res, 404, {
          message: 'comment does not exist'
        });
      }

      await Comment.update({ ...req.body }, { where: { id } });

      const updatedPost = await Comment.findOne({
        where: {
          id
        }
      });

      return serverResponse(req, res, 200, {
        message: 'comment updated successfully',
        data: {
          ...updatedPost.dataValues
        }
      });
    } catch (error) {
      return serverError(res, { message: 'an error occoured,  will be resolved shortly' });
    }
  }
}

export default Admin;
