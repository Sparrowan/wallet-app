"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const walletRoutes_1 = __importDefault(require("./routes/walletRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/wallet', walletRoutes_1.default);
app.use('/api/transactions', transactionRoutes_1.default);
exports.default = app;
