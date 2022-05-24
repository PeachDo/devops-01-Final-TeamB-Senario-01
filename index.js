const express = require("express");
const app = express();
require('dotenv').config();
const AWS = require("aws-sdk");
// const credentials = new AWS.SharedIniFileCredentials({
//   profile: 'default',
// });
const port = 3000;

app.use(express.json());

app.get("/api/get/june", (req, res) => res.json({ status: "ok", sns: sns }));
app.post("/api/post/june", (req, res) => {
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    // RDS에서 DB를 생성하고 연결하세요.
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
  });

  connection.query(
    `
        SELECT
            BIN_TO_UUID(product_id) as product_id
            , name, price, stock, BIN_TO_UUID(factory_id), BIN_TO_UUID(ad_id)
        FROM product
        WHERE sku = '${req.body.MessageAttributeProductId}';
        `,
    function (error, results, fields) {
      if (error) throw error;
      if (results[0].stock > 0) {
        console.log(results);
        console.log("The stock is: ", results[0].stock);
        const sql = `
                UPDATE product
                SET stock = ${results[0].stock - 1}
                WHERE product_id = UUID_TO_BIN('${results[0].product_id}');
                `;
        console.log(sql);
        connection.query(sql, function (error, results2, fields) {
          if (error) throw error;
        });
        console.log("재고 감소 !!");
        return res.status(200).send({ message: "판매완료" });
      } else {
        console.log("재고 부족 상황!!");
        console.log(req.body);
        let now = new Date().toString();
        let email = `${req.body.message} \n \n This was sent: ${now}`;
        let params = {
          Message: email,
          MessageGroupId: req.body.MessageGroupId,
          MessageDeduplicationId: new Date().getTime().toString(),
          Subject: req.body.subject,
          MessageAttributes: {
            ProductId: {
              StringValue: req.body.MessageAttributeProductId,
              DataType: "String",
            },
            FactoryId: {
              StringValue: req.body.MessageAttributeFactoryId,
              DataType: "String",
            },
          },
        };
      }
    }
  );
});
app.listen(port, () => console.log(`App listening on port ${port}!`));
/**
 curl --location --request POST 'http://localhost:3000/api/post/june' \
--header 'Content-Type: application/json' \
--data-raw '{
    "MessageGroupId": "stock-empty-group",
    "subject": "부산도너츠 재고 부족",
    "message": "재고 부족",
    "MessageAttributeProductId": "CP-502101",
    "MessageAttributeFactoryId": "FF-500293"
}'
 * */
