import express from 'express';
import { listTransaction } from '../controllers/transactionController';

const router = express.Router();

router.get('/list', listTransaction);

export default router;
