const Message = require("../models/Message")
const Audience = require("../models/Audience")

exports.MessageController = {
  createMessage: async message => {
    const newMessage = await new Message(message).save();
    const audience = await Audience.findById(newMessage.audience);
    audience.messages = [...audience.messages, newMessage._id];
    audience.save();
    const buf = Buffer.from(newMessage.value);
    return {
      _id: newMessage._id,
      type: newMessage.type,
      value: buf.toString(),
      author: newMessage.author,
      audience: newMessage.audience,
      createdAt: newMessage.createdAt,
      updatedAt: newMessage.updatedAt
    };
  },
  populate: (message, ...relations) => {
    return Message.populate(message, relations);
  }
}