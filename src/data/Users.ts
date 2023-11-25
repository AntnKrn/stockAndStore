import connection from "./connection";

export abstract class UsersData {
    static getUsers() {
        try {
            const sql = "SELECT * FROM users";

            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        } catch (err) {
            console.log(err);
        }
    }

    static postUser(user: object) {
        try {
            const sql = "INSERT INTO users (login, password, role) VALUES (?,?,'user')";
            const data = Object.values(user);

            return new Promise((resolve, reject) => {
                connection.query(sql, data, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        } catch (err) {
            console.log(err);
        }
    }

    static getUserByLogin(login: string) {
        try {
            const sql = "SELECT * FROM users WHERE login=?";

            return new Promise((resolve, reject) => {
                connection.query(sql, login, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        } catch (err) {
            console.log(err);
        }
    }
}