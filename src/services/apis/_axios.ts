import _axios from "axios";

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


export const getReuseHeaders = (method: "GET" | "POST", url: string, params: any) => {
  return {
    headers: {
      ...axios.defaults.headers.common,
      Authorization: `Bearer ${localStorage.getItem("__TOKEN__")}`,
    },
    method: method,
    url: `${axios.getUri()}${url}`,
    params: params ?? {},
  };
};
export default axios;
