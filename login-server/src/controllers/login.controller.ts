import { Controller, Post, Body, Logger } from '@nestjs/common';
import * as jwt from 'jwt-simple';

@Controller('api/login')
export class LoginController {
  private readonly logger = new Logger(LoginController.name);
  
  @Post('google')
  loginByGoogle(@Body() model: {tokenId: string}): {email: string} {
    var {email} = jwt.decode(model.tokenId, null, true);
    return {email};
  }
}