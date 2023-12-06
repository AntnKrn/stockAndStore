import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'LlLlLl5_',
    database: 'shop'
});
// YYYY:MM:DD
connection.connect();

export default connection;