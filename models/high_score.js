module.exports = function (sequelize, DataTypes) {
    const highScore = sequelize.define("high_score", {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        Name: DataTypes.STRING,
        Score: DataTypes.INTEGER
    },
    {
        timestamps: false
    });
    return highScore;
};