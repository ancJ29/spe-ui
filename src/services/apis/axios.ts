import _axios from "axios";
const axios = _axios.create({
  baseURL:
    import.meta.env.APP_API_URL || "https://spe-demo.cryp-trades.com",
  headers: {
    "Content-type": "application/json",
  },
});

export default axios;
