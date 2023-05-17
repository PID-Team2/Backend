module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("players", {
      name: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      xp: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  
    return Player;
};