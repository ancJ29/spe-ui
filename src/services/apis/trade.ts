import { DepositFormData, TransactionsHistoryFormData } from "@/types";
import axios from "./api";

export async function fetchDepositAddressApi(queryParams: any) {
  return axios.get("/api/deposit/address", { params: queryParams });
}

export function fetchBalancesApi() {
  return axios.get("/api/balances");
}

export function fetchAccountsApi() {
  return axios.get("/api/accounts");
}

export function fetchMeApi() {
  return axios.get("/api/me");
}

export function internalDepositApi(formData: DepositFormData) {
  return axios.post("/internal-api/deposit");
}

export function fetchTransactionsHistoryApi(formData: TransactionsHistoryFormData) {
  console.log(formData.type)
  return axios.get("/api/transactions/list", {params: {
    ...formData,
    type: formData.type?.join()
  }});
  // api/transactions/list?type=WITHDRAW&accountId=10142252461111972007602
}
export function fetchMarketPricesApi() {
  return axios.get("/api/market/prices");
}


