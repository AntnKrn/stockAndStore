import connection from "./connection";

export abstract class OrdersData {
    static getOrders() {
        try {
            const sql = "SELECT * FROM orders";

            return new Promise((resolve, reject) => {
                connection.query(sql, (err, result) => {
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

    static postOrder(client: object) {
        try {
            const sql = "INSERT INTO orders (IDclient, IDproduct, quantity, price, data, IDemployee) VALUES (?,?,?,?,?,?)";
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
        } catch(err) {
            console.log(err);
        }
    }

    static editOrder(client: object) {
        try {
            const sql = "UPDATE orders SET IDclient=?, IDproduct=?, quantity=?, price=?, data=?, IDemployee=? WHERE orderID=?";
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
        } catch(err) {
            console.log(err);
        }
    }

    static deleteOrder(id: number) {
        try {
            const sql = "DELETE FROM orders WHERE orderID=?";

            return new Promise((resolve, reject) => {
                connection.query(sql, id, (err, result) => {
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
}