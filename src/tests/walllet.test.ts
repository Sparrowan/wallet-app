import request from 'supertest';
import mongoose from 'mongoose';
import { connectToDatabase } from '../db';
import app from '../app';
import { WalletModel } from '../models/walletModel';

// Connect to database before running tests
beforeAll(async () => {
    await connectToDatabase();
});

// Close database connection after running tests
afterAll(async () => {
    await mongoose.disconnect().then(() => console.log('DB Disconnected'));
});

describe('Test wallet service endpoints', () => {
    let createdWalletId: string;

    test('Create wallet', async () => {
        const initialAmount = 100;
        const res = await request(app)
            .post('/api/wallet/create')
            .send({ amount: initialAmount });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('_id');
        createdWalletId = res.body.data._id;
    });

    test('List wallets', async () => {
        const res = await request(app).get('/api/wallet/list');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        res.body.data.forEach((wallet: WalletModel) => {
            expect(wallet).toHaveProperty('_id');
        });
    });

    test('Credit wallet', async () => {
        const creditAmount = 50;
        const res = await request(app)
            .put(`/api/wallet/${createdWalletId}/credit`)
            .send({ amount: creditAmount });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('_id', createdWalletId);
        expect(res.body.data).toHaveProperty('amount', 150); // Initial amount + credit
    });

    test('Debit wallet', async () => {
        const debitAmount = 30;
        const res = await request(app)
            .put(`/api/wallet/${createdWalletId}/debit`)
            .send({ amount: debitAmount });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('_id', createdWalletId);
        expect(res.body.data).toHaveProperty('amount', 120); // Initial amount + credit - debit
    });
});
