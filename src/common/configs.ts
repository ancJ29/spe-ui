export const DEFAULT_LEVERAGE = 20;

// cspell: disable
export const SYMBOL_MAP = {
  BINANCE: {
    BTC_USDT_SPOT: "BTCUSDT",
    ETH_USDT_SPOT: "ETHUSDT",
    BTCUSDT: "BTCUSDT",
    ETHUSDT: "ETHUSDT",
    BNBUSDT: "BNBUSDT",
  } as Record<string, string>,
};

export const FEE = {
  // https://www.binance.com/en/fee/schedule
  SPOT: {
    MAKER: 0.001,
    TAKER: 0.001,
  },
  // https://www.binance.com/en/fee/futureFee
  FUTURE: {
    MAKER: 0.0002,
    TAKER: 0.0005,
  },
};
