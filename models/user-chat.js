import { DB } from "../config/database.js";
import { DataTypes } from 'sequelize';
import { ChatGroup } from "./chat-group.js";
import { User } from "./users.js";

const GroupMembers = DB.define('GroupMembers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false,
  },
  chatGroupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
  },
}, {
  timestamps: true,
  updatedAt: false,
  freezeTableName: true,
})

User.hasOne(GroupMembers, { foreignKey: 'userId' });
GroupMembers.belongsTo(User, { foreignKey: 'userId' })

ChatGroup.hasMany(GroupMembers, { foreignKey: 'chatGroupId' });
GroupMembers.belongsTo(ChatGroup, { foreignKey: 'chatGroupId' })

GroupMembers.sync({ alter: true })
  .then((res) => console.log('Syncing...', res))
  .catch((err) => console.log(err))

export { GroupMembers };