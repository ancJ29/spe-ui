import { isFundingAccount, isTradingAccount } from "@/common/logic";
import {
  Account,
  Balance,
  BalanceOverview,
  SpeTransaction,
} from "@/common/types";
import {
  fetchAccountsApi,
  fetchBalancesApi,
  fetchTransactionsHistoryApi,
} from "@/services/apis";
import { TransactionsHistoryFormData } from "@/types";
import { create } from "zustand";

interface AssetState {
  balances: Balance[];
  overview: BalanceOverview;
  accounts: Account[];
  accountById: Record<string, Account>;
  transactions: SpeTransaction[];
  fundingBalances: Balance[];
  tradingBalances: Balance[];
  fundingAccount?: Account;
  tradingAccount?: Account;
  fetchBalances: () => Promise<void>;
  fetchAccounts: () => Promise<void>;
  fetchTransactionsHistory: (
    res: TransactionsHistoryFormData,
  ) => Promise<void>;
}

export const assetStore = create<AssetState>((set) => ({
  overview: {
    all: {
      totalInBtc: "0",
      totalInUsd: "0",
    },
  },
  fundingBalances: [],
  tradingBalances: [],
  balances: [],
  accounts: [],
  accountById: {},
  transactions: [],
  marketPrices: {
    BNBUSDT: 0,
    BTCUSDT: 0,
    ETHUSDT: 0,
    BTC_USDT_SPOT: 0,
    ETH_USDT_SPOT: 0,
  },
  async fetchBalances() {
    const { balances, overview } = await fetchBalancesApi();

    set((state) => {
      const fundingBalances = balances.filter(
        (balance) =>
          balance.accountId === state.fundingAccount?.id || "",
      );
      const tradingBalances = balances.filter(
        (balance) =>
          balance.accountId === state.tradingAccount?.id || "",
      );
      return {
        ...state,
        balances,
        overview,
        fundingBalances,
        tradingBalances,
      };
    });
  },
  async fetchAccounts() {
    const accounts = await fetchAccountsApi();
    set((state) => ({
      ...state,
      accounts,
      accountById: Object.fromEntries(
        accounts.map((account) => [account.id, account]),
      ),
      fundingAccount: accounts.find(isFundingAccount),
      tradingAccount: accounts.find(isTradingAccount),
    }));
  },
  fetchTransactionsHistory: async (queryParams) => {
    const transactions = await fetchTransactionsHistoryApi(
      queryParams,
    );
    set((state) => ({
      ...state,
      transactions: transactions,
    }));
  },
}));
