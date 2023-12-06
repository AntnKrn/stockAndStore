"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersData = void 0;
const connection_1 = __importDefault(require("./connection"));
class OrdersData {
    static getOrders() {
        try {
            const sql = "SELECT * FROM orders ORDER BY data DESC";
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
    static postOrder(client) {
        try {
            const sql = "INSERT INTO orders (IDclient, IDproduct, quantity, price, data, IDemployee) VALUES (?,?,?,?,?,?)";
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
    static editOrder(client) {
        try {
            const sql = "UPDATE orders SET IDclient=?, IDproduct=?, quantity=?, price=?, data=?, IDemployee=? WHERE orderID=?";
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
    static deleteOrder(id) {
        try {
            const sql = "DELETE FROM orders WHERE orderID=?";
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
exports.OrdersData = OrdersData;
