const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const con = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
});

con.connect(err => { 
  if (err) console.log("MySQL 연결 실패 : ", err); 
  console.log("MySQL Connected!!!"); 
})

module.exports = con;
