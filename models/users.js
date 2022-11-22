import { DB } from "../config/database.js";
import { DataTypes } from 'sequelize';
import { ChatGroup } from "./chat-group.js";

const User = DB.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    // primaryKey: true,
  },
}, {
  timestamps: true,
  updatedAt: false,
  freezeTableName: true,
})

// User.hasOne(ChatGroup, { foreignKey: 'creator' });
// ChatGroup.belongsTo(User, { foreignKey: 'creator' });

User.sync({ alter: true })
  .then((res) => console.log('Syncing...', res))
  .catch((err) => console.log(err))

export { User };