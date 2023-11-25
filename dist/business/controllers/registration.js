"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = void 0;
const user_1 = require("../services/user");
const registration = async (req, res, next) => {
    try {
        const { login, password } = req.body;
        const userData = await (0, user_1.reg)(login, password);
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.status(201).json(userData);
    }
    catch (err) {
        console.log(err);
    }
};
exports.registration = registration;
