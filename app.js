const express = require('express') 
const app = express() 
const cors = require('cors');
const port = 5000 
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => res.send('Final Project Senario-01 teamB')) //서버 on

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});