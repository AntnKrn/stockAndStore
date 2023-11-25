"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reg = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = require("../../data/Users");
const token_1 = require("./token");
const user_dto_1 = require("../dtos/user-dto");
const reg = async (login, password) => {
    const condidate = await Users_1.UsersData.getUserByLogin(login);
    if (condidate.length !== 0) {
        throw new Error("Пользоватеь с почтовым адресом " + login + " уже существует");
    }
    const hashPassword = await bcrypt_1.default.hash(password, 3);
    await Users_1.UsersData.postUser({ login, hashPassword });
    const user = await Users_1.UsersData.getUserByLogin(login);
    const userDto = new user_dto_1.UserDto(user[0]);
    const tokens = (0, token_1.generateTokens)(userDto);
    console.log(userDto.id);
    console.log(tokens.refreshToken);
    await (0, token_1.saveToken)(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
};
exports.reg = reg;
