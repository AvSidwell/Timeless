const mysql = require("mysql")
require('dotenv').config();
// import mysql from "mysql2";
   

  const db = mysql.createPool({
    host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
    multipleStatements: true,
    connectionLimit: 6000
});
  
module.exports = db;