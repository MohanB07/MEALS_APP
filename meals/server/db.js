const mysql = require("mysql");
require('dotenv').config();
const con = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: "foodzone",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


module.exports = con;