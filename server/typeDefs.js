const { gql } = require('apollo-server')

module.exports = gql `
  type User {
    _id: ID
    name: String!
    email: String!
    avatarUrl: String
    audiences: [Audience]!
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

  type Audience {
    _id: ID
    type: AudienceType!
    name: String!
    avatarUrl: String
    messages: [Message]!
  }

  enum MessageType {
    TEXT, FILE
  }

  enum AudienceType {
    USER, GROUP
  }

  input CreateMessageInput {
    audienceId: ID
    type: MessageType!
    value: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    createMessage(input: CreateMessageInput!): Message
  }
`