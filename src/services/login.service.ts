import { UrlService } from './url.service';
import axios from "axios";


export const LoginServices = {
  generateVerificationCode: (email: string): Promise<any> => {
    return axios.post(
      UrlService.SendVerificationCodeUrl, 
      {email});
  }
}