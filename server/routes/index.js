import express from 'express';
import user from './user';
import follower from './follower';

const route = express.Router();

route.use('/users', user);
route.use('/follow', follower);

export default route;
