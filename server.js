const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const AWS = require('aws-sdk');
const dotenv = require("dotenv").config();
const { Producer } = require('sqs-producer');
const app = express();

app.use(
    cors({
      origin: true,
      credentials: true
    })
  );
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// AWS.config.update({                            // 없을 경우 config 에러 발생.
//   region: 'ap-northest-2', // 리전
//   accessKeyId: process.env.ACCESS_KEY_ID,
//   secretAccessKey: process.env.SECRETACESS_KEY
// });

// const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

app.get("/", (req, res)=>{
    res.json({message: "Hello World!"});
});

require("./app/routes/reservation.routes.js")(app);

// 포트넘버 설정
app.listen(3000, ()=>{
    console.log("Server is running on port 3000.");
})