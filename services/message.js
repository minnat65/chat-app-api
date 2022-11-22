import { Message } from "../models/message.js";
import { GroupMembers } from "../models/user-chat.js";
import { User } from "../models/users.js";
import { ChatGroup } from "../models/chat-group.js";

export class MessageService {
  async createMessage(msgBody) {
    const { groupId, senderId, text } = msgBody;

    if(!groupId) {
      throw new Error('Message must belong to a group.')
    }

    // checking if user is a member of this group or not
    const member = await GroupMembers.findOne({
      chatGroupId: groupId,
      where: {
          userId: senderId,
        }
     });

    if(!member) {
      throw new Error('You are not member of this group.');
    }

    const message = await Message.create({
      textMsg: text,
      creator: senderId,
      chatGroup: groupId,
    });

    return message;
  }

  // Get All message of a group
  async getAllMessageofGroup(userId, groupId) {
    // checking if user exist in the group or not
    const member = await GroupMembers.findOne({
      chatGroupId: groupId,
      where: {
          userId,
        }
     });

    if(!member) {
      throw new Error('You are not member of this group.');
    }

    const messages = await Message.findAll({
      attributes: ['textMsg', 'createdAt', 'updatedAt', 'creator', 'chatGroup'],
      include: User,
      where: {
        chatGroup: groupId,
      }
    });

    return messages;
  }

  // This another way to implementat above function
  async getMessagesByGroupId(memberId, groupId) {
    // 1 Check if user is a member or not
    const member = await GroupMembers.findOne({
      chatGroupId: groupId,
      where: {
          userId: memberId,
        }
     });

    if(!member) {
      throw new Error('You are not member of this group.');
    }

    // If user is a member then query for messages
    const messages = await ChatGroup.findAll({
      where: { id: groupId },
      attributes: ['groupName'],
      include: [{ model: Message, where: { chatGroup: groupId } }],
    })

    return messages;
  }
}