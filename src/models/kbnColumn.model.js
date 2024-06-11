module.exports = (sequelize, Sequelize) => {
  const KanbanCol = sequelize.define("kanbancol", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });

  return KanbanCol;
};
