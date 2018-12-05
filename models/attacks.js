module.exports = function (sequelize, DataTypes) {
    const Attacks = sequelize.define("attacks", {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        Weapon: DataTypes.STRING,
        Power: DataTypes.INTEGER,
        Accuracy: DataTypes.INTEGER,
        Magical: DataTypes.BOOLEAN
    },
    {timestamps: false
    });
    return Attacks;
};