export * as axios from "./axios";

import {
  Account,
  AuthenticationPayload,
  Balance,
  BalanceOverview,
  MarketPrice,
  SpeTransaction,
  SymbolConfig,
} from "@/common/types";
import { TransactionsHistoryFormData } from "@/types";
import { delay } from "@/utils";
import logger from "../logger";
import axios, { getApi } from "./axios";

export async function fetchDepositAddressApi(params: {
  chain: string;
  coin: string;
}) {
  if (!localStorage.__TOKEN__) {
    return "";
  }
  await delay(10);
  const key = `__ADDRESS__.${params.chain}`;
  if (sessionStorage[key]) {
    return sessionStorage[key];
  }
  type Response = { result: { depositAddress: string } };
  return axios
    .get<Response>("/api/deposit/address", { params })
    .then((res) => {
      const depositAddress = res.data.result.depositAddress;
      sessionStorage[key] = depositAddress;
      return depositAddress;
    });
}

export function fetchBalancesApi() {
  if (!localStorage.__TOKEN__) {
    return {
      balances: [],
      overview: { all: { totalInBtc: "0", totalInUsd: "0" } },
    } as {
      overview: BalanceOverview;
      balances: Balance[];
    };
  }
  return getApi<{
    overview: BalanceOverview;
    balances: Balance[];
  }>("/api/balances");
}

export function fetchAccountsApi() {
  if (!localStorage.__TOKEN__) {
    return [] as Account[];
  }
  return getApi<{
    accounts: Account[];
  }>("/api/accounts").then(({ accounts = [] }) => {
    // Memo: funding account is always on top
    return accounts.sort((a) => (a.isFunding ? -1 : 1));
  });
}

export function fetchTransactionsHistoryApi(
  formData: TransactionsHistoryFormData,
) {
  if (!localStorage.__TOKEN__) {
    return [] as SpeTransaction[];
  }
  return getApi<SpeTransaction[]>("/api/transactions/list", {
    params: {
      ...formData,
      type: formData.type,
      types: formData.types?.join(","),
    },
  });
}

export async function getMe(): Promise<AuthenticationPayload> {
  if (!localStorage.__TOKEN__) {
    throw new Error("Not logged in");
  }
  const me = await getApi<AuthenticationPayload>("/api/me");
  if (!me?.id) {
    throw new Error("Failed to get me");
  }
  return me;
}

export function getAllSymbolsApi() {
  return getApi<{ symbols: SymbolConfig[] }>(
    "/api/information/symbols",
  ).then((res) => res.symbols);
}

export function fetchMarketPricesApi() {
  return getApi<MarketPrice>("/api/market/prices");
}
export async function checkMfa({
  email,
  mobile,
  type,
}: {
  type: 1 | 2;
  mobile?: string;
  email?: string;
}): Promise<{ hasMfa: boolean }> {
  type MfaCheckResponse = {
    result: {
      hasMfa: boolean;
    };
  };

  return axios
    .post<MfaCheckResponse>("/api/check", { email, mobile, type })
    .then((res) => {
      const hasMfa = Boolean(res.data?.result?.hasMfa);
      return { hasMfa };
    })
    .catch((err) => {
      logger.error("Failed to check MFA", err);
      return { hasMfa: false };
    })
    .finally(() => {
      // Do something
    });
}

export function fetchMetadata<T>(url: string) {
  return axios
    .get<{ result: T }>(url)
    .then((response) => response.data.result);
}

export default axios;
