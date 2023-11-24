"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
class ProviderData {
    static fetchProviders() {
        return new Promise((resolve, reject) => {
            connection_1.default.query('SELECT * from providers', (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    static postProvider(provider) {
        try {
            const sql = "INSERT INTO providers (name, phoneNumber, category, address, contactPerson, email) VALUES (?,?,?,?,?,?)";
            const data = Object.values(provider);
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
            console.log(err, "Error from data postProvider");
        }
    }
    static editProvider(provider) {
        try {
            const sql = "UPDATE providers SET name=?, phoneNumber=?, category=?, address=?, contactPerson=?, email=? WHERE providerID=?";
            const data = Object.values(provider);
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
            console.log(err, "error from data editProvider");
        }
    }
    static deleteProvider(id) {
        try {
            const sql = "DELETE FROM providers WHERE providerID=?";
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
            console.log(err, "Error from deleteProvider data");
        }
    }
    static addProduct(product) {
        try {
            const sql = "INSERT INTO products" +
                "(name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description)" +
                "VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            const data = Object.values(product);
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
            console.log("error from data addProduct", err);
        }
    }
}
exports.default = ProviderData;
