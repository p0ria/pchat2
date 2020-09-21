const { merge } = require('lodash');
const [ Query, QueryResolver ] = require('./Query');
const [ Mutation, MutationResolver ] = require('./Mutation');
const [ Audience, AudienceResolver ] = require('./Audience');
const [ Message, MessageResolver ] = require('./Message');
const [ User, UserResolver ] = require('./User');

const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { UserController } = require('../controllers/user.controller');

const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, Audience, Message, User],
  resolvers: merge(QueryResolver, MutationResolver, AudienceResolver, MessageResolver, UserResolver)
});

const server = new ApolloServer({
  schema,
  context: async ({req}) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if(authToken) currentUser = await UserController.verifyAuthToken(authToken);
    } catch(err) {
      console.error(`Unable to authenticate user with token ${authToken}`, err.message);
    }
    return {currentUser};
  }
});

module.exports = server;
