"use strict";
const dotenv = require("dotenv");

dotenv.config();

const mysql = require("mysql");
//local mysql db connection
const dbConn = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWD,
	database: process.env.DATABASE,
});
dbConn.connect(function (err) {
	if (err) throw err;
	console.log("Database Connected!");
});
module.exports = dbConn;
