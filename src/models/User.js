import { DataTypes } from 'sequelize'
import { sequelize } from '../db/db.js'
import { Question } from './Question.js'

export const User = sequelize.define('users',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
})
/** Relations */
User.hasMany(Question, {
    foreignKey: 'userId',
    sourceKey: 'id'
})

Question.belongsTo(User, {
    foreignKey: 'userId',
    targetId: 'id'
})

(async () => {
    await sequelize.sync();
    // Code here
  })();
