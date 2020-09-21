import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  audiences: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Audience'
    }
  ]
});

