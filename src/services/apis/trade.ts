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

export function fetchTransactionsHistory(formData: TransactionsHistoryFormData) {
  return axios.post("/transactions/list", formData);
}

