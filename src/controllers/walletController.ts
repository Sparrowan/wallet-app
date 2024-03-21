import { Request, Response } from 'express';
import * as walletService from '../services/walletService';
import { createWalletSchema } from '../utils/validations/walletValidation';

export const createWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    await createWalletSchema.validate(req.body);
    const { amount } = req.body;
    const wallet = await walletService.createWallet(amount);
    res.status(201).json(wallet);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const creditWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const wallet = await walletService.creditWallet(id, amount);
    res.status(200).json(wallet);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const debitWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const wallet = await walletService.debitWallet(id, amount);
    res.status(200).json(wallet);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};
