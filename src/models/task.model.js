module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
      default: "",
    },
    isAsigned: {
      type: Sequelize.INTEGER,
      default: 0,
    },
    startTime: {
      type: Sequelize.STRING,
    },
    completedAt: {
      type: Sequelize.STRING,
      default: "",
    },
    priority: {
      type: Sequelize.STRING,
      default: "",
    },
  });

  return Task;
};
