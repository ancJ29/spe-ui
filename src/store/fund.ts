import { Balance, BalanceOverview, MarketPrice } from "@/common/types";
import { Account } from "@/domain/account";
import { CHAIN, CoinType } from "@/domain/balance";
import { Transaction } from "@/domain/transaction";
import { fetchAccountsApi, fetchBalancesApi, fetchDepositAddressApi, fetchMarketPricesApi, fetchTransactionsHistoryApi } from "@/services/apis";
import { TransactionsHistoryFormData } from "@/types";
import { create } from "zustand";

interface FundState {
  depositAddress: string
  balances: {
    overview: BalanceOverview;
    balances: Balance[];
  };
  accounts: Account[];
  transactions: Transaction[]
  marketPrices: MarketPrice
  setDepositAddress: (address: string) => void
  fetchBalances: () => Promise<void>
  fetchAccounts: () => Promise<void>
  fetchDepositAddress: (coin: CoinType, chain: CHAIN) => Promise<void>
  initial: () => Promise<void>
  fetchTransactionsHistory: (res: TransactionsHistoryFormData) => Promise<void>
  fetchMarketPrices: () => Promise<void>
}

export const useFundStore = create<FundState>((set, get) => ({
  depositAddress: "",
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
  setDepositAddress: (depositAddress) => set((state) => ({ ...state, depositAddress })),

  // Async actions
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

  fetchDepositAddress: async (coin: CoinType, chain: CHAIN) => {
    const depositAddress = await fetchDepositAddressApi({ coin, chain });
    depositAddress && set(state => ({
      ...state,
      depositAddress: depositAddress
    }));
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
