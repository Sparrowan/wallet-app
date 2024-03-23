import { Request, Response } from 'express';
import * as transactionService from '../services/transactionService';

export const listTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await transactionService.listTransactions();
        res.status(200).json({ success: true, data: transactions });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
