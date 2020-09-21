const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.UserController = {
  verifyAuthToken: async token => {
    if (!token)
      throw new Error('Auth token can not be empty');
    try {
      const {email} = jwt.decode(token, 'secretKey');
      const user = await this.UserController.findUserByEmail(email);
      return user;
    } catch (error) {
      throw new Error('Auth token not verified');
    }
  },
  findUserByEmail: email => {
    return User.findOne({email}).exec();
  },
  findUserById: id => {
    return User.findById(id);
  },
  populate: async (user, ...relations) => {
    return  User.populate(user, relations)
  }
}
