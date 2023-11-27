"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
class ProductsData {
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
    static getProducts() {
        try {
            const sql = "SELECT * FROM products";
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
            console.log(err, "Error from getProducts Data");
        }
    }
    static editProduct(product) {
        try {
            const sql = "UPDATE products SET " +
                "name=?, brand=?, code=?, quantity=?, IDprovider=?, pricePurchase=?, "
                + "priceSale=?, volume=?, weight=?, dateReceipt=?, description=?"
                + "WHERE productID=?";
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
            console.log(err, "error from productsdata");
        }
    }
    static deleteProduct(id) {
        try {
            const sql = "DELETE FROM products WHERE productID=?";
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
            console.log(err, "error from deleteProduct data");
        }
    }
}
exports.default = ProductsData;
