import { SpotTradeFormulaService } from "@/application/ports";
import bigNumber from "@/common/big-number";
import { assetStore } from "@/store/assets";
import tradeStore from "@/store/trade";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

interface TypePriceOfTrade {
  base: string;
  quote: string;
  getAvailableBalanceByToken: (token: string) => string;
}
export function usePricesOfTrade(): TypePriceOfTrade {
  const store = assetStore();
  const { base, quote } = useParams();
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
    base: base as string,
    quote: quote as string,
    getAvailableBalanceByToken,
  };
}

export function useSpotTradeStorage(): SpotTradeFormulaService {
  const { base, quote, getAvailableBalanceByToken } =
    usePricesOfTrade();
  const { marketPrices } = tradeStore();

  const prices = useMemo(() => {
    const usdtAvailable = getAvailableBalanceByToken(quote);
    const btcAvailable = getAvailableBalanceByToken(base);
    return {
      quoteAvailable: usdtAvailable,
      baseAvailable: btcAvailable,
    };
  }, [base, getAvailableBalanceByToken, quote]);

  const lastPrices = useMemo(() => {
    const _kSpot = `${base}_${quote}`;
    return {
      spot: marketPrices[`${_kSpot}_SPOT`],
      future: marketPrices[_kSpot],
    };
  }, [marketPrices, base, quote]);

  return {
    base,
    quote,
    ...prices,
    lastPrices,
    getAvailableBalanceByToken,
    orderPrice(orderPrice, qty, isBuying) {
      return bigNumber.TradeFormula.SPOT_LIMIT.orderPrice(
        orderPrice,
        qty,
        prices.quoteAvailable,
        prices.baseAvailable,
        isBuying,
      );
    },
    orderValue(value, orderPrice, isBuying) {
      return bigNumber.TradeFormula.SPOT_LIMIT.orderValue(
        value,
        orderPrice,
        prices.quoteAvailable,
        prices.baseAvailable,
        isBuying,
      );
    },
    percentQty(percent, orderPrice, isBuying) {
      return bigNumber.TradeFormula.SPOT_LIMIT.percentQty(
        percent,
        prices.quoteAvailable,
        prices.baseAvailable,
        orderPrice,
        isBuying,
      );
    },
    qty(qty, orderPrice, isBuying) {
      return bigNumber.TradeFormula.SPOT_LIMIT.qty(
        qty,
        orderPrice,
        prices.quoteAvailable,
        prices.baseAvailable,
        isBuying,
      );
    },
  };
}
