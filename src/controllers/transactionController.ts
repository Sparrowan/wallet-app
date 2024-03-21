import { Request, Response } from 'express';
import * as transactionService from '../services/transactionService';

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { walletId, amount, type } = req.body;
        const transaction = await transactionService.createTransaction(walletId, amount, type);
        res.status(201).json(transaction);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
