import { TradeStorageService } from "@/application/ports";
import { useFundStore } from "@/store/fund";

export function useTradeStorageInfo(): TradeStorageService {
  const store = useFundStore();
  return {
    accounts: store.accounts,
    balances: store.balances,
    depositAddress: store.depositAddress,
    transactions: store.transactions,
    marketPrices: store.marketPrices,
    initialAll() {
      return store.initial();
    },
    fetchTransactionsHistory(queryParams) {
      return store.fetchTransactionsHistory(queryParams);
    }
  };
}
