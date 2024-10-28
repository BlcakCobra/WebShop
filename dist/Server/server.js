"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const express_rate_limit_1 = require("express-rate-limit");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use((0, body_parser_1.json)());
app.use(limiter);
app.get('/', (req, res) => {
    res.json({ message: 'Добро пожаловать в наш интернет-магазин одежды!' });
});
const PORT = process.env.EXPRESS_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Express сервер запущен на порту ${PORT}`);
});
