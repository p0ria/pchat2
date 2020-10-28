const { PubSub } = require("apollo-server");

const EventTypes = {
    AudiencesChanged: 'AUDIENCES_CHANGED'
};

const pubsub = new PubSub();

module.exports = { pubsub, EventTypes };