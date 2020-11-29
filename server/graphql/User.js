const { gql } = require('apollo-server');
const { UserController } = require('../controllers/user.controller');

const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    avatarUrl: String
    audiences: [Audience]!
  }
`;

const resolvers = {
  User: {
    audiences: async (user) => {
      const { audiences } = await UserController.populate(user, 'audiences');
      return audiences;
    }
  }
}

module.exports = [typeDefs, resolvers];