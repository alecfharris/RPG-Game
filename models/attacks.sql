DROP DATABASE IF EXISTS rpg_game;
CREATE DATABASE rpg_game;
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

INSERT INTO attacks (Weapon, Power, Accuracy, Physical_Magical) VALUES (Bow, 60, 100, False);
INSERT INTO attacks (Weapon, Power, Accuracy, Physical_Magical) VALUES (Sword, 90, 95, False);
INSERT INTO attacks (Weapon, Power, Accuracy, Physical_Magical) VALUES (Axe, 110, 80, False);


