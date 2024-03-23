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
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("../db");
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectToDatabase)();
}));
// Close database connection after running tests
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect().then(() => console.log('DB Disconnected'));
}));
describe('Test transaction service endpoints', () => {
    test('List transactions', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/api/transactions/list');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        res.body.data.forEach((Transaction) => {
            expect(Transaction).toHaveProperty('_id');
            expect(Transaction).toHaveProperty('amount');
            expect(Transaction).toHaveProperty('type');
        });
    }));
});
