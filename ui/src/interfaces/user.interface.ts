import { Audience } from "./audience.interface";

export interface User {
  _id: string
  name: string
  email: string
  avatarUrl: string
  audiences: Audience[]
}