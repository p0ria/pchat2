const { AuthenticationError } = require('apollo-server');
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
    createMessage: authenticated(async (root, args, ctx) => {
      const { audienceId, type, value } = args.input;
      const { currentUser } = ctx;
      const newMessage = await new Message({
        author: currentUser._id,
        audience: audienceId,
        type,
        value
      }).save();
      const messageAdded = await newMessage
        .populate('author')
        .populate('audience');
      return messageAdded;
    })
  }
}