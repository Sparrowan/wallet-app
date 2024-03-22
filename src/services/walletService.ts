import mongoose from 'mongoose';
import Wallet, { WalletModel } from '../models/walletModel';
import Transaction from '../models/transactionModel';
import walletModel from '../models/walletModel';



export const listWallets = async (): Promise<WalletModel[]> => {
    try {
        const wallets = await walletModel.find().populate({
            path: 'transactions',
            options: { sort: { createdAt: -1 } }
        }).sort({ createdAt: -1 });
        return wallets;
    } catch (error) {
        throw error;
    }

};



export const createWallet = async (amount: number): Promise<WalletModel> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const transaction = new Transaction({ amount, type: 'initial' });
        const wallet = new Wallet({ amount, transactions: [transaction] });
        transaction.wallet = wallet._id;

        // Save transaction and wallet within the same session
        await transaction.save({ session });
        await wallet.save({ session });

        // Populate wallet with transactions
        const populatedWallet = await Wallet.findById(wallet._id)
            .populate({
                path: 'transactions',
                options: { sort: { createdAt: -1 } }
            })
            .session(session);

        if (!populatedWallet) {
            throw new Error('Wallet not found');
        }

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return populatedWallet;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};



export const creditWallet = async (walletId: string, amount: number): Promise<WalletModel> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Create a new transaction for credit
        const transaction = new Transaction({ wallet: walletId, amount, type: 'credit' });

        // Increment amount and version, and associate the transaction
        let wallet = await Wallet.findOneAndUpdate(
            { _id: walletId },
            { $inc: { amount: amount, version: 1 }, $push: { transactions: transaction } },
            { new: true, session }
        ).populate({
            path: 'transactions',
            options: { sort: { createdAt: -1 } }
        });

        if (!wallet) {
            throw new Error('Wallet not found or has been updated by another transaction');
        }

        // Save the transaction
        await transaction.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return wallet;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


export const debitWallet = async (walletId: string, amount: number): Promise<WalletModel> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Create a new transaction for debit
        const transaction = new Transaction({ wallet: walletId, amount, type: 'debit' });

        // Decrement amount and increment version, and associate the transaction
        let wallet = await Wallet.findOneAndUpdate(
            { _id: walletId },
            { $inc: { amount: -amount, version: 1 }, $push: { transactions: transaction } },
            { new: true, session }
        ).populate({
            path: 'transactions',
            options: { sort: { createdAt: -1 } }
        });

        if (!wallet) {
            throw new Error('Wallet not found or has been updated by another transaction');
        }

        if (wallet.amount < 0) {
            throw new Error('Insufficient funds');
        }
        // Save the transaction
        await transaction.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return wallet;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


