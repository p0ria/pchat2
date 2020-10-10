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

}

module.exports = [typeDefs, resolvers];