var easy = require("easy-sqs");
 
var awsConfig = {
    "accessKeyId": "ACCESS_KEY_ID",
    "secretAccessKey": "SECRETACESS_KEY",
    "region": "REGION"
};
 
var url = "https://sqs.ap-northeast-2.amazonaws.com/351954682436/P4_SQS";
 
var client = easy.createClient(awsConfig);
 
client.getQueue(url, function(err, queue){
 
    if(err) console.log("queue does not exist");
 
    //messages must be strings for now...
    var msg = JSON.stringify({body: "my message body"});
 
    queue.sendMessage(msg, function(err){
            if(err) console.log("send failed!");
    });
 
});