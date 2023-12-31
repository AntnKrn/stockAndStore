"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const registration_1 = __importDefault(require("./business/routers/registration"));
const login_1 = __importDefault(require("./business/routers/login"));
const logout_1 = __importDefault(require("./business/routers/logout"));
const users_1 = __importDefault(require("./business/routers/users"));
const providers_1 = __importDefault(require("./business/routers/providers"));
const products_1 = __importDefault(require("./business/routers/products"));
const clients_1 = __importDefault(require("./business/routers/clients"));
const employees_1 = __importDefault(require("./business/routers/employees"));
const orders_1 = __importDefault(require("./business/routers/orders"));
const error_1 = require("./business/middleware/error");
const refresh_1 = __importDefault(require("./business/routers/refresh"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use('/refresh', refresh_1.default);
app.use('/users', users_1.default);
app.use('/registration', registration_1.default);
app.use('/login', login_1.default);
app.use('/logout', logout_1.default);
app.use('/providers', providers_1.default);
app.use('/products', products_1.default);
app.use('/clients', clients_1.default);
app.use('/employees', employees_1.default);
app.use('/orders', orders_1.default);
app.use((err, req, res) => {
    res.status(500).json({ message: err.message });
});
app.use(error_1.errorMiddleware);
app.listen(process.env.PORT || 3000);
