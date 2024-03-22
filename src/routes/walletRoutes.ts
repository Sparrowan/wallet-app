import express from 'express';
import { createWallet, creditWallet, debitWallet, listWallets } from '../controllers/walletController';

const router = express.Router();

router.post('/create', createWallet);
router.get('/list', listWallets);
router.put('/:id/credit', creditWallet);
router.put('/:id/debit', debitWallet);


export default router;
