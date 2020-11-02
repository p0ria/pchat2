const { gql } = require("apollo-server");
const { populate } = require("../models/User");
const { MessageController } = require("../controllers/message.controller");

const typeDefs = gql`
  enum MessageType {
    TEXT, FILE, IMAGE
  }

  type Message {
    _id: ID
    author: User!
    type: MessageType!
    value: String!
    audience: Audience!
    createdAt: String
    updatedAt: String
  }
`
const resolvers = {
  Message: {
    audience: async (message) => {
      const { audience } = await MessageController.populate(message, 'audience')
      return audience;
    },
    author: async (message) => {
      const { author } = await MessageController.populate(message, 'author');
      return author;
    },
    value: (message) => {
      return message.value ? Buffer.from(message.value).toString() : ''
    }
  }
}

module.exports = [typeDefs, resolvers];