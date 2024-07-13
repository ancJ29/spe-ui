import { Balance, BalanceOverview, MarketPrice, SpeTransaction } from "@/common/types";
import { Account } from "@/domain/account";
import { fetchAccountsApi, fetchBalancesApi, fetchMarketPricesApi, fetchTransactionsHistoryApi } from "@/services/apis";
import { TransactionsHistoryFormData } from "@/types";
import { create } from "zustand";

interface AssetState {
  balances: {
    overview: BalanceOverview;
    balances: Balance[];
  };
  accounts: Account[];
  transactions: SpeTransaction[]
  marketPrices: MarketPrice
  fetchBalances: () => Promise<void>
  fetchAccounts: () => Promise<void>
  initial: () => Promise<void>
  fetchTransactionsHistory: (res: TransactionsHistoryFormData) => Promise<void>
  fetchMarketPrices: () => Promise<void>
}

export const useAssetStore = create<AssetState>((set, get) => ({
  balances: {
    balances: [], overview: {
      all: {
        totalInBtc: "0",
        totalInUsd: "0"
      }
    }
  },
  accounts: [],
  transactions: [],
  marketPrices: {
    BNBUSDT: 0,
    BTC_USDT_SPOT: 0,
    BTCUSDT: 0,
    ETH_USDT_SPOT: 0,
    ETHUSDT: 0
  },

  fetchBalances: async () => {
    const { balances, overview } = await fetchBalancesApi();
    set(state => ({
      ...state,
      balances: { balances, overview }
    }));
  },

  fetchAccounts: async () => {
    const res = await fetchAccountsApi();
    if (res.data.result) {
      set(state => ({
        ...state,
        accounts: res.data.result?.accounts ?? []
      }));
    }
  },

  initial: async () => {
    await get().fetchAccounts();
    await get().fetchBalances();
    await get().fetchMarketPrices();
  },

  fetchTransactionsHistory: async (queryParams) => {
    const res = await fetchTransactionsHistoryApi(queryParams);
    if (res.data.result) {
      set(state => ({
        ...state,
        transactions: res.data.result ?? []
      }));
    }
  },

  fetchMarketPrices: async () => {
    const marketPrices = await fetchMarketPricesApi();
    set(state => ({
      ...state,
      marketPrices,
    }));
  }
}));
