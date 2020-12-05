import express from 'express';
import Merchant from '../Controllers/Merchant';
import { MerchantValidator, verifyToken } from '../middlewares';

const route = express.Router();

route.post('/create', MerchantValidator.createMerchantValidation(), verifyToken, Merchant.create);
route.get('/all', Merchant.getAll);
route.patch('/rate', MerchantValidator.rateMerchantValidation(), verifyToken, Merchant.rate);
route.get('/fundpool', verifyToken, Merchant.fundPool);
route.get('/', Merchant.getAllMerchantCount);

export default route;
