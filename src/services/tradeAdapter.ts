import { TradeStorageService } from "@/application/ports";
import { DISPLAY_ORDERS } from "@/common/configs";
import { useAssetStore } from "@/store/assets";

export function useTradeStorageInfo(): TradeStorageService {
  const store = useAssetStore();

  // Memo: funding account is always on top
  const accounts = store.accounts.sort((a) => a.isFunding ? -1 : 1);
  const balances = store.balances.balances;
  balances.sort((a, b) => {
    return (DISPLAY_ORDERS[a.coin] || 0) - (DISPLAY_ORDERS[b.coin] || 0);
  });

  const fundingAccount = store.accounts.find((account) => account.isFunding);
  const tradingAccount = store.accounts.find((account) => !account.isFunding && !account.isCopyMaster);
  const fundingBalances = balances.filter((balance) => balance.accountId === fundingAccount?.id || "");

  return {
    accounts,
    balances,
    fundingAccount,
    tradingAccount,
    fundingBalances,
    accountById: Object.fromEntries(accounts.map((account) => [account.id, account])),
    overview: store.balances.overview,
    transactions: store.transactions,
    marketPrices: store.marketPrices,
  };
}
