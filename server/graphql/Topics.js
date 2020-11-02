const { PubSub } = require("apollo-server");

const Topics = {
    AudiencesChanged: 'AUDIENCES_CHANGED'
};

const pubsub = new PubSub();

module.exports = { pubsub, Topics };