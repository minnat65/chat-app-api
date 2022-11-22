import sequelize from "sequelize";
import { User } from "../models/users.js";
import { ChatGroup } from "../models/chat-group.js";
import { Message } from "../models/message.js";

export class CommonService {
    // Top 5 Users with max messages
    async topFiveUsers() {
      const top5Users = await User.findAll({
        attributes: ['name', [sequelize.fn("COUNT", sequelize.col("Messages.id")), "message"]],
        include: [{
          model: Message,
          attributes: []
        }],
        group: ['User.id'],
        order: [['message', 'desc']],
        limit: 5,
        subQuery: false,
      })
  
      return top5Users;
    }
  
    async topFiveGroups() {
      const top5Group = await ChatGroup.findAll({
        attributes: ['groupName', [sequelize.fn("COUNT", sequelize.col("Messages.id")), "message"]],
        include: [{ model: Message, attributes: [] }],
        group: ['ChatGroup.id'],
        order: [['message', 'DESC']],
        limit: 5,
        subQuery: false,
      })
  
      return top5Group;
    }
}