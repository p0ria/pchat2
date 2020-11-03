const { PubSub } = require("apollo-server");

const Topics = {
    AudiencesChanged: 'AUDIENCES_CHANGED',
    MessageAdded: 'MESSAGE_ADDED'
};

const pubsub = new PubSub();

module.exports = { pubsub, Topics };