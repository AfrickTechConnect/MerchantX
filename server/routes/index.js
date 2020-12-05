import express from 'express';
import user from './user';
import merchant from './merchant';
import investor from './investor';

const route = express.Router();

route.use('/users', user);
route.use('/merchant', merchant);
route.use('/investor', investor);

export default route;
