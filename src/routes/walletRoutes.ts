import express from 'express';
import { createWallet, creditWallet, debitWallet } from '../controllers/walletController';

const router = express.Router();

router.post('/create', createWallet);
router.put('/:id/credit', creditWallet);
router.put('/:id/debit', debitWallet);

export default router;
