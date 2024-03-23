"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debitWallet = exports.creditWallet = exports.createWallet = exports.listWallets = void 0;
const walletService = __importStar(require("../services/walletService"));
const walletValidation_1 = require("../utils/validations/walletValidation");
const listWallets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wallets = yield walletService.listWallets();
        res.status(200).json({ success: true, data: wallets });
    }
    catch (error) {
        res.status(400).json({ success: false, error: 'Failed to fetch wallets' });
    }
});
exports.listWallets = listWallets;
const createWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield walletValidation_1.amountSchema.validate(req.body);
        const { amount } = req.body;
        const wallet = yield walletService.createWallet(amount);
        res.status(201).json({ success: true, data: wallet });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message || 'Failed to create wallet' });
    }
});
exports.createWallet = createWallet;
const creditWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield walletValidation_1.amountSchema.validate(req.body);
        const { id } = req.params;
        const { amount } = req.body;
        const wallet = yield walletService.creditWallet(id, amount);
        res.status(200).json({ success: true, data: wallet });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message || 'Failed to credit wallet' });
    }
});
exports.creditWallet = creditWallet;
const debitWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield walletValidation_1.amountSchema.validate(req.body);
        const { id } = req.params;
        const { amount } = req.body;
        const wallet = yield walletService.debitWallet(id, amount);
        res.status(200).json({ success: true, data: wallet });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message || 'Failed to debit wallet' });
    }
});
exports.debitWallet = debitWallet;
