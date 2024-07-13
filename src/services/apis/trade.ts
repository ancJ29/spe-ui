import { Balance, BalanceOverview, MarketPrice } from "@/common/types";
import { TransactionsHistoryFormData } from "@/types";
import { delay } from "@/utils";
import logger from "../logger";
import axios from "./api";

export async function fetchDepositAddressApi(params: { chain: string; coin: string }) {
  await delay(10);
  const key = `__ADDRESS__.${params.chain}`;
  if (sessionStorage[key]) {
    return sessionStorage[key];
  }
  logger.debug("fetchDepositAddress", params);
  return axios.get<{ result: { depositAddress: string } }>("/api/deposit/address", { params }).then(res => {
    const depositAddress = res.data.result.depositAddress;
    sessionStorage[key] = depositAddress;
    return depositAddress;
  });
}

export function fetchBalancesApi() {
  return axios.get<{
    result: {
      overview: BalanceOverview;
      balances: Balance[];
    };
  }>("/api/balances").then(res => {
    return res.data.result;
  });
}

export function fetchAccountsApi() {
  return axios.get("/api/accounts");
}

export function fetchMeApi() {
  return axios.get("/api/me");
}

export function fetchTransactionsHistoryApi(formData: TransactionsHistoryFormData) {
  return axios.get("/api/transactions/list", {
    params: {
      ...formData,
      type: formData.type?.join()
    }
  });
  // api/transactions/list?type=WITHDRAW&accountId=10142252461111972007602
}
export function fetchMarketPricesApi() {
  return axios.get<{ result: MarketPrice }>("/api/market/prices").then(res => res.data.result);
}
