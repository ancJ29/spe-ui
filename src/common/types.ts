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

export type CopyPosition = Position & {
  followerAverageEntryPrice: number;
  followerVolume: number;
  followerMargin: number;
  followerFee: number;
}

export type CopyOrder = Order & {
  totalFollowers: number;
}

export type FollowerInformation = {
  accountId: string;
  uid: string;
  invested: number;
  current: number;
  settled: number;
  unSettled: number;
  totalCopyPositions: number;
  unrealizedPnl: number;
  realizedPnl: number;
  followFrom: number;
  remark?: string;
  pausedByMaster?: boolean;
};

export type Position = {
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
};

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
    T?: number;
    last?: number;
    lastUpdated?: number;
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

export type OpenTrades = {
  openOrders: Record<string, number>;
  openPositions: Record<string, number>;
};

export type CopyMasterDetail = {
  imageUrl: string;
  name: string;
  publicProfile: boolean;
  shareHistory: boolean;
  minAmount: number;
  maxAmount: number;
  bio: string;
  profitSharing: {
    total: number;
    settled: number;
    unSettled: number;
  };
  promoters: number;
  followers: {
    current: number;
    max: number;
    cum: number;
    aum: number;
  };
  shares: {
    master: number,
    promoter: number,
  };
}

export type CopyMasterSetting = {
  imageUrl: string;
  name: string;
  bio: string;
  maxAmount: number;
  minAmount: number;
  maxFollowers: number;
  shareHistory: boolean;
  publicProfile: boolean;
};
