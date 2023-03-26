module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("questions", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    return Question;
};