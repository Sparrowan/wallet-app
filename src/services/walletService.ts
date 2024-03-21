import mongoose from 'mongoose';
import Wallet, { WalletModel } from '../models/walletModel';
import Transaction from '../models/transactionModel';

export const createWallet = async (amount: number): Promise<WalletModel> => {
    try {
        const transaction = new Transaction({ amount, type: 'initial' });
        const wallet = new Wallet({ amount, transactions: [transaction] });
        transaction.wallet = wallet._id;
        await transaction.save();
        await wallet.save();
        const populatedWallet = await Wallet.findById(wallet._id).populate('transactions');
        if (!populatedWallet) {
            throw new Error('Wallet not found');
        }

        return populatedWallet;
    } catch (error) {
        throw error;
    }

};






export const creditWallet = async (walletId: string, amount: number): Promise<any> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let wallet = await Wallet.findOneAndUpdate(
            { _id: walletId },
            { $inc: { amount: amount, version: 1 } }, // Increment both amount and version
            { new: true, session }
        );
        if (!wallet) {
            throw new Error('Wallet not found or has been updated by another transaction');
        }
        const transaction = new Transaction({ wallet: walletId, amount, type: 'credit' });
        await transaction.save({ session });
        await session.commitTransaction();
        session.endSession();
        return wallet;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const debitWallet = async (walletId: string, amount: number): Promise<any> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let wallet = await Wallet.findOneAndUpdate(
            { _id: walletId },
            { $inc: { amount: -amount, version: 1 } }, // Decrement amount and increment version
            { new: true, session }
        );
        if (!wallet) {
            throw new Error('Wallet not found or has been updated by another transaction');
        }
        if (wallet.amount < 0) {
            throw new Error('Insufficient funds');
        }
        const transaction = new Transaction({ wallet: walletId, amount, type: 'debit' });
        await transaction.save({ session });
        await session.commitTransaction();
        session.endSession();
        return wallet;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
