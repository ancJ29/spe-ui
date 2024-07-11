import { z } from "zod";
import { applicationFooterSchema, applicationSchema } from "./schema";

export type GenericObject = Record<string, unknown>;

export type SPENumber = string | number;

export enum Side {
  BUY = "BUY",
  SELL = "SELL",
}

export type Balance = {
  accountId: string;
  name: string;
  coin: string;
  amount: string;
  locked: string;
};

export type SPEOrderBook = Record<
  string,
  {
    a: [number, number][];
    b: [number, number][];
  }
>;

export type Application = z.infer<typeof applicationSchema>;

export type ApplicationFooter = z.infer<
  typeof applicationFooterSchema
>;

export type { Menu } from "./schema";

export type SymbolInformation = {
  symbol: string;
  markPrice: number;
  indexPrice: number;
  lastPrice: number;
  high: number;
  low: number;
  volume: number;
  fundingRate: number;
  turnOver: number;
  nextFundingTime: number;
  openInterest: number;
};

// https://binance-docs.github.io/apidocs/futures/en/#kline-candlestick-data
export type KLine = [
  number,// 1499040000000,      // Open time
  string, // "0.01634790",       // Open
  string, // "0.80000000",       // High
  string, // "0.01575800",       // Low
  string, // "0.01577100",       // Close
  string, // "148976.11427815",  // Volume
  number, // 1499644799999,      // Close time
  string, // "2434.19055334",    // Quote asset volume
  number, // 308,                // Number of trades
  string, // "1756.87402397",    // Taker buy base asset volume
  string, // "28.46694368",      // Taker buy quote asset volume
  string, // "17928899.62484339" // Ignore.
][];
