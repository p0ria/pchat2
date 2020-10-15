const mongoose = require('mongoose')

const AudienceSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  type: String,
  avatarUrl: String,
  messages: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Message"
    }
  ]
});

module.exports = mongoose.model('Audience', AudienceSchema);