import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.service";
import { User } from "src/interfaces/user.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService) { }

  async login(email: string): Promise<string> {
    let user = await this.userService.findUserByEmail(email);
    if (!user) {
      const name = email.split('@')[0];
      user = await this.userService.createUser(email, name);
    } 
    return this.generateToken(user);
  }

  generateToken(user: User): string {
    const payload = {
      email: user.email
    };
    return this.jwtService.sign(payload)
  }
}