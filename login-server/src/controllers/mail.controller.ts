import { MailService } from './../services/mail.service';
import { Controller, Post, Body, Get, Param, Logger } from '@nestjs/common';
import { emitWarning } from 'process';
import { AuthService } from 'src/services/auth.service';

@Controller('api/code')
export class MailController {
  private readonly logger = new Logger(MailController.name);
  private codes: { email: string, code: string, timestamp: number }[] = [];
  deletedIndex = 0;
  constructor(
    private mailService: MailService,
    private authService: AuthService) { }

  @Get(':email')
  async sendVerificationCode(@Param('email') email: string) {
    const code = `${Math.floor(Math.random() * 4000) + 1000}`;
    const entry = {
      email,
      code,
      timestamp: Date.now()
    };
    this.codes.unshift(entry);
    if(this.isExpired(this.codes[this.codes.length - 1].timestamp))
      this.codes.splice(this.codes.length - 1, 1);
    this.mailService.sendVerificationCode(email, code);
    // to simulate delay in development
    await new Promise(r => {
      setTimeout(() => r(), 500);
    });
  }

  @Post(':email')
  async checkVerificationCode(
    @Param('email') email: string, @Body() model: { code: string },
  ): Promise<{access_token: string}> {
    const index = this.codes.findIndex(e => e.email === email);
    if (index < 0) return {access_token: null};
    if (!this.isExpired(this.codes[index].timestamp)) {
      if (this.codes[index].code === model.code) {
        this.codes.splice(index, 1);
        this.logger.debug(`Code for '${email}' verified successfuly`);
        const access_token = await this.authService.login(email);
        return { access_token };
      }
    }
    this.logger.debug(`Code for '${email}' not verified!`);
    return { access_token: null };
  }

  private isExpired(timestamp) {
    return timestamp + (+process.env.SEND_VERIFICATION_CODE_TIMEOUT_SEC * 1000) < Date.now();
  }
}
