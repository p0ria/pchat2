const { UserController } = require('./user.controller');

exports.AudienceController = {
    getAudiencesForUser: async userId => {
        const user = await UserController.findUserById(userId);
        user = await UserController.populate(user, 'audiences');
        console.log("USER: ", user);
        return user;
    }
}