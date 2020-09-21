import { Document, Types } from 'mongoose';

export interface Audience extends Document {
  readonly _id: Types.ObjectId
  readonly type: string
  readonly name: string
  readonly avatarUrl: string
  readonly messages: []
}