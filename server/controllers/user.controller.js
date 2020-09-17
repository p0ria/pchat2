const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyAuthToken = async token => {
  if (!token)
    throw new Error('Auth token can not be empty');
  try {
    const {email} = jwt.decode(token, 'secretKey');
    const user = await this.findUserByEmail(email);
    return user;
  } catch (error) {
    throw new Error('Auth token not verified');
  }
}

exports.findUserByEmail = email => {
  return User.findOne({email}).exec();
}

