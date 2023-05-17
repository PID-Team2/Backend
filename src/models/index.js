const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db tables
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.question = require("../models/question.model.js")(sequelize, Sequelize);
db.answare = require("../models/answare.model.js")(sequelize, Sequelize);

db.group = require("../models/group.model.js")(sequelize, Sequelize);
db.project = require("../models/project.model.js")(sequelize, Sequelize);

db.player = require("../models/player.model.js")(sequelize, Sequelize);


// realation user - role -----  m -> m
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// realation user - question ----- 1 -> m
db.user.hasMany(db.question, {
    foreignKey: "userId",
});

db.question.belongsTo(db.user);

// realation question - answare ----- 1 -> m
db.question.hasMany(db.answare, {
    foreignKey: "questionId",
});

db.answare.belongsTo(db.question);

// realation user - answare ----- 1 -> m
db.user.hasMany(db.answare, {
    foreignKey: "userId",
});

db.answare.belongsTo(db.user);

// realation user - player ----- 1 -> m
db.user.hasMany(db.player, {
  foreignKey: "userId",
});

db.player.belongsTo(db.user);

// realation user - group -----  m -> m
db.group.belongsToMany(db.user, {
  through: "user_groups",
  foreignKey: "groupId",
  otherKey: "userId"
});
db.user.belongsToMany(db.group, {
  through: "user_groups",
  foreignKey: "userId",
  otherKey: "groupId"
});

// realation user(admin) - group ----- 1 -> m
db.user.hasMany(db.group, {
  foreignKey: "userAdminId",
});

db.group.belongsTo(db.user, { foreignKey: "userAdminId" });

// realation group - project ----- 1 -> m
db.group.hasMany(db.project, {
  foreignKey: "groupId",
});

db.project.belongsTo(db.group);



// roles
db.ROLES = ["user", "admin"];

module.exports = db;