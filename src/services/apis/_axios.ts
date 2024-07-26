import { IS_DEV } from "@/domain/config";
import _axios from "axios";
import logger from "../logger";

const axios = _axios.create({
  baseURL:
    import.meta.env.APP_API_URL || "https://spe-demo.cryp-trades.com",
  headers: {
    "Content-type": "application/json",
    "X-API-KEY": "jsuG@wPZ6scs8VCuKJsVdw5",
  },
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.__TOKEN__;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (IS_DEV) {
      logger.trace("Request", config);
      if (config.params) {
        config.params = {
          ...config.params,
          _path: config.url?.replace(/\//g, "_"),
        };
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export function getApi<T>(...args: Parameters<typeof axios.get>) {
  return axios
    .get<{ result: T }>(...args)
    .then((res) => res.data.result);
}

export default axios;
