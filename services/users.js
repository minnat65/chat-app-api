import { ChatGroup } from "../models/chat-group.js";
import { User } from "../models/users.js";
import { GroupMembers } from "../models/user-chat.js";

export class UserService {
  async addUser(user) {
    const { name, email } = user;

    const usrecreated = await User.create({
      name,
      email,
    });
  
    return usrecreated;
  }

  async getAllUsers(page, pageSize) {
    const offset = page * pageSize;
    console.log(offset, pageSize);
    const users = await User.findAll({
      attributes: ['name', 'email', 'createdAt'],
      limit: parseInt(pageSize, 10),
      offset,
    });

    return users;
  }

  async getUserById(userId) {
    const text = 'SELECT * FROM students WHERE id=$1'
    const values = [userId];

    const user = await User.findByPk(userId);

    return user;
  }

  async updateUserById(userId) {};

  async deleteUser(userId) {};
};
