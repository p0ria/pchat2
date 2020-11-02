const Audience = require('../models/Audience');
const { UserController } = require('./user.controller');

exports.AudienceController = {
    getAudiencesForUser: async userId => {
        const user = await UserController.findUserById(userId);
        user = await UserController.populate(user, 'audiences');
        return user;
    },
    findAudienceById: id => {
        return Audience.findById(id);
    },
    populate: (audience, ...relations) => {
        return Audience.populate(audience, relations);
    }
}