module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("projects", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    priority: {
      type: Sequelize.STRING,
    },
    startTieme: {
      type: Sequelize.STRING,
    },
    endTieme: {
      type: Sequelize.STRING,
    },
  });

  return Project;
};
