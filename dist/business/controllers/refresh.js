"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const user_1 = require("../services/user");
const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const userData = await (0, user_1.refresh)(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.status(201).json(userData);
    }
    catch (err) {
        console.log(err);
    }
};
exports.refreshToken = refreshToken;
