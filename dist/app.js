"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const providers_1 = __importDefault(require("./business/routers/providers"));
const products_1 = __importDefault(require("./business/routers/products"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use('/providers', providers_1.default);
app.use('/products', products_1.default);
app.use((err, req, res) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000);