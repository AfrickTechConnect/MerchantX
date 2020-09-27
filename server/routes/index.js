import express from 'express';
import user from './user';
import follower from './follower';
import post from './post';
import comment from './comment';

const route = express.Router();

route.use('/users', user);
route.use('/follow', follower);
route.use('/post', post);
route.use('/comment', comment);

export default route;
