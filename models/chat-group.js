import { DataTypes } from "sequelize";
import { DB } from "../config/database.js";
import { User } from "./users.js";
import { Message } from "./message.js";

const ChatGroup = DB.define('ChatGroup', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  freezeTableName: true,
});

User.hasOne(ChatGroup, { foreignKey: 'creator', as: 'admin' });
ChatGroup.belongsTo(User, { foreignKey: 'creator', as: 'admin' });

ChatGroup.hasMany(Message, { foreignKey: 'chatGroup'});
Message.belongsTo(ChatGroup, { foreignKey: 'chatGroup'});

ChatGroup.sync({})
  .then((res) => console.log('Syncing...', res))
  .catch((err) => console.log(err))


export { ChatGroup };