const {gql} = require('apollo-server');
const { Audience} = require('../models/Audience');
const { Message } = require('../models/Message');
const { authenticated } = require('../utils/gql-utils');

const typeDefs = gql`
  input CreateMessageInput {
    audienceId: ID
    type: MessageType!
    value: String!
  }

  type Mutation {
    createMessage(input: CreateMessageInput!): Message
  }
`
const resolvers = {
  Mutation: {
    createMessage: authenticated(async (_, { input }, { currentUser }) => {
      const { audienceId, type, value } = input;
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

module.exports = [typeDefs, resolvers];