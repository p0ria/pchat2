const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  audiences: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Audience'
    }
  ]
})

module.exports = mongoose.model('User', UserSchema);