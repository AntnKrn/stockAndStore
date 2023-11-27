"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.logou = exports.log = exports.reg = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = require("../../data/Users");
const token_1 = require("./token");
const user_dto_1 = require("../dtos/user-dto");
const api_error_1 = require("../exceptions/api-error");
const reg = async (login, password) => {
    const condidate = await Users_1.UsersData.getUserByLogin(login);
    if (condidate.length !== 0) {
        throw api_error_1.ApiError.BadRequest(`Пользоватеь с почтовым адресом ${login} уже существует`);
    }
    const hashPassword = await bcrypt_1.default.hash(password, 3);
    await Users_1.UsersData.postUser({ login, hashPassword });
    const user = await Users_1.UsersData.getUserByLogin(login);
    const userDto = new user_dto_1.UserDto(user[0]);
    const tokens = (0, token_1.generateTokens)(userDto);
    await (0, token_1.saveToken)(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
};
exports.reg = reg;
const log = async (login, password) => {
    const user = await Users_1.UsersData.getUserByLogin(login);
    if (user.length === 0) {
        throw api_error_1.ApiError.BadRequest(`Пользоватеь с почтовым адресом ${login} не найден`);
    }
    const isPassEquals = await bcrypt_1.default.compare(password, user[0].password);
    if (!isPassEquals) {
        throw api_error_1.ApiError.BadRequest('Неверный пароль');
    }
    const userDto = new user_dto_1.UserDto(user[0]);
    const tokens = (0, token_1.generateTokens)(userDto);
    await (0, token_1.saveToken)(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
};
exports.log = log;
const logou = async (refreshToken) => {
    const token = await (0, token_1.removeToken)(refreshToken);
    return token;
};
exports.logou = logou;
const refresh = async (refreshToken) => {
    if (!refreshToken) {
        throw api_error_1.ApiError.UnauthorizedError();
    }
    const userData = (0, token_1.validateRefreshToken)(refreshToken);
    const dataFromDBbyRefreshToken = await (0, token_1.findToken)(refreshToken);
    const refreshTokenFromDB = dataFromDBbyRefreshToken[0].IDuser;
    console.log("fdskomfoidsofisd", userData);
    console.log("111111111", refreshTokenFromDB);
    if (userData.length === 0 || refreshTokenFromDB.length === 0) {
        throw api_error_1.ApiError.UnauthorizedError();
    }
    const user = await Users_1.UsersData.getUserByUserID(userData.payload.id);
    const userDto = new user_dto_1.UserDto(user[0]);
    const tokens = (0, token_1.generateTokens)(userDto);
    await (0, token_1.saveToken)(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
};
exports.refresh = refresh;
