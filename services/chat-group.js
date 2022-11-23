import { ChatGroup } from "../models/chat-group.js";
import { User } from "../models/users.js";
import { GroupMembers } from "../models/user-chat.js";

export class GroupService {
  // create a chat group
  async createGroup (groupInfo) {
    const { groupName, creator, members } = groupInfo;

    const group = await ChatGroup.create({
      groupName,
      creator,
    });

    // creator will be also a member of the group
    await GroupMembers.create({ chatGroupId: group.id, userId: creator });

    return group;
  };

  // Get all group of a user
  async getAllGroups (userId, page) {
    const offset = page * 5;
    const groups = await ChatGroup.findAll({
      attributes: ['groupName', 'createdAt'],
      include: [
        { model: User, as: 'admin', attributes: ['name'] },
        { model: GroupMembers, where: { userId }, attributes: ['userId'] }
      ],
      limit: 5,
      offset,
    })

    if(!groups.length) {
      throw new Error('You are not member of any group.')
    }

    return groups;
  };

  async getGroupById (groupId) {
    const group = await ChatGroup.findOne({ id: groupId });

    return group;
  };

  // Updating name of group
  async updateGroupById (groupId, userId, newName) {
    const group = await ChatGroup.findByPk(groupId);

    if (group.creator !== userId) {
      throw new Error('User is not authorized.');
    }

    const updated = await ChatGroup.update(
      { groupName: newName },
      { where: { id: groupId } },
      );
    console.log(updated);
    return updated;
  };

  // Add member into an existing group
  async addMember(groupBody) {
    console.log(groupBody);
    const { memberId, groupId, adminId } = groupBody;

    const group = await ChatGroup.findByPk(groupId);

    if (group.creator !== adminId) {
      throw new Error('User is not authorized.');
    }

    // Check if user already exist in the group
    const user = await GroupMembers.findOne({ 
      chatGroupId: groupId,
      where: {
        userId: memberId
      }
    });

    if(user) {
      throw new Error('User already exist in the group');
    }
    
    const member = await GroupMembers.create({ chatGroupId: groupId, userId: memberId });

    return member;
  }

  // remove an user from a group
  async removeMember(groupBody, memberId) {
    console.log(groupBody);
    const { groupId, adminId } = groupBody;

    const group = await ChatGroup.findByPk(groupId);

    if (group.creator !== adminId) {
      throw new Error('User is not authorized.');
    }
    const member = await GroupMembers.destroy({ where: { chatGroupId: groupId, userId: memberId } })

    return member;
  }

  async getAllMembers() {
    const member = await GroupMembers.findAll({
      include: {
        model: User,
        attributes: ['name', 'email']
      },
    });

    return member;
  }

  async deleteGroupById (groupId) {};
}