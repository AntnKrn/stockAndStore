"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsData = void 0;
const connection_1 = __importDefault(require("./connection"));
class ClientsData {
    static addClient(client) {
        try {
            const sql = "INSERT INTO clients (fullname, phoneNumber, address) VALUES (?,?,?)";
            const data = Object.values(client);
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
    static getClients() {
        try {
            const sql = "SELECT * FROM clients";
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
    static editClient(client) {
        try {
            const sql = "UPDATE clients SET fullname=?, phoneNumber=?, address=? WHERE clientID = ?";
            const data = Object.values(client);
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
    static deleteClient(id) {
        try {
            const sql = "DELETE FROM clients WHERE clientID = ?";
            return new Promise((resolve, reject) => {
                connection_1.default.query(sql, id, (err, result) => {
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
exports.ClientsData = ClientsData;
