const { gql } = require("apollo-server");

const typeDefs = gql`
  enum MessageType {
    TEXT, FILE
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

}

module.exports = [typeDefs, resolvers];