import connection from "./connection";

export abstract class EmployeesData {
    static getEmployees() {
        const sql = "SELECT * FROM employees";
    
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static postEmployee(client: object) {
        const sql = "INSERT INTO employees (fullname, position, passportNumber, email) "
            + "VALUES (?,?,?,?)";
        const data = Object.values(client);

        return new Promise((resolve, reject) => {
            connection.query(sql, data, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static editEmployee(client: object) {
        const sql = "UPDATE employees SET fullname=?, position=?, passportNumber=?, email=? WHERE employeeID=?";
        const data = Object.values(client);

        return new Promise((resolve, reject) => {
            connection.query(sql, data, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    static deleteEmployee(id: number) {
        const sql = "DELETE FROM employees WHERE employeeID=?";

        return new Promise((resolve, reject) => {
            connection.query(sql, id, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}