const { gql } = require('apollo-server');
const { pubsub, Topics } = require("./Topics");

const typeDefs = gql`
    type Subscription {
        audiencesChanged: [Audience]!
    }
`;

const resolvers = {
    Subscription: {
        audiencesChanged: {
            subscribe: () => pubsub.asyncIterator([Topics.AudiencesChanged])
        }
    }
}

module.exports = [typeDefs, resolvers];