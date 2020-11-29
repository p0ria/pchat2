const { gql } = require('apollo-server');
const { authenticated } = require('../utils/gql-utils');
const { UserController } = require('../controllers/user.controller');
const { AudienceController } = require('../controllers/audience.controller');
const { PrivateController } = require('../controllers/private.controller');

const typeDefs = gql`
  type Query {
    me: User
    audiences: [Audience]!
    audience(id: ID!): Audience
    audienceImpl(id: ID!): AudienceImpl 
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
    }),
    audienceImpl: authenticated(async (_, { id }) => {
      const audience = await AudienceController.findAudienceById(id);
      if (audience.type == 'PRIVATE') {
        const private = await PrivateController.findPrivateById(audience._id);
        return private;
      }
    })
  }
}

module.exports = [typeDefs, resolvers];