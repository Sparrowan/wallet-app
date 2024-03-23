import mongoose from "mongoose";
import { TransactionModel } from "../models/transactionModel";
import { connectToDatabase } from "../db";
import app from "../app";
import request from 'supertest';



beforeAll(async () => {
    await connectToDatabase();
});

// Close database connection after running tests
afterAll(async () => {
    await mongoose.disconnect().then(() => console.log('DB Disconnected'));
});


describe('Test transaction service endpoints', () => {
    test('List transactions', async () => {
        const res = await request(app).get('/api/transactions/list');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        res.body.data.forEach((Transaction: TransactionModel) => {
            expect(Transaction).toHaveProperty('_id');
            expect(Transaction).toHaveProperty('amount');
            expect(Transaction).toHaveProperty('type');
        });
    });
});