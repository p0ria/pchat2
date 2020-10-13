const { gql } = require("apollo-server");

const typeDefs = gql`
  enum AudienceType {
    PRIVATE, GROUP
  }

  type Audience {
    _id: ID
    type: AudienceType!
    name: String!
    avatarUrl: String
    messages: [Message]!
  }
`
const resolvers = {
  Audience: {
    messages: (parent) => ['1', '2', '3']
  }
}

module.exports = [typeDefs, resolvers];