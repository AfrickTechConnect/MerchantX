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
   * @name Get
   * @async
   * @static
   * @memberof Posts
   * @param {Object} req express request object
   * @param {Object} res express response object
   * @returns {JSON} JSON object with details of new article
   */
  static async Find(req, res) {
    try {
      const {
        params: { id },
      } = req;

      const myArticle = await Post.findOne({
        where: { id },
        include: [
          {
            model: models.Comment,
            include: [
              {
                model: models.User,
                as: 'author',
                attributes: [
                  'id',
                  'firstname',
                  'lastname',
                  'avatarUrl'
                ]
              }
            ]
          },
        ]
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
  static async UsersPosts(req, res) {
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
        offset,
        order: [
          ['id', 'DESC'],
        ],
        include: [
          {
            model: models.Comment,
            include: [
              {
                model: models.User,
                as: 'author',
                attributes: [
                  'id',
                  'firstname',
                  'lastname',
                  'avatarUrl'
                ]
              }
            ]
          },
        ]
      });
      const { count } = userPosts;
      const { totalPages, itemsOnPage, parsedPage } = pageCounter(count, page, pageItems);
      const userPost = {
        totalPages,
        itemsOnPage,
        parsedPage,
        posts: userPosts.rows
      };
      return serverResponse(res, 200, { message: 'successful', data: { ...userPost } });
    } catch (e) {
      return serverError(req, res, e);
    }
  }

  /**
     * @name allPost
     * @async
     * @static
     * @memberof Users
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @returns {JSON} JSON object with details of new user
     */
  static async AllPosts(req, res) {
    try {
      const { offset, limit } = paginationValues(req.query);
      const {
        page, pageItem
      } = req.query;
      let allPosts = await Post.findAndCountAll({
        offset,
        limit,
        include: [
          {
            model: models.User,
            as: 'Author',
            attributes: [
              'id',
              'firstname',
              'lastname',
              'avatarUrl'
            ]
          },
          {
            model: models.Comment,
            include: [
              {
                model: models.User,
                as: 'author',
                attributes: [
                  'id',
                  'firstname',
                  'lastname',
                  'avatarUrl'
                ]
              }
            ]
          },
        ]
      });
      const { count } = allPosts;
      const { totalPages, itemsOnPage, parsedPage } = pageCounter(count, page, pageItem);
      allPosts = {
        total: count,
        totalPages,
        itemsOnPage,
        parsedPage,
        data: allPosts.rows
      };
      serverResponse(res, 200, allPosts);
    } catch (error) {
      console.log(error, 'this is the error>>>>');
      return res.status(500).json({ message: 'failed to get all post' });
    }
  }
}

export default Posts;
