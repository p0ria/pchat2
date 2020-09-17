const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  type: String,
  value: mongoose.SchemaTypes.Buffer,
  audience: { type: mongoose.SchemaTypes.ObjectId, ref: "Audience" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {timestamps: true})

module.exports = mongoose.model('Message', MessageSchema);