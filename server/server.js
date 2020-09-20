const [server] = require('./graphql/ApolloServer');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('DB connected!'))
  .catch(err => console.error(err));
  
server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});