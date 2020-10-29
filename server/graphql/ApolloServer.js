const { merge } = require('lodash');
const [Query, QueryResolver] = require('./Query');
const [Mutation, MutationResolver] = require('./Mutation');
const [Subscription, SubscriptionResolver] = require('./Subscription');
const [Audience, AudienceResolver] = require('./Audience');
const [Message, MessageResolver] = require('./Message');
const [User, UserResolver] = require('./User');

const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { UserController } = require('../controllers/user.controller');

const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, Subscription, Audience, Message, User],
  resolvers: merge(QueryResolver, MutationResolver, SubscriptionResolver, AudienceResolver, MessageResolver, UserResolver)
});

const server = new ApolloServer({
  schema,
  subscriptions: {
    onConnect: async ({ authToken }, webSocket) => {
      console.log(`client connected to websocket`)
      if (authToken) {
        const currentUser = await UserController.verifyAuthToken(authToken);
        if (currentUser) return { currentUser };
        else throw new Error(`Unable to authenticate user with token ${authToken}`);
      }
      throw new Error('Missing auth token!');
    }
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context;
    } else {
      let authToken = null;
      let currentUser = null;
      try {
        authToken = req.headers.authorization;
        if (authToken) currentUser = await UserController.verifyAuthToken(authToken);
      } catch (err) {
        console.error(`Unable to authenticate user with token ${authToken}`, err.message);
      }
      return { currentUser };
    }
  }
});

module.exports = server;
