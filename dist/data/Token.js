"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenData = void 0;
const connection_1 = __importDefault(require("./connection"));
class TokenData {
    static getTokens() {
        try {
            const sql = "SELECT * FROM tokens";
            return new Promise((resolve, reject) => {
                connection_1.default.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    static postToken(token) {
        try {
            const sql = "INSERT INTO tokens (IDuser, refreshtoken) VALUES (?,?)";
            const data = Object.values(token);
            return new Promise((resolve, reject) => {
                connection_1.default.query(sql, data, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    static getTokenByIDUser(IDuser) {
        try {
            const sql = "SELECT * FROM tokens WHERE IDuser=?";
            return new Promise((resolve, reject) => {
                connection_1.default.query(sql, IDuser, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    static updateToken(IDuser, refreshToken) {
        try {
            const sql = "UPDATE tokens SET IDuser=?, refreshtoken=?";
            const data = [IDuser, refreshToken];
            return new Promise((resolve, reject) => {
                connection_1.default.query(sql, data, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.TokenData = TokenData;
