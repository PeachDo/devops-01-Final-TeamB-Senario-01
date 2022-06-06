const Reservation = require("../models/reservation.model.js");
const createRedisClient = require("../models/connectRedis.js");

// 새 객체 생성
exports.create = (req,res)=>{
    if(!req.body){
        res.status(404).send({
            message: "Invalid input"
        });
    };

    const reservation = new Reservation({
      departure: req.body.departure,
      destination: req.body.destination,
      date: req.body.date,
      user_name: req.body.user_name
    });
    
    // 데이터베이스에 저장
    Reservation.create(reservation, (err, data) =>{
        if(err){
            res.status(503).send({
                message:
                err.message || "Some errors occured while creating the Reservation."
            });
        };
    })

    createRedisClient.then((client) => { 
      //do something with the client
      client.set("Hello", "World").then(()=> { 
         //can do something here 
      });
    });
};

// 전체 조회 
exports.findAll = (req,res)=>{
    Reservation.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving reservations."
          });
        else res.send(data);
      });
};

// id로 조회
exports.findOne = (req,res)=>{
  const searchTerm = req.query.search;
    try {
        createRedisClient.get(searchTerm, async (err, jobs) => {
            if (err) throw err;
    
            if (jobs) {
                res.status(200).send({
                    jobs: JSON.parse(jobs),
                    message: "data retrieved from the cache"
                });
            } else {
                const jobs = await axios.get(`test-cache.ovtthy.ng.0001.apn2.cache.amazonaws.com:6379?search=${reservationId}`);
                client.setex(searchTerm, 600, JSON.stringify(jobs.data));
                res.status(200).send({
                    jobs: jobs.data,
                    message: "cache miss"
                });
            }
        });
    } catch(err) {
        res.status(500).send({message: err.message});
    }

    Reservation.findById(req.params.reservationId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Reservation with id ${req.params.reservationId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Reservation with id " + req.params.reservationId
            });
          }
        } else res.send(data);
      });
};



 
 
