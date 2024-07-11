import bigNumber from "@/common/big-number";
import { CoinType } from "./balance";

export type SWAP_SIDE = "BUY" | "SELL";
export type SWAP_SYMBOL = "ETHUSDT" | "BNBUSDT" | "BTCUSDT" | "ETH_USDT_SPOT" | "BTC_USDT_SPOT";
export type MarketPrice = {
  "BTC_USDT_SPOT": number,
  "ETHUSDT": number,
  "BNBUSDT": number,
  "BTCUSDT": number,
  "ETH_USDT_SPOT": number
};

export const swapSymbols: SWAP_SYMBOL[] = [
  "BNBUSDT", "ETHUSDT", "BTCUSDT"
];

export const baseSymbols: CoinType[] = [
  "BTC", "ETH"
];

export const pairSymbol: CoinType = "USDT";


export const CoinsAsName:Record<CoinType, CoinType> = {
  BTC: "BTC",
  ETH: "ETH",
  USDT: "USDT"
};

export const swapSides: SWAP_SIDE[] = [
  "BUY", "SELL"
];


export const SwapSideAsName:Record<SWAP_SIDE, SWAP_SIDE> = {
  BUY: "BUY",
  SELL: "SELL"
};

export function convertCoinToCoinUsingRate(_baseCoin: string, _pairCoin: string, marketPrices: MarketPrice) {
  const coinBase1 = `${_baseCoin}${_pairCoin}`;
  const coinBase2 = `${_pairCoin}${_baseCoin}`;
    
  const baseValue1 = marketPrices[coinBase1 as SWAP_SYMBOL];
  const baseValue2 = marketPrices[coinBase2 as SWAP_SYMBOL];

  const baseCoin = baseValue1 ? _baseCoin : _pairCoin;
  const pairCoin = baseValue1 ? _pairCoin : _baseCoin;

  const baseValue = baseValue1 ?? baseValue2;
  const pairValue = bigNumber.div(1, baseValue);
  return {
    baseCoin,
    pairCoin,
    baseValue,
    pairValue
  };
}
