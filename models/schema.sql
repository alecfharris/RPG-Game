DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

DROP DATABASE IF EXISTS rpg_game;
CREATE DATABASE rpg_game;
USE rpg_game;

CREATE TABLE attacks

(
id int NOT NULL AUTO_INCREMENT,
Weapon varchar(11) NOT NULL,
Power int NOT NULL,
Accuracy int NOT NULL,
Magical tinyint NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE characters (
    id int NOT NULL AUTO_INCREMENT,
    Name varchar(11) NOT NULL,
    Level int NOT NULL,
    HP int NOT NULL,
    Physical_Attack int NOT NULL,
    Physical_Defense int NOT NULL,
    Magical_Attack int NOT NULL,
    Magical_Defense int NOT NULL,
    Speed int NOT NULL,
    Weapons tinyint NOT NULL,
    Mage_Magic tinyint NOT NULL
    PRIMARY KEY (id)
);