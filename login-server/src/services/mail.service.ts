import { Injectable, Logger } from '@nestjs/common';

import * as mailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter;

  constructor() {
    this.transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  public sendVerificationCode(to: string, code: string) {
    const mailOptions: MailOptions = {
      from: 'poria.mast3r@gmail.com',
      to,
      subject: 'PChat',
      text: `Your verification code is: ${code}`,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        this.logger.error(`Error sending verification code to '${to}', ${error}.`);
      } else {
        this.logger.debug(`Verification code sent to '${to}' successfully.`);
      }
    });
  }
}
