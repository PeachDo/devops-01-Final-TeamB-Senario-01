const mysql = require('mysql');
const dotenv = require('dotenv');
const read = require('body-parser/lib/read');
dotenv.config();

const writeConnection = mysql.createConnection({
  host: process.env.Master_DATABASE_HOST,
  user: process.env.Master_DATABASE_USER,
  password: process.env.Master_DATABASE_PASSWORD,
  port: process.env.Master_DATABASE_PORT
});


writeConnection.connect(err => { 
  if (err) console.log("Master MySQL 연결 실패 : ", err); 
  console.log("MySQL Connected!!!"); 
});

module.exports = writeConnection;

