const { gql } = require('apollo-server');
const { authenticated } = require('../utils/gql-utils');
const { UserController } = require('../controllers/user.controller');
const { AudienceController } = require('../controllers/audience.controller');

const typeDefs = gql`
  type Query {
    me: User
    audiences: [Audience]!
    audience(id: ID!): Audience
  }
`
const resolvers = {
  Query: {
    me: authenticated((_, __, { currentUser }) => currentUser),
    audiences: authenticated(async (_, __, { currentUser }) => {
      const { audiences } = await UserController.populate(currentUser, 'audiences');
      return audiences;
    }),
    audience: authenticated(async (_, { id }) => {
      const audience = await AudienceController.findAudienceById(id);
      return audience;
    })
  }
}

module.exports = [typeDefs, resolvers];