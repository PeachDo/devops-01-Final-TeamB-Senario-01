const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const dotenv = require("dotenv").config();    // 환경변수를 사용하기 위한 모듈
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

AWS.config.update({                            // 이 부분은 원격 EC2에서 돌린다면 필요없음 ( 로컬에서 돌릴경우 필요 )
  region: 'ap-northest-2', // 리전
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRETACESS_KEY
});

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

app.listen(PORT, () => {
  console.log('server is listening');
});

app.get('/', (req, res) => {
  res.send('Hello');
});

function sendMessage(message) {
  const params = {
    QueueUrl: 'https://sqs.ap-northeast-2.amazonaws.com/523139768306/EC2_SQS_ECS',
    MessageBody: JSON.stringify(message),
  };


  return new Promise((resolve, reject) => {
    sqs.sendMessage(params).promise().then(() => {
      resolve();
    }).catch((e) => {
      reject(e);
    });
  });
}

app.post('/reservations', (req, res) => {
  const reservationId = req.body.reservationId;
  const log = { reservationId, dtm: Date.now(), action: 'Reservations: OK' };
  sendMessage(log).then(() => {
    res.json({ code: 200, message: 'success' });
  }).catch((e) => {
    res.json({ code: 500, message: e });
  });
});
