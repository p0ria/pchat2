const {gql} = require('apollo-server');
const { authenticated } = require('../utils/gql-utils');

const typeDefs = gql`
  type Query {
    me: User
  }
`
const resolvers = {
  Query: {
    me: authenticated((_, __, {currentUser}) => currentUser)
  }
}

module.exports = [typeDefs, resolvers];