const { gql } = require("apollo-server");
const { AudienceController } = require('../controllers/audience.controller');

const typeDefs = gql`
    union AudienceImpl = Private 
`

const resolvers = {
    AudienceImpl: {
        async __resolveType({ _id }) {
            const { type } = await AudienceController.findAudienceById(_id);
            switch (type) {
                case 'PRIVATE':
                    return 'Private';

                default:
                    return null;
            }
        }
    }
}

module.exports = [typeDefs, resolvers];