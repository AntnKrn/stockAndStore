"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const user_1 = require("../services/user");
const login = async (req, res, next) => {
    try {
        const { login, password } = req.body;
        const userData = await (0, user_1.log)(login, password);
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.status(201).json(userData);
    }
    catch (err) {
        console.log(err);
    }
};
exports.login = login;
