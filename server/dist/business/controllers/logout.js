"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const user_1 = require("../services/user");
const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const token = await (0, user_1.logou)(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(token);
    }
    catch (err) {
        next(err);
    }
};
exports.logout = logout;
