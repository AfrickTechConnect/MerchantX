import express from 'express';
import Investor from '../Controllers/Investor';
import { verifyToken, InvestorValidator } from '../middlewares';

const route = express.Router();

route.post('/create', InvestorValidator.createInvestorValidation(), verifyToken, Investor.create);
route.post('/invest', verifyToken, Investor.Invest);
route.post('/fund/wallet', verifyToken, Investor.Fund);
route.get('/metrics', verifyToken, Investor.WalletBalance);
route.get('/investments', verifyToken, Investor.Investment);
route.get('/', Investor.getAllInvestorsCount);

export default route;
