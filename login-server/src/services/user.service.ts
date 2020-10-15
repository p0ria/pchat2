import { Injectable, Inject } from "@nestjs/common";
import { Model } from 'mongoose';
import { User } from "src/interfaces/user.interface";
import { Audience } from "src/interfaces/audience.interface";
import { Private } from "src/interfaces/private.interface";

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    @Inject('AUDIENCE_MODEL') private audienceModel: Model<Audience>,
    @Inject('PRIVATE_MODEL') private privateModel: Model<Private>) { }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(email: string, name: string): Promise<User> {
    const user = await this.userModel.create({ email, name, avatarUrl: 'https://i.imgur.com/PW0UW6Z.png', audiences: [] });
    const audience = await this.audienceModel.create(
      { type: 'PRIVATE', avatarUrl: user.avatarUrl, messages: [] });
    this.privateModel.create({
      _id: audience._id,
      user1: user._id,
      user2: user._id
    });
    user.audiences.push(audience._id);
    const updatedUser = await user.save();
    return updatedUser;
  }
}