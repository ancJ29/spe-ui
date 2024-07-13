import { TradeStorageService } from "@/application/ports";
import { useFundStore } from "@/store/fund";

export function useTradeStorageInfo(): TradeStorageService {
  const store = useFundStore();

  // Memo: funding account is always on top
  const accounts = store.accounts.sort((a) => a.isFunding ? -1 : 1);
  const balances = store.balances.balances;
  const fundingAccount = store.accounts.find((account) => account.isFunding);
  const fundingBalances = balances.filter((balance) => balance.accountId === fundingAccount?.id || "");

  return {
    accounts,
    balances,
    fundingAccount,
    fundingBalances,
    overview: store.balances.overview,
    depositAddress: store.depositAddress,
    transactions: store.transactions,
    marketPrices: store.marketPrices,
    reloadAll() {
      return store.initial();
    },
    fetchTransactionsHistory(queryParams) {
      return store.fetchTransactionsHistory(queryParams);
    }
  };
}
