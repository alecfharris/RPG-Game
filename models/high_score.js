module.exports = function (sequelize, DataTypes) {
    const highScore = sequelize.define("high_score", {
        Name: DataTypes.STRING,
        Score: DataTypes.INTEGER
    },
    {
        timestamps: false
    });
    return highScore;
};