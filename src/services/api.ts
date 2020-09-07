import axios, { Method, AxiosPromise } from "axios";
import { Env } from "./env";

export const Url: {[action: string]: string} = {
  code: `${Env.apiUrl}/code`,
  loginByGoogle: `${Env.apiUrl}/login/google`,
  loginByEmail: `${Env.apiUrl}/login/email`
};

export const Apis: { [key: string]: { action: string; method: Method } } = {
  getVerificationCode: { action: "code", method: "get" },
  verifyCode: {action: "code", method: "post"},
  loginByGoogle: { action: "loginByGoogle", method: "post"},
  loginByEmail: { action: "loginByEmail", method: "post"}
};

const api = (
  api: { action: string; method: Method },
  config: { data?: any; url?: string, params?: any } = {}
): AxiosPromise<any> => {
  let baseURL = Url[api.action];
  return axios({
    baseURL, 
    url: config.url,
    method: api.method,
    data: config.data,
    params: config.params,
  });
};

export default api;
