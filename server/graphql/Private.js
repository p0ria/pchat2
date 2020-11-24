const { gql } = require("apollo-server");
const { PrivateController } = require('../controllers/private.controller');

const typeDefs = gql`
  type Private {
    _id: ID
    user1: User
    user2: User
  }
`

const resolvers = {
  Private: {
    user1: async (private) => {
      const { user1 } = await PrivateController.populate(private, 'user1');
      return user1;
    },
    user2: async (private) => {
      const { user2 } = await PrivateController.populate(private, 'user2');
      return user2;
    }
  }
}

module.exports = [typeDefs, resolvers];