import { Document, Types } from 'mongoose';

export interface Private extends Document {
    readonly _id: Types.ObjectId
    readonly user1: Types.ObjectId
    readonly user2: Types.ObjectId
}