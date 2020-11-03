const mongoose = require('mongoose')

const AudienceSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  type: String,
  messages: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Message"
    }
  ]
});

module.exports = mongoose.model('Audience', AudienceSchema);