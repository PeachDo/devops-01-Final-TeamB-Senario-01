-- RDS에 생성한 데이터베이스 리소스에 아래 table들을 생성하고, 값을 추가해넣으세요.
CREATE TABLE `reservation` (
    `reservationId` BINARY(16)  NOT NULL ,
    `departure` varchar(200)  NOT NULL ,
    `destination` varchar(200)  NOT NULL ,
    `date` DATE  NOT NULL ,
    `user_name` BINARY(16)  NOT NULL ,
    PRIMARY KEY (
        `reservationId`
    )
);

INSERT INTO reservation(reservationId, departure, destination, date, user_name) VALUES(UUID_TO_BIN(UUID()), '부산도너츠 공장', '부산카페', '2022-03-04', 'peachdo');

SELECT
    BIN_TO_UUID(reservationId) as reservationId
FROM reservation;