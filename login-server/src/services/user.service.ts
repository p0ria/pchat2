import { Injectable, Inject } from "@nestjs/common";
import { Model } from 'mongoose';
import { User } from "src/interfaces/user.interface";
import { Audience } from "src/interfaces/audience.interface";

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    @Inject('AUDIENCE_MODEL') private audienceModel: Model<Audience>) { }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(email: string, name: string): Promise<User> {
    const user = await this.userModel.create({ email, name, avatarUrl: '', audiences: [] });
    const audience = await this.audienceModel.create(
      { _id: user._id, type: 'USER', name: user.name, avatarUrl: user.avatarUrl, messages: [] });
    user.audiences.push(audience._id);
    const updatedUser = await this.userModel.findOneAndUpdate({ _id: user._id }, user, { useFindAndModify: false });
    return updatedUser;
  }
}