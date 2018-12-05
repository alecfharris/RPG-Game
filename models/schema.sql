DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

USE rpg_game;

CREATE TABLE attacks

(
id int NOT NULL AUTO_INCREMENT,
Weapon varchar(11) NOT NULL,
Power int NOT NULL,
Accuracy int NOT NULL,
Physical_Magical tinyint NOT NULL,
PRIMARY KEY (id)
);