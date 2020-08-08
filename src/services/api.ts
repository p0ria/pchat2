import { Url } from "./url";
import axios, { Method, AxiosPromise } from "axios";

export const Api: { [key: string]: { action: string; method: Method } } = {
  getVerificationCode: { action: "code", method: "get" },
};

const call = (
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

export default call;
