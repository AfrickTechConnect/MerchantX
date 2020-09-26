import express from 'express';
import user from './user';
import follower from './follower';
import post from './post';

const route = express.Router();

route.use('/users', user);
route.use('/follow', follower);
route.use('/post', post);

export default route;
