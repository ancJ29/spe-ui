export * as axios from "./_axios";

import { OrderSide, OrderType } from "@/common/enums";
import {
  Account,
  AuthenticationPayload,
  Balance,
  BalanceOverview,
  CopyMasterDetail,
  CopyMasterSetting,
  CopyPosition,
  MarketInformation,
  MarketPrice,
  OpenTrades,
  Order,
  Position,
  SpeTransaction,
  SymbolConfig,
  Trade,
} from "@/common/types";
import { assetStore } from "@/store/assets";
import { TransactionsHistoryFormData } from "@/types";
import { delay } from "@/utils";
import logger from "../logger";
import axios, { getApi } from "./_axios";

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

export function fetchAllSymbolsApi() {
  return getApi<{ symbols: SymbolConfig[] }>(
    "/api/information/symbols",
  ).then((res) => res.symbols);
}

export function fetchMarketPricesApi() {
  return getApi<MarketPrice>("/api/market/prices");
}

export async function cancelOrderApi(orderId: string) {
  const accountId = assetStore.getState().tradingAccount?.id;
  if (!accountId) {
    await delay(10);
    return;
  }
  await axios
    .post("/api/order/cancel", { orderId, accountId })
    .then((res) => {
      if (res.data.code !== 0) {
        throw new Error("Failed to cancel order");
      }
    });
}

export async function closeOrderApi(
  symbol: string,
  volume: string,
  side: OrderSide,
) {
  const accountId = assetStore.getState().tradingAccount?.id;
  if (!accountId) {
    await delay(10);
    return;
  }
  await axios
    .post("/api/order/create", {
      accountId,
      symbol,
      side,
      volume,
      type: OrderType.MARKET,
    })
    .then((res) => {
      if (res.data.code !== 0) {
        throw new Error("Failed to close order");
      }
    });
}

export async function fetchMyMasterDetail() {
  return getApi<CopyMasterDetail>("/api/copy/master/me");
}

export async function updateMasterSettingApi(params: CopyMasterSetting) {
  await axios.post("/api/copy/master/me/update", params);
}

export async function fetchOpenTrades() {
  const accountId = assetStore.getState().tradingAccount?.id;
  if (!accountId) {
    await delay(10);
    return {
      openOrders: {}, openPositions: {}
    } as OpenTrades;
  }
  return getApi<OpenTrades>("/api/trades/open", { params: { accountId } });
}

export async function fetchTrades(symbol?: string) {
  const accountId = assetStore.getState().tradingAccount?.id;
  if (!accountId) {
    await delay(10);
    return [] as Trade[];
  }
  try {
    const trades = await getApi<{ trades: Trade[] }>(
      "/api/trades/list",
      {
        params: { accountId, symbol, limit: 100 },
      },
    ).then((res) => res.trades);
    return trades;
  } catch (err) {
    logger.error("Failed to fetch trades", err);
    return [] as Trade[];
  }
}

export async function fetchClosedPositions(symbol?: string) {
  const accountId = assetStore.getState().tradingAccount?.id;
  if (!accountId) {
    await delay(10);
    return [] as Position[];
  }
  return getApi<{ positions: Position[] }>("/api/positions/closed", {
    params: { accountId, symbol, limit: 100 },
  }).then((res) => res.positions);
}

export async function fetchOpenCopyPositions() {
  const path = "/api/copy/master/me/positions/open";
  return getApi<{ positions: CopyPosition[] }>(path).then((res) => res.positions);
}

export async function fetchClosedCopyPositions() {
  const path = "/api/copy/master/me/positions/history";
  return getApi<{ positions: CopyPosition[] }>(path).then((res) => res.positions);
}

export async function fetchFollowersPositions() {
  const path = "/api/copy/master/me/positions/followers";
  return getApi<{ positions: CopyPosition[] }>(path).then((res) => res.positions);
}


export async function fetchOpenPositions(symbol?: string) {
  const accountId = assetStore.getState().tradingAccount?.id;
  if (!accountId) {
    await delay(10);
    return [] as Position[];
  }
  return getApi<{ positions: Position[] }>("/api/positions/open", {
    params: { accountId, symbol, limit: 100 },
  }).then((res) => res.positions);
}

export async function fetchActiveOrders(symbol?: string) {
  const accountId = assetStore.getState().tradingAccount?.id;
  if (!accountId) {
    await delay(10);
    return [] as Order[];
  }
  return getApi<{ orders: Order[] }>("/api/orders/active", {
    params: { accountId, symbol, limit: 100 },
  }).then((res) => res.orders);
}

export async function fetchOrders(symbol?: string) {
  const accountId = assetStore.getState().tradingAccount?.id;
  if (!accountId) {
    await delay(10);
    return [] as Order[];
  }
  const orders = await getApi<{ orders: Order[] }>(
    "/api/orders/list",
    {
      params: { accountId, symbol, limit: 100 },
    },
  ).then((res) => res?.orders || []);
  logger.debug("Fetched orders", orders);
  return orders;
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

export function fetch<T>(url: string) {
  return axios
    .get<{ result: T }>(url)
    .then((response) => response.data.result);
}

export function fetchOrderBooks(symbol: string) {
  return getApi<{
    a: [number, number, number, number][];
    b: [number, number, number, number][];
  }>(`/api/market/order-book?symbol=${symbol}`);
}

export function fetchAllMarketInformation() {
  return getApi<MarketInformation[]>("/api/market/information/all");
}

export function fetchMarketInformation(symbol: string) {
  return getApi<MarketInformation>(
    `/api/market/information?symbol=${symbol}`,
  );
}

export default axios;
