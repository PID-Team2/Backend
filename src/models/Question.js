import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const Question = sequelize.define('questions',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title:{
        type:  DataTypes.STRING,
    },
    text:{
        type:  DataTypes.STRING,
    },
    rating: {
        type: DataTypes.INTEGER,
        default: 0
    }
})
(async () => {
    await sequelize.sync();
    // Code here
  })();