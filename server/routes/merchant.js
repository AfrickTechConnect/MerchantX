import express from 'express';
import Merchant from '../Controllers/Merchant';
import { MerchantValidator, verifyToken } from '../middlewares';

const route = express.Router();

route.post('/add', MerchantValidator.createMerchantValidation(), verifyToken, Merchant.create);
//route.get('/details', Merchant.getDetails);
route.patch('/rate', MerchantValidator.rateMerchantValidation(), verifyToken, Merchant.rate);

export default route;
