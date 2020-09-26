import models from '../models';
import {
  serverResponse,
  serverError,
  paginationValues,
  pageCounter
}
  from '../helpers';

const { Post } = models;

/**
 * @export
 * @class Posts
 */
class Posts {
  /**
   * @name Create
   * @async
   * @static
   * @memberof Posts
   * @param {Object} req express request object
   * @param {Object} res express response object
   * @returns {JSON} JSON object with details of new article
   */
  static async Create(req, res) {
    try {
      const {
        body,
        user: { id }
      } = req;

      const myArticle = await Post.create({
        authorId: id,
        ...body,
      });
      return serverResponse(res, 200, { message: 'successful', data: { ...myArticle.dataValues } });
    } catch (e) {
      return serverError(req, res, e);
    }
  }

  /**
   * @name GetAll
   * @async
   * @static
   * @memberof Posts
   * @param {Object} req express request object
   * @param {Object} res express response object
   * @returns {JSON} JSON object with details of new article
   */
  static async AllPosts(req, res) {
    try {
      const {
        user: { id }
      } = req;
      const { page, pageItems } = req.query;
      const { offset, limit } = paginationValues(req.query);
      const userPosts = await Post.findAndCountAll({
        where: {
          authorId: id
        },
        limit,
        offset
      });
      const { count } = userPosts;
      const { totalPages, itemsOnPage, parsedPage } = pageCounter(count, page, pageItems);
      const userPost = {
        totalPages,
        itemsOnPage,
        parsedPage,
        data: userPosts.rows
      };
      return serverResponse(res, 200, { message: 'successful', data: { userPost } });
    } catch (e) {
      return serverError(req, res, e);
    }
  }
}

export default Posts;
