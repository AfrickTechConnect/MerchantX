import express from 'express';
import Posts from '../Controllers/Post';
import { verifyToken, PostValidator } from '../middlewares';

const route = express.Router();

route.post(
  '/',
  PostValidator.createPostValidation(),
  verifyToken,
  Posts.Create
);

route.get(
  '/',
  verifyToken,
  Posts.AllPosts
);

export default route;
