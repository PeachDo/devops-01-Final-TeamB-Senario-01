module.exports = app =>{
    const reservations = require("../controllers/reservation.controller.js");

    app.post("/reservations", reservations.create);

    // 전체 조회 
    app.get("/reservations", reservations.findAll);

    // id로 조회
    app.get("/reservations/:reservationId", reservations.findOne);
};