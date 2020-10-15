import * as mongoose from 'mongoose';

export const AudienceSchema = new mongoose.Schema({
  type: String,
  avatarUrl: String,
  messages: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Message"
    }
  ]
});