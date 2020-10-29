const server = require('./graphql/ApolloServer');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('DB connected!'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
});