import * as mongoose from 'mongoose';

export const PrivateSchema = new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    user1: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    user2: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }
});