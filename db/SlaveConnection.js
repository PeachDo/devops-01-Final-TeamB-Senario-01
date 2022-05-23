const mysql = require('mysql');
const dotenv = require('dotenv');
const read = require('body-parser/lib/read');
dotenv.config();

const readConnection = mysql.createConnection({
    host: process.env.Slave_DATABASE_HOST,
    user: process.env.Slave_DATABASE_USER,
    password: process.env.Slave_DATABASE_PASSWORD,
    port: process.env.Slave_DATABASE_PORT
  });


readConnection.connect(err => { 
    if (err) console.log("SlaveRDS MySQL 연결 실패 : ", err); 
    console.log("MySQL Connected!!!"); 
  });
  
module.exports = readConnection;