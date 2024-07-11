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
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(response => {
  const currentPath = window.location.pathname + window.location.search;
  if (response.data.code === 90003 && response.data.result == null) {
    console.log(response.data)
    logout()
    window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
  }
  return response
})
export default axios;


export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("__USER__");
}
