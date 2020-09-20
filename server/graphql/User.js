const {gql} = require('apollo-server');
const { findUserById, populateUserAudiences } = require('../controllers/user.controller');

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
    audiences: async ({_id}) => {
      let user = await findUserById(_id);
      const {audiences} = await populateUserAudiences(user);
      return audiences;
    }
  }
}

module.exports = [typeDefs, resolvers];