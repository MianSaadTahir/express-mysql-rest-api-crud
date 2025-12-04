const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Saad03342241980-",
  database: "product_management",
});

module.exports = db;
