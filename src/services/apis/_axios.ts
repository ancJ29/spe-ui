import { IS_DEV } from "@/domain/config";
import _axios from "axios";
import { Md5 } from "ts-md5";

if (!localStorage.__X_UID__) {
  localStorage.__X_UID__ = _generateUID(
    Math.random().toString(36).slice(2),
  );
}

const axios = _axios.create({
  baseURL: IS_DEV
    ? import.meta.env.APP_API_URL
    : "https://demo-api.spe-labo.com",
  headers: {
    "Content-type": "application/json",
    "X-UID": localStorage.__X_UID__,
  },
});

export default axios;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.__TOKEN__;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    const timestamp = Date.now().toString();
    config.headers["X-TIMESTAMP"] = timestamp;
    config.headers["X-NONCE"] = _generateNonce(
      `${localStorage.__X_UID__}/${timestamp}`,
    );
    if (IS_DEV) {
      if (config.method !== "get") {
        config.url = `${config.url}?_path=${config.url?.replace(
          /\//g,
          "_",
        )}`;
      } else {
        if (config.url?.includes("?")) {
          const url = config.url?.split("?")[0];
          config.url = `${config.url}&_path=${url?.replace(
            /\//g,
            "_",
          )}`;
        } else {
          config.url = `${config.url}?_path=${config.url?.replace(
            /\//g,
            "_",
          )}`;
        }
        // logger.debug("Request", config);
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

function _generateUID(prefix: string) {
  let cont = true;
  do {
    const uid = Math.random().toString(36).slice(2);
    if (_check(`${prefix}/${uid}`)) {
      cont = false;
      return uid;
    }
  } while (cont);
  return "";
}

function _generateNonce(prefix: string) {
  let cont = true;
  do {
    const nonce = Math.random().toString(36).slice(2);
    if (_check(`${prefix}/${nonce}`)) {
      cont = false;
      return nonce;
    }
  } while (cont);
  return "";
}

function _check(uid: string, end = "000") {
  return Md5.hashStr(uid).endsWith(end);
}
