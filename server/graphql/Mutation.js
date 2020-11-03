const { gql } = require('apollo-server');
const Audience = require('../models/Audience');
const Message = require('../models/Message');
const { authenticated } = require('../utils/gql-utils');
const { MessageController } = require('../controllers/message.controller');
const { UserController } = require('../controllers/user.controller');
const { pubsub, Topics } = require('./Topics');

const typeDefs = gql`
  input AddMessageInput {
    audienceId: ID
    type: MessageType!
    value: String!
  }

  type Mutation {
    addMessage(input: AddMessageInput!): Message
    changeAvatar(avatarUrl: String!): String
  }
`
const resolvers = {
  Mutation: {
    addMessage: authenticated(async (_, { input }, { currentUser }) => {
      const { audienceId, type, value } = input;
      const message = await MessageController.createMessage({
        author: currentUser._id,
        audience: audienceId,
        type,
        value
      });
      pubsub.publish(Topics.MessageAdded, { messageAdded: message });
      return message;
    }),
    changeAvatar: authenticated(async (_, { avatarUrl }, { currentUser }) => {
      const { user, audience } = await UserController.changeUserAvatar(currentUser._id, avatarUrl);
      pubsub.publish(Topics.AudiencesChanged, { audiencesChanged: [audience] });
      return user.avatarUrl;
    })
  }
}

module.exports = [typeDefs, resolvers];