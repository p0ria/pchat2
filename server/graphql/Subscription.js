const { gql } = require('apollo-server');
const { pubsub, EventTypes } = require("./Events");

const typeDefs = gql`
    type Subscription {
        audiencesChanged: [Audience]!
    }
`;

const resolvers = {
    Subscription: {
        audiencesChanged: {
            subscribe: () => pubsub.asyncIterator([EventTypes.AudiencesChanged])
        }
    }
}

module.exports = [typeDefs, resolvers];