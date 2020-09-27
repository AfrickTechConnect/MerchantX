import express from 'express';
import Comment from '../Controllers/Comment';
import { verifyToken, CommentValidator } from '../middlewares';

const route = express.Router();

route.post(
  '/:slug',
  CommentValidator.createCommentValidation(),
  verifyToken,
  Comment.create
);


export default route;
