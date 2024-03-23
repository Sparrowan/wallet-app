import mongoose, { Schema, Document } from 'mongoose';

export interface TransactionModel extends Document {
    wallet: mongoose.Types.ObjectId;
    amount: number;
    type: 'credit' | 'debit' | 'initial';
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema: Schema = new Schema({
    wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['credit', 'debit', 'initial'], required: true },
}, { timestamps: true }); 

export default mongoose.model<TransactionModel>('Transaction', TransactionSchema,'transactions');
