const { AuthenticationError } = require('apollo-server');
require('./models/Audience');
const Message = require('./models/Message');

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError('You must be logged in')
  }
  return next(root, args, ctx, info)
}

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser)
  },
  Mutation: {
    createMessage: authenticated(async (_, { input }, { currentUser }) => {
      const { audienceId, type, value } = input;
      console.log(audienceId, type, value);
      const newMessage = await new Message({
        author: currentUser._id,
        audience: audienceId,
        type,
        value
      }).save();
      const messageAdded = await Message.populate(newMessage, ['author', 'audience']);
      const buf = Buffer.from(messageAdded.value);
      return {
        _id: messageAdded._id,
        author: messageAdded.author,
        type: messageAdded.type,
        value: buf.toString(),
        audience: messageAdded.audience,
        createdAt: messageAdded.createdAt,
        updatedAt: messageAdded.updatedAt
      };
    })
  }
}