const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AudienceController } = require('./audience.controller');
const { PrivateController } = require('./private.controller');

exports.UserController = {
  verifyAuthToken: async token => {
    if (!token)
      throw new Error('Auth token can not be empty');
    try {
      const { email } = jwt.decode(token, 'secretKey');
      const user = await this.UserController.findUserByEmail(email);
      return user;
    } catch (error) {
      throw new Error('Auth token not verified');
    }
  },
  findUserByEmail: email => {
    return User.findOne({ email }).exec();
  },
  findUserById: id => {
    return User.findById(id);
  },
  changeUserAvatar: async (userId, avatarUrl) => {
    const user = await this.UserController.findUserById(userId);
    user.avatarUrl = avatarUrl;
    await user.save();

    let audience = null;
    for (var i = 0; i < user.audiences.length; i++) {
      const private = await PrivateController.findPrivateById(user.audiences[i]);
      if (private && String(private.user1) && String(private.user1) === String(private.user2)) {
        audience = await AudienceController.findAudienceById(user.audiences[i]);
        break;
      }
    }
    audience.avatarUrl = avatarUrl;
    await audience.save();
    return { user, audience };
  },
  populate: async (user, ...relations) => {
    return User.populate(user, relations)
  }
}
