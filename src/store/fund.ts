import { Account } from "@/domain/account";
import { Balance, CHAIN, CoinType } from "@/domain/balance";
import { MarketPrice } from "@/domain/marketPrice";
import { Transaction } from "@/domain/transaction";
import { fetchAccountsApi, fetchBalancesApi, fetchDepositAddressApi, fetchMarketPricesApi, fetchTransactionsHistoryApi } from "@/services/apis";
import { TransactionsHistoryFormData } from "@/types";
import { create } from "zustand";

interface FundState {
  depositAddress: string
  balances: Balance;
  accounts: Account[];
  transactions: Transaction[]
  marketPrices: MarketPrice
  setDepositAddress: (address: string) => void
  setBalances: (items: Balance) => void;
  setAccounts: (items: Account[]) => void;
  fetchBalances: () => Promise<void>
  fetchAccounts: () => Promise<void>
  fetchDepositAddress: (coin: CoinType, chain: CHAIN) => Promise<void>
  initial: () => Promise<void>
  fetchTransactionsHistory: (res: TransactionsHistoryFormData) => Promise<void>
  fetchMarketPrices: () => Promise<void>
}

export const useFundStore = create<FundState>((set, get) => ({
  depositAddress: "",
  balances: { balances: [], overview: {} },
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
  setBalances: (items) => set((state) => ({ ...state, balances: { ...items } })),
  setAccounts: (items) => set((state) => ({ ...state, accounts: items })),

  // Async actions
  fetchBalances: async () => {
    const res = await fetchBalancesApi();
    if (res.data.result) {
      set(state => ({
        ...state,
        balances: res.data.result
      }));
    }
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
    const res = await fetchDepositAddressApi({ coin, chain });
    if(res.data.result) {
    set(state => ({
      ...state,
      depositAddress: res.data.result?.depositAddress
    }));
  }
  },

  initial: async () => {
    await get().fetchAccounts();
    await get().fetchBalances();
    await get().fetchMarketPrices()
    console.log("All data fetched in sequence");
  },
  fetchTransactionsHistory: async (queryParams) => {
    const res = await fetchTransactionsHistoryApi(queryParams)
    if(res.data.result) {
      set(state => ({
        ...state,
        transactions: res.data.result ?? []
      }));
    }
  },
  fetchMarketPrices: async () => {
    const res = await fetchMarketPricesApi()
    if(res.data.result) {
      set(state => ({
        ...state,
        marketPrices: res.data.result
      }));
    }
  }
}));
