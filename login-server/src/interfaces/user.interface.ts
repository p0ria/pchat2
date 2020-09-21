import { Document, Types } from 'mongoose';

export interface User extends Document {
  readonly _id: string
  readonly name: string
  readonly email: string
  readonly avatarUrl: string
  readonly audiences: Types.ObjectId[]
}