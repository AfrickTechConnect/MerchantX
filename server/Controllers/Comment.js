import models from '../models';
import { serverResponse, serverError, isFollowing } from '../helpers';

const { Comment, Post } = models;

/**
 *
 *
 * @class Comments
 */
class Comments {
  /**
   * @name create
   * @async
   * @static
   * @memberof Comments
   * @param {Object} req express request object
   * @param {Object} res express response object
   * @returns {JSON} JSON object with details of new follower
   */
  static async create(req, res) {
    try {
      const { id: userId } = req.user;
      const { slug } = req.params;
      const { comment } = req.body;
      const post = await Post.findBySlug(slug);
      if (!post) {
        return serverResponse(res, 404, { message: 'post not found' });
      }
      const postAuthorId = post.authorId;
      const isFollow = await isFollowing(postAuthorId, userId);
      console.log(isFollow, 'This is our isFollow', postAuthorId, 'authorId', userId, 'user id');
      if (!isFollow) {
        if (postAuthorId !== userId) return serverResponse(res, 401, { message: 'user not authorized to comment' });
      }
      const commentData = await Comment.create({
        userId,
        comment,
        postId: post.id
      });
      console.log(commentData, 'comment data');
      return serverResponse(res, 200,
        { message: 'comment added successfully', data: { commentData } });
    } catch (e) {
      console.log(e, 'this is the error>>>');
      return serverError(req, res, e);
    }
  }
}

export default Comments;
