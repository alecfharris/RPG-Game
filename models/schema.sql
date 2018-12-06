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

INSERT INTO attacks (Weapon, Power, Accuracy, Magical) VALUES ("Bow", 60, 100, False);
INSERT INTO attacks (Weapon, Power, Accuracy, Magical) VALUES ("Sword", 90, 95, False);
INSERT INTO attacks (Weapon, Power, Accuracy, Magical) VALUES ("Axe", 110, 80, False);


CREATE TABLE characters (
    id int NOT NULL AUTO_INCREMENT,
    Name varchar(20) NOT NULL,
    Level int NOT NULL,
    HP int NOT NULL,
    Physical_Attack int NOT NULL,
    Physical_Defense int NOT NULL,
    Magical_Attack int NOT NULL,
    Magical_Defense int NOT NULL,
    Speed int NOT NULL,
    Weapons tinyint NOT NULL,
    Mage_Magic tinyint NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO characters (Name, Level, HP, Physical_Attack, Physical_Defense, Magical_Attack, Magical_Defense, Speed, Weapons, Mage_Magic) VALUES ("Jacob", 50, 133, 50, 65, 100, 100, 75, False, True);

INSERT INTO characters (Name, Level, HP, Physical_Attack, Physical_Defense, Magical_Attack, Magical_Defense, Speed, Weapons, Mage_Magic) VALUES ("LJ", 50, 135, 100, 75, 85, 75, 100, True, True);

INSERT INTO characters (Name, Level, HP, Physical_Attack, Physical_Defense, Magical_Attack, Magical_Defense, Speed, Weapons, Mage_Magic) VALUES ("Nick", 50, 160, 80, 100, 80, 100, 65, True, False);

INSERT INTO characters (Name, Level, HP, Physical_Attack, Physical_Defense, Magical_Attack, Magical_Defense, Speed, Weapons, Mage_Magic) VALUES ("Enemy Spellcaster", 55, 167, 107, 107, 141, 141, 105, False, True);

INSERT INTO characters (Name, Level, HP, Physical_Attack, Physical_Defense, Magical_Attack, Magical_Defense, Speed, Weapons, Mage_Magic) VALUES ("Enemy FightMage", 55, 170, 132, 132, 113, 113, 140, True, True);

INSERT INTO characters (Name, Level, HP, Physical_Attack, Physical_Defense, Magical_Attack, Magical_Defense, Speed, Weapons, Mage_Magic) VALUES ("Enemy Paladin", 55, 190, 113, 145, 113, 145, 95, True, False);

INSERT INTO characters (Name, Level, HP, Physical_Attack, Physical_Defense, Magical_Attack, Magical_Defense, Speed, Weapons, Mage_Magic) VALUES ("Ultimate Enemy", 60, 232, 167, 167, 167, 167, 167, True, True);