"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeToken = exports.saveToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Token_1 = require("../../data/Token");
const generateTokens = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign({ payload }, "access", { expiresIn: '30m' });
    const refreshToken = jsonwebtoken_1.default.sign({ payload }, "refresh", { expiresIn: '30d' });
    return {
        accessToken,
        refreshToken
    };
};
exports.generateTokens = generateTokens;
const saveToken = async (IDuser, refreshToken) => {
    const tokenData = await Token_1.TokenData.getTokenByIDUser(IDuser);
    if (tokenData.length !== 0) {
        return await Token_1.TokenData.updateToken(IDuser, refreshToken);
    }
    const token = await Token_1.TokenData.postToken({ IDuser, refreshToken });
    return token;
};
exports.saveToken = saveToken;
const removeToken = async (refreshToken) => {
    const tokenData = await Token_1.TokenData.deleteToken(refreshToken);
    return tokenData;
};
exports.removeToken = removeToken;
