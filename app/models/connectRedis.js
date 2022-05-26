const redis = require('redis');
const redis_client = redis.createClient(6379,'teamb.ovtthy.ng.0001.apn2.cache.amazonaws.com');

// Redis
// redis_client.on("error", (err) => {
//     console.error(err);
// });

// redis_client.on("ready", ()=> {
//     console.log("Redis is Ready");
// });

redis_client.on(err => { 
    if (err) console.log("read_DB_Redis 연결 실패 : ", err); 
    console.log("read_DB_Redis Connected!!!"); 
  })

module.exports = redis_client; 