import { EnvService } from './env.service';
export const UrlService = {
  SendVerificationCodeUrl: `${EnvService.apiUrl}/code/send`
};