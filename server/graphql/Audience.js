const { gql } = require("apollo-server");
const { AudienceController } = require("../controllers/audience.controller");
const { PrivateController } = require("../controllers/private.controller");
const { UserController } = require("../controllers/user.controller");

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
    name: async (payload, _, { currentUser }) => {
      if (payload.type == 'PRIVATE') {
        const private = await PrivateController.findPrivateById(payload._id);
        if (String(private.user1) === String(private.user2)) {
          return 'Saved Messages';
        }
        const otherId = String(currentUser._id) === String(private.user1) ?
          private.user2 : private.user1;
        const other = await UserController.findUserById(otherId);
        return other.name;
      }
    },
    avatarUrl: async (payload, _, { currentUser }) => {
      if (payload.type == 'PRIVATE') {
        const private = await PrivateController.findPrivateById(payload._id);
        if (String(private.user1) === String(private.user2)) {
          const user = await UserController.findUserById(private.user1);
          return user.avatarUrl;
        }
        const otherId = String(currentUser._id) === String(private.user1) ?
          private.user2 : private.user1;
        const other = await UserController.findUserById(otherId);
        return other.avatarUrl;
      }
    },
    messages: async (payload) => {
      const { messages } = await AudienceController.populate(payload, 'messages');
      return messages;
    }
  }
}

module.exports = [typeDefs, resolvers];