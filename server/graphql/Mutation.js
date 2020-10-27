const {gql} = require('apollo-server');
const Audience = require('../models/Audience');
const Message = require('../models/Message');
const { authenticated } = require('../utils/gql-utils');
const { MessageController } = require('../controllers/message.controller');
const { UserController } = require('../controllers/user.controller');

const typeDefs = gql`
  input CreateMessageInput {
    audienceId: ID
    type: MessageType!
    value: String!
  }

  type Mutation {
    createMessage(input: CreateMessageInput!): Message
    changeAvatar(avatarUrl: String!): String
  }
`
const resolvers = {
  Mutation: {
    createMessage: authenticated(async (_, { input }, { currentUser }) => {
      const { audienceId, type, value } = input;
      return MessageController.createMessage({
        author: currentUser._id,
        audience: audienceId,
        type,
        value
      });
    }),
    changeAvatar: authenticated(async(_, { avatarUrl }, { currentUser }) => {
      const user = UserController.changeUserAvatar(currentUser._id, avatarUrl);
      return user.avatarUrl;
    })
  }
}

module.exports = [typeDefs, resolvers];