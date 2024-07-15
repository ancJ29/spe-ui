import { SpotTradeFormulaService } from "@/application/ports";
import bigNumber from "@/common/big-number";
import { assetStore } from "@/store/assets";
import tradeStore from "@/store/trade";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

interface TypePriceOfTrade {
  baseToken: string;
  pairToken: string;
  getAvailableBalanceByToken: (token: string) => string;
}
export function usePricesOfTrade(): TypePriceOfTrade {
  const store = assetStore();
  const { baseToken, pairToken } = useParams();
  const getAvailableBalanceByToken = (token: string) => {
    const balances = store.balances;
    const fundingAccount = store.accounts.find(
      (account) => account.isFunding,
    );
    const fundingBalances = balances.filter(
      (balance) => balance.accountId === fundingAccount?.id || "",
    );
    const balance = fundingBalances.find(
      (bl) =>
        bl.accountId === fundingAccount?.id && bl.coin === token,
    );
    return balance?.amount ?? "";
  };
  return {
    baseToken: baseToken as string,
    pairToken: pairToken as string,
    getAvailableBalanceByToken,
  };
}

export function useSpotTradeStorage(): SpotTradeFormulaService {
  const { baseToken, pairToken, getAvailableBalanceByToken } =
    usePricesOfTrade();
  const { marketPrices } = tradeStore();

  const prices = useMemo(() => {
    const usdtAvailable = getAvailableBalanceByToken(pairToken);
    const btcAvailable = getAvailableBalanceByToken(baseToken);
    return {
      pairTokenAvailable: usdtAvailable,
      baseTokenAvailable: btcAvailable,
    };
  }, [baseToken, getAvailableBalanceByToken, pairToken]);

  const lastPrices = useMemo(() => {
    const _kSpot = `${baseToken}_${pairToken}`;
    return {
      spot: marketPrices[`${_kSpot}_SPOT`],
      future: marketPrices[_kSpot],
    };
  }, [marketPrices, baseToken, pairToken]);

  return {
    baseToken,
    pairToken,
    ...prices,
    lastPrices,
    getAvailableBalanceByToken,
    orderPrice(orderPrice, qty, isBuying) {
      return bigNumber.TradeFormula.SPOT_LIMIT.orderPrice(
        orderPrice,
        qty,
        prices.pairTokenAvailable,
        prices.baseTokenAvailable,
        isBuying,
      );
    },
    orderValue(value, orderPrice, isBuying) {
      return bigNumber.TradeFormula.SPOT_LIMIT.orderValue(
        value,
        orderPrice,
        prices.pairTokenAvailable,
        prices.baseTokenAvailable,
        isBuying,
      );
    },
    percentQty(percent, orderPrice, isBuying) {
      return bigNumber.TradeFormula.SPOT_LIMIT.percentQty(
        percent,
        prices.pairTokenAvailable,
        prices.baseTokenAvailable,
        orderPrice,
        isBuying,
      );
    },
    qty(qty, orderPrice, isBuying) {
      return bigNumber.TradeFormula.SPOT_LIMIT.qty(
        qty,
        orderPrice,
        prices.pairTokenAvailable,
        prices.baseTokenAvailable,
        isBuying,
      );
    },
  };
}
