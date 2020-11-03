const { gql } = require('apollo-server');
const { pubsub, Topics } = require("./Topics");

const typeDefs = gql`
    type Subscription {
        audiencesChanged: [Audience]!
        messageAdded: Message!
    }
`;

const resolvers = {
    Subscription: {
        audiencesChanged: {
            subscribe: () => pubsub.asyncIterator([Topics.AudiencesChanged])
        },
        messageAdded: {
            subscribe: () => pubsub.asyncIterator([Topics.MessageAdded])
        }
    }
}

module.exports = [typeDefs, resolvers];