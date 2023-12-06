"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersData = void 0;
const connection_1 = __importDefault(require("./connection"));
class UsersData {
    static getUsers() {
        try {
            const sql = "SELECT * FROM users";
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
    static postUser(user) {
        try {
            const sql = "INSERT INTO users (login, password, role) VALUES (?,?,'user')";
            const data = Object.values(user);
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
    static getUserByLogin(login) {
        try {
            const sql = "SELECT * FROM users WHERE login=?";
            return new Promise((resolve, reject) => {
                connection_1.default.query(sql, login, (err, result) => {
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
    static getUserByUserID(userID) {
        try {
            const sql = "SELECT * FROM users WHERE userID=?";
            return new Promise((resolve, reject) => {
                connection_1.default.query(sql, userID, (err, result) => {
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
exports.UsersData = UsersData;
