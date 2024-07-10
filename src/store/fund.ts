import { Account } from "@/domain/account";
import { Balance, CHAIN, CoinType } from "@/domain/balance";
import { fetchAccountsApi, fetchBalancesApi, fetchDepositAddressApi, fetchTransactionsHistory } from "@/services/apis";
import { TransactionsHistoryFormData } from "@/types";
import { create } from "zustand";

interface FundState {
  depositAddress: string
  balances: Balance;
  accounts: Account[];
  setDepositAddress: (address: string) => void
  setBalances: (items: Balance) => void;
  setAccounts: (items: Account[]) => void;
  fetchBalances: () => Promise<void>
  fetchAccounts: () => Promise<void>
  fetchDepositAddress: (coin: CoinType, chain: CHAIN) => Promise<void>
  initial: () => Promise<void>
  fetchTransactionsHistory: (res: TransactionsHistoryFormData) => Promise<void>
}

export const useFundStore = create<FundState>((set, get) => ({
  depositAddress: "",
  balances: { balances: [], overview: {} },
  accounts: [],
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
    console.log("All data fetched in sequence");
  },
  fetchTransactionsHistory: async (queryParams) => {
    const res = await fetchTransactionsHistory(queryParams)
    if(res.data.result) {

    }
  }
}));
