import connection from "./connection";

export abstract class ClientsData {
    static addClient(client: object) {
        try {
            const sql = "INSERT INTO clients (fullname, phoneNumber, address) VALUES (?,?,?)";
            const data = Object.values(client);

            return new Promise((resolve, reject) => {
                connection.query(sql, data, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch(err) {
            console.log(err);
        }
    } 

    static getClients() {
        try {
            const sql = "SELECT * FROM clients";

            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch(err) {
            console.log(err);
        }
    }

    static editClient(client: object) {
        try {
            const sql = "UPDATE clients SET fullname=?, phoneNumber=?, address=? WHERE clientID = ?";
            const data = Object.values(client);
    
            return new Promise((resolve, reject) => {
                connection.query(sql, data, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch(err) {
            console.log(err);
        }
    }

    static deleteClient(id: number) {
        try {
            const sql = "DELETE FROM clients WHERE clientID = ?";
        
            return new Promise((resolve, reject) => {
                connection.query(sql, id, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch(err) {
            console.log(err);
        }
    }
}