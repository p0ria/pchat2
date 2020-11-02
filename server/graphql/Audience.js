const { gql } = require("apollo-server");
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
    name: async (parent, _, { currentUser }) => {
      if (parent.type == 'PRIVATE') {
        const private = await PrivateController.findPrivateById(parent._id);
        if (String(private.user1) === String(private.user2)) {
          return 'Saved Messages';
        }
        const otherId = String(currentUser._id) === String(private.user1) ?
          private.user2 : private.user1;
        const other = await UserController.findUserById(otherId);
        return other.name;
      }
    }
  }
}

module.exports = [typeDefs, resolvers];