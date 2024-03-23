"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debitWallet = exports.creditWallet = exports.createWallet = exports.listWallets = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const walletModel_1 = __importDefault(require("../models/walletModel"));
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
const listWallets = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wallets = yield walletModel_1.default.find()
            .populate({
            path: 'transactions',
            options: { sort: { createdAt: -1 } }
        })
            .sort({ createdAt: -1 });
        return wallets;
    }
    catch (error) {
        console.error('Error fetching wallets:', error);
        throw new Error('Failed to fetch wallets');
    }
});
exports.listWallets = listWallets;
const createWallet = (amount) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const transaction = new transactionModel_1.default({ amount, type: 'initial' });
        const wallet = new walletModel_1.default({ amount, transactions: [transaction] });
        transaction.wallet = wallet._id;
        yield transaction.save({ session });
        yield wallet.save({ session });
        const populatedWallet = yield walletModel_1.default.findById(wallet._id)
            .populate({
            path: 'transactions',
            options: { sort: { createdAt: -1 } }
        })
            .session(session);
        if (!populatedWallet) {
            throw new Error('Wallet not found');
        }
        yield session.commitTransaction();
        session.endSession();
        return populatedWallet;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.createWallet = createWallet;
const creditWallet = (walletId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Create a new transaction for credit
        const transaction = new transactionModel_1.default({ wallet: walletId, amount, type: 'credit' });
        // Increment amount and version, and associate the transaction
        let wallet = yield walletModel_1.default.findOneAndUpdate({ _id: walletId }, { $inc: { amount: amount, version: 1 }, $push: { transactions: transaction } }, { new: true, session }).populate({
            path: 'transactions',
            options: { sort: { createdAt: -1 } }
        });
        if (!wallet) {
            throw new Error('Wallet not found or has been updated by another transaction');
        }
        // Save the transaction
        yield transaction.save({ session });
        // Commit the transaction
        yield session.commitTransaction();
        session.endSession();
        return wallet;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.creditWallet = creditWallet;
const debitWallet = (walletId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Create a new transaction for debit
        const transaction = new transactionModel_1.default({ wallet: walletId, amount, type: 'debit' });
        // Decrement amount and increment version, and associate the transaction
        let wallet = yield walletModel_1.default.findOneAndUpdate({ _id: walletId }, { $inc: { amount: -amount, version: 1 }, $push: { transactions: transaction } }, { new: true, session }).populate({
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
        yield transaction.save({ session });
        // Commit the transaction
        yield session.commitTransaction();
        session.endSession();
        return wallet;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.debitWallet = debitWallet;
