import express from 'express';
import Followers from '../Controllers/Followers';
import { verifyToken } from '../middlewares';

const route = express.Router();

route.post(
  '/:username',
  verifyToken,
  Followers.follow
);
route.get(
  '/followers',
  verifyToken,
  Followers.allFollwers
);
route.get(
  '/followings',
  verifyToken,
  Followers.allFollowings
);
route.delete(
  '/:username',
  verifyToken,
  Followers.unfollow
);

export default route;
