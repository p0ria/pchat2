import * as mongoose from 'mongoose';

export const AudienceSchema = new mongoose.Schema({
  type: String,
  messages: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Message"
    }
  ]
});