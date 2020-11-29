const { gql } = require("apollo-server");
const { PrivateController } = require('../controllers/private.controller');
const { AudienceController } = require('../controllers/audience.controller');

const typeDefs = gql`
  type Private {
    _id: ID
    type: AudienceType!
    user1: User
    user2: User
  }
`

const resolvers = {
  Private: {
    type: async (private) => {
      const { type } = await AudienceController.findAudienceById(private._id);
      return type;
    },
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