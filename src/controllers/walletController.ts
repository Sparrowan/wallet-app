import { Request, Response } from 'express';
import * as walletService from '../services/walletService';

export const listWallets = async (req: Request, res: Response): Promise<void> => {
  try {
    const wallets = await walletService.listWallets();
    res.status(200).json({ success: true, data: wallets });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch wallets' });
  }
};

export const createWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount } = req.body;
    const wallet = await walletService.createWallet(amount);
    res.status(201).json({ success: true, data: wallet });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message || 'Failed to create wallet' });
  }
};

export const creditWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const wallet = await walletService.creditWallet(id, amount);
    res.status(200).json({ success: true, data: wallet });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message || 'Failed to credit wallet' });
  }
};

export const debitWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const wallet = await walletService.debitWallet(id, amount);
    res.status(200).json({ success: true, data: wallet });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message || 'Failed to debit wallet' });
  }
};
