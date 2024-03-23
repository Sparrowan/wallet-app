import Transaction, { TransactionModel } from '../models/transactionModel';


export const listTransactions = async (): Promise<TransactionModel[]> => {
    try {
        const transactions = await Transaction.find()
            .populate('wallet')
            .sort({ createdAt: -1 });
        return transactions;
    } catch (error) {
        throw new Error('Failed to fetch transactions');
    }
};
