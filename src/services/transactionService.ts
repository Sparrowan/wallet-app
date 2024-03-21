import Transaction from '../models/transactionModel';

export const createTransaction = async (
    walletId: string,
    amount: number,
    type: 'credit' | 'debit' | 'initial'
): Promise<any> => {
    const transaction = new Transaction({ wallet: walletId, amount, type });
    await transaction.save();
    return transaction;
};
