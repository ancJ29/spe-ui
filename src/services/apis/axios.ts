import _axios from "axios";

const axios = _axios.create({
  baseURL:
    import.meta.env.APP_API_URL || "https://spe-demo.cryp-trades.com",
  headers: {
    "Content-type": "application/json",
    "X-API-KEY": "jsuG@wPZ6scs8VCuKJsVdw5"
  },
});

axios.interceptors.request.use(
  config => {
    const token = localStorage.__TOKEN__;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axios;
