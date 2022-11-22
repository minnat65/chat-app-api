import { User } from "./users";
import { ChatGroup } from "./chat-group";
import { DB } from "../config/database";

DB.sync({ force: true })
  .then(() => console.log('Syncing...'))
  .catch();

ChatGroup.hasMany(User, { foreignKey: 'members', as: 'member' });
User.belongsTo(ChatGroup, { foreignKey: 'member', as: 'user' });

