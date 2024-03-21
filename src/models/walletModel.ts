import mongoose, { Schema, Document, PopulatedDoc } from 'mongoose';
import { Transaction } from './transactionModel';

export interface WalletModel extends Document {
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    transactions: PopulatedDoc<Transaction>[];
}

const WalletSchema: Schema = new Schema({
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }]
});

export default mongoose.model<WalletModel>('Wallet', WalletSchema, 'wallets');
