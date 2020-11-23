import { MailService } from './mail.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { WSGateway } from './ws.gateway';
export const SERVICES = [
  MailService,
  UserService,
  AuthService,
  WSGateway
];
