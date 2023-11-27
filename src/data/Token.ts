import connection from "./connection";

export abstract class TokenData {
    static getTokens() {
        try {
            const sql = "SELECT * FROM tokens";

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

    static postToken(token: object) {
        try {
            const sql = "INSERT INTO tokens (IDuser, refreshtoken) VALUES (?,?)";
            const data = Object.values(token);

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

    static getTokenByIDUser(IDuser: number) {
        try {
            const sql = "SELECT * FROM tokens WHERE IDuser=?";

            return new Promise((resolve, reject) => {
                connection.query(sql, IDuser, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        } catch(err) {
            console.log(err);
        }
    }

    static updateToken(IDuser: number, refreshToken: string) {
        try {
            const sql = "UPDATE tokens SET refreshtoken=? WHERE IDuser=?";
            const data = [refreshToken, IDuser];

            return new Promise((resolve, reject) => {
                connection.query(sql, data, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        } catch(err) {
            console.log(err);
        }
    }

    static deleteToken(refreshToken: string) {
        console.log(refreshToken);
        try {
            const sql = "DELETE FROM tokens WHERE refreshtoken=?";

            return new Promise((resolve, reject) => {
                connection.query(sql, refreshToken, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        } catch(err) {
            console.log(err);
        }
    }

    static findToken(refreshToken: string) {
        console.log(refreshToken);
        try {
            const sql = "SELECT * FROM tokens WHERE refreshtoken=?";

            return new Promise((resolve, reject) => {
                connection.query(sql, refreshToken, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        } catch(err) {

        }
    }
    
}