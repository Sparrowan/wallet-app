import mongoose, { Schema, Document, PopulatedDoc } from 'mongoose';
import { TransactionModel } from './transactionModel';

export interface WalletModel extends Document {
    amount: number;
    version: number;
    createdAt: Date;
    updatedAt: Date;
    transactions: PopulatedDoc<TransactionModel>[];
}

const WalletSchema: Schema = new Schema({
    amount: { type: Number, required: true },
    version: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }]
});

export default mongoose.model<WalletModel>('Wallet', WalletSchema, 'wallets');
