import models from '../models';
import {
  serverResponse,
  serverError
}
  from '../helpers';

const { Post } = models;

/**
 * @export
 * @class Post
 */
class Posts {
  /**
   * @name Create
   * @async
   * @static
   * @memberof Articles
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
}

export default Posts;
