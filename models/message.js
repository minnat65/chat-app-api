import { DataTypes } from "sequelize";
import { DB } from "../config/database.js";
import { User } from "./users.js";
import { ChatGroup } from "./chat-group.js";

const Message = DB.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  textMsg: {
    type: DataTypes.TEXT,
  },
  creator: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
  },
  chatGroup: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
  }
}, {
  timestamps: true,
  freezeTableName: true,
});

User.hasMany(Message, { foreignKey: 'creator' });
Message.belongsTo(User, { foreignKey: 'creator' });

Message.sync({ })
  .then(() => {})
  .catch((err) => console.log(err));

export { Message };