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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("../db");
const app_1 = __importDefault(require("../app"));
// Connect to database before running tests
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectToDatabase)();
}));
// Close database connection after running tests
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect().then(() => console.log('DB Disconnected'));
}));
describe('Test wallet service endpoints', () => {
    let createdWalletId;
    test('Create wallet', () => __awaiter(void 0, void 0, void 0, function* () {
        const initialAmount = 100;
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/wallet/create')
            .send({ amount: initialAmount });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('_id');
        createdWalletId = res.body.data._id;
    }));
    test('List wallets', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/api/wallet/list');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        res.body.data.forEach((wallet) => {
            expect(wallet).toHaveProperty('_id');
        });
    }));
    test('Credit wallet', () => __awaiter(void 0, void 0, void 0, function* () {
        const creditAmount = 50;
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/wallet/${createdWalletId}/credit`)
            .send({ amount: creditAmount });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('_id', createdWalletId);
        expect(res.body.data).toHaveProperty('amount', 150); // Initial amount + credit
    }));
    test('Debit wallet', () => __awaiter(void 0, void 0, void 0, function* () {
        const debitAmount = 30;
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/wallet/${createdWalletId}/debit`)
            .send({ amount: debitAmount });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('_id', createdWalletId);
        expect(res.body.data).toHaveProperty('amount', 120); // Initial amount + credit - debit
    }));
});
