import connection from "./connection";

export default abstract class ProvidersData {
    static fetchProviders() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * from providers', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static postProvider(provider: object) {
        try {
            const sql = "INSERT INTO providers (name, phoneNumber, category, address, contactPerson, email) VALUES (?,?,?,?,?,?)";
            const data = Object.values(provider);
            return new Promise((resolve, reject) => {
                connection.query(sql, data, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (err) {
            console.log(err, "Error from data postProvider");
        }
    }

    static editProvider(provider: object) {
        try {
            const sql = "UPDATE providers SET name=?, phoneNumber=?, category=?, address=?, contactPerson=?, email=? WHERE providerID=?";
            const data = Object.values(provider);
            return new Promise((resolve, reject) => {

                connection.query(sql, data, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (err) {
            console.log(err, "error from data editProvider");
        }
    }

    static deleteProvider(id: number) {
        try {
            const sql = "DELETE FROM providers WHERE providerID=?";

            return new Promise((resolve, reject) => {
                connection.query(sql, id, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (err) {
            console.log(err, "Error from deleteProvider data");
        }
    }
}