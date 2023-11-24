import connection from "./connection";

export default abstract class ProductsData {
    static addProduct(product: object) {
        try {
            const sql = "INSERT INTO products" +
                "(name, brand, code, quantity, IDprovider, pricePurchase, priceSale, volume, weight, dateReceipt, description)" +
                "VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            const data = Object.values(product);
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
            console.log("error from data addProduct", err);
        }
    }

    static getProducts() {
        try {
            const sql = "SELECT * FROM products";
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
            console.log(err, "Error from getProducts Data")
        }
    }

    static editProduct(product: object) {
        try {
            const sql = "UPDATE products SET " +
                "name=?, brand=?, code=?, quantity=?, IDprovider=?, pricePurchase=?, " 
                + "priceSale=?, volume=?, weight=?, dateReceipt=?, description=?"
                + "WHERE productID=?";
            const data = Object.values(product);
            return new Promise((resolve, reject) => {
                connection.query(sql, data, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        }catch(err) {
            console.log(err, "error from productsdata")
        }
    }
}
