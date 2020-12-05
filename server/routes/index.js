import express from 'express';
import user from './user';
import merchant from './merchant';

const route = express.Router();

route.use('/users', user);
route.use('/merchant', merchant);

export default route;
