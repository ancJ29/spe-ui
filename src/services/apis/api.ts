import axios from "./axios";

export function fetcher<T>(url: string) {
  return axios
    .get<{ result: T }>(url)
    .then((response) => response.data.result);
}

export default axios;
