const { ApolloServer } = require('apollo-server');
const { verifyAuthToken } = require('./controllers/user.controller');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('DB connected!'))
  .catch(err => console.error(err));

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if(authToken) currentUser = await verifyAuthToken(authToken);
    } catch(err) {
      console.error(`Unable to authenticate user with token ${authToken}`, err.message);
    }
    return {currentUser};
  }
})
server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});