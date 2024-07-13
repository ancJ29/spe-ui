export enum AccountType {
  MAIN = "MAIN",
  SUB = "SUB",
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  SWAP = "SWAP",
  REALIZED_PNL = "REALIZED_PNL",
  TRANSFER_IN = "TRANSFER_IN",
  TRANSFER_OUT = "TRANSFER_OUT",
  FIAT_DEPOSIT = "FIAT_DEPOSIT",
  FUNDING_FEE = "FUNDING_FEE",
  COMMISSION_FEE = "COMMISSION_FEE",
  LIQUIDATION_CLEARANCE = "LIQUIDATION_CLEARANCE",
  REFERRAL_KICKBACK = "REFERRAL_KICKBACK",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  FAILED = "FAILED",
}

export enum InternalTaskType {
  DEPOSIT = "DEPOSIT",
  UNLOCK = "UNLOCK",
  WITHDRAW = "WITHDRAW",
  CHECK_AND_LOCK = "CHECK_AND_LOCK",
}

export enum InternalTaskStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  FAILED = "FAILED",
}

export enum OrderTriggerDirection {
  UP = "UP",
  DOWN = "DOWN",
}

export enum OrderTriggerBy {
  MARK = "MARK",
  LAST = "LAST",
  INDEX = "INDEX",
}

export enum OrderSide {
  BUY = "BUY",
  SELL = "SELL",
}

export enum OrderType {
  LIMIT = "LIMIT",
  MARKET = "MARKET",
}

export enum OrderStatus {
  NEW = "NEW",
  PARTIALLY_FILLED = "PARTIALLY_FILLED",
  UN_TRIGGERED = "UN_TRIGGERED",
  REJECTED = "REJECTED",
  PARTIALLY_FILLED_CANCELED = "PARTIALLY_FILLED_CANCELED",
  FILLED = "FILLED",
  CANCELED = "CANCELED",
  TRIGGERED = "TRIGGERED",
  DEACTIVATED = "DEACTIVATED",
}

export enum TimeInForce {
  GTC = "GTC",
  IOC = "IOC",
  FOK = "FOK",
}

export enum HedgeTarget {
  BINANCE = "BINANCE",
  BYBIT = "BYBIT",
  OKX = "OKX",
}
