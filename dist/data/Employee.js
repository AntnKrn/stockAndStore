"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesData = void 0;
const connection_1 = __importDefault(require("./connection"));
class EmployeesData {
    static getEmployees() {
        const sql = "SELECT * FROM employees";
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
    static postEmployee(client) {
        const sql = "INSERT INTO employees (fullname, position, passportNumber, email) "
            + "VALUES (?,?,?,?)";
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
    static editEmployee(client) {
        const sql = "UPDATE employees SET fullname=?, position=?, passportNumber=?, email=? WHERE employeeID=?";
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
    static deleteEmployee(id) {
        const sql = "DELETE FROM employees WHERE employeeID=?";
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
}
exports.EmployeesData = EmployeesData;
