module.exports = function (sequelize, DataTypes) {
    const Characters = sequelize.define("characters", {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        Name: DataTypes.STRING,
        Level: DataTypes.INTEGER,
        HP: DataTypes.INTEGER,
        Physical_Attack: DataTypes.INTEGER,
        Physical_Defense: DataTypes.INTEGER,
        Magical_Attack: DataTypes.INTEGER,
        Magical_Defense: DataTypes.INTEGER,
        Speed: DataTypes.INTEGER,
        Weapons: DataTypes.BOOLEAN,
        Mage_Magic: DataTypes.BOOLEAN
    },
    {
        timestamps: false
    });
    return Characters;
};