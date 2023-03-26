module.exports = (sequelize, Sequelize) => {
    const Answare = sequelize.define("answares", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    return Answare;
};