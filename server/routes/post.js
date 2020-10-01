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
  '/all',
  verifyToken,
  Posts.AllPosts
);

route.get(
  '/find/:id',
  Posts.Find
);

route.get(
  '/',
  verifyToken,
  Posts.UsersPosts
);

export default route;
