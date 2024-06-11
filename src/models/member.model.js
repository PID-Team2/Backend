module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define("member", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectRole: {
      type: Sequelize.STRING,
      default: "",
    },
  });

  return Member;
};
