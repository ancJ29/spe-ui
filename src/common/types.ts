import { z } from "zod";
import {
  AccountType,
  OrderSide,
  OrderStatus,
  OrderType,
  TransactionStatus,
  TransactionType,
} from "./enums";
import {
  applicationFooterSchema,
  applicationSchema,
  authenticationPayloadSchema,
  userConfigSchema,
} from "./schema";

export type GenericObject = Record<string, unknown>;

export type SPENumber = string | number;

export enum Side {
  BUY = "BUY",
  SELL = "SELL",
}

export type MarketInformation = {
  symbol: string;
  markPrice: number;
  indexPrice: number;
  lastPrice: number;
  change: number;
  percent: number;
  high: number;
  low: number;
  volume: number;
  fundingRate: number;
  turnOver: number;
  nextFundingTime: number;
  openInterest: number;
};

export type SymbolConfig = {
  name: string;
  symbol: string;
  description: string;
  minPrice: string;
  maxPrice: string;
  tickSize: string;
  minVolume: string;
  maxVolume: string;
  volumeStepSize: string;
  minValue: string;
  maxValue: string;
  baseAssetPrecision: number;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  isSpot: boolean;
  isFuture: boolean;
  defaultLeverage: string;
};

export type Account = {
  id: string;
  name: string;
  isFunding: boolean;
  isCopyMaster: boolean;
  type: AccountType;
};

export type UserConfig = z.infer<typeof userConfigSchema>;

export type BalanceOverview = {
  all: {
    totalInUsd: string;
    totalInBtc: string;
  };
  [key: string]: {
    totalInUsd: string;
    totalInBtc: string;
  };
};

// "BTC_USDT_SPOT": number,
export type MarketPrice = Record<string, number>;

export type Position = {
  // symbol: string;
  // volume: string;
  // side: OrderSide;
  // entryPrice: string;
  // liquidationPrice?: string;
  // margin?: string;
  // marginLevel?: string;
  // unRealizedPnl?: string;
  // realizedPnl?: string;
  // closedVolume?: string;
  // maxOpenInterest?: string;
  // accountId: string;
  positionId: string;
  symbol: string;
  side: OrderSide;
  volume: number;
  closedVolume: number;
  averageClosePrice: number;
  maxOpenInterest: number;
  fee: number;
  entryPrice: number;
  markPrice: number;
  takeProfitPrice: number;
  stopLossPrice: number;
  trailingStop: number;
  liquidationPrice: number;
  leverage: number;
  margin: number;
  marginLevel: number;
  accumulatedFee: number;
  realizedPnl: number;
  unRealizedPnl: number;
  createdAt: number;
  closedAt?: number;
}

export type Order = {
  symbol: string;
  orderId: string;
  type: OrderType;
  status: OrderStatus;
  side: OrderSide;
  volume: string;
  filled?: string;
  avgPrice?: string;
  price?: string;
  reduceOnly?: boolean;
  postOnly?: boolean;
  createdAt: number;
};

export type Trade = {
  symbol: string;
  tradeId: string;
  volume?: string;
  side: OrderSide;
  price?: string;
  fee?: string;
  isMaker?: boolean;
  createdAt: number;
};

export type Balance = {
  accountId: string;
  name: string;
  coin: string;
  coinName: string;
  amount: string;
  usdValue: string;
  btcValue: string;
  locked: string;
  lockedUsdValue: string;
  lockedBtcValue: string;
  equity: string;
  unRealizedPnl: string;
  margin: string;
  availableMargin: string;
};

export type SPEOrderBook = Record<
  string,
  {
    a: number[][];
    b: number[][];
  }
>;

export type Application = z.infer<typeof applicationSchema>;

export type ApplicationFooter = z.infer<
  typeof applicationFooterSchema
>;

export type { Menu } from "./schema";

// https://binance-docs.github.io/apidocs/futures/en/#kline-candlestick-data
export type KLine = [
  number, // 1499040000000,      // Open time
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

export type AuthenticationPayload = z.infer<
  typeof authenticationPayloadSchema
>;

export type SpeTransaction = {
  id: string;
  accountId: string;
  type: TransactionType;
  status: TransactionStatus;
  from: string;
  to: string;
  asset: string;
  toAsset: string;
  amount: string;
  toAmount: string;
  jpyAmount: string;
  createdAt: number;
  updatedAt: number;
};

export type TradeList = {
  price: string;
  volume: string;
  side: Side;
  timestamp: number;
};
