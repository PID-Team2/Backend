module.exports = (sequelize, Sequelize) => {
  const Kanban = sequelize.define("kanban", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });

  return Kanban;
};
