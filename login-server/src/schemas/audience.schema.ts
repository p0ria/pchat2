import * as mongoose from 'mongoose';

export const AudienceSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  type: String,
  name: String,
  avatarUrl: String,
  messages: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Message"
    }
  ]
});