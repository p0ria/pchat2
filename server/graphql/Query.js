const { gql } = require('apollo-server');
const { authenticated } = require('../utils/gql-utils');
const { UserController } = require('../controllers/user.controller');

const typeDefs = gql`
  type Query {
    me: User
    audiences: [Audience]!
  }
`
const resolvers = {
  Query: {
    me: authenticated((_, __, { currentUser }) => currentUser),
    audiences: authenticated(async (_, __, { currentUser }) => {
      const { audiences } = await UserController.populate(currentUser, 'audiences');
      return audiences;
    })
  }
}

module.exports = [typeDefs, resolvers];