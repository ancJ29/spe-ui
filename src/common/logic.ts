import BN from "./big-number";
import { AccountType, OrderSide } from "./enums";
import { SPENumber } from "./types";

export function isTradingAccount(account: {
  type: AccountType;
  isFunding: boolean;
}) {
  if (account.type === AccountType.MAIN) {
    return !account.isFunding;
  }
  return false;
}

export function isFundingAccount(account: {
  type: AccountType;
  isFunding: boolean;
}) {
  if (account.type === AccountType.MAIN) {
    return account.isFunding;
  }
  return false;
}

export function maxVolume(
  freeAmount: number,
  price: number,
  side: OrderSide,
) {
  return Number(side === OrderSide.BUY ? BN.div(freeAmount, price) : freeAmount);
}

export function profit(
  entryPrice: SPENumber,
  markPrice: SPENumber,
  volume: SPENumber,
  side: OrderSide,
  fee: SPENumber = 0,
) {
  /*
    futures:
      entry
        BUY 1BTC@Price10,000
          value = $10,000
          leverage = 10
          locked $10,000 / 10 = %1,000
          borrow $9,000

        entryValue = entryPrice * volume
        entryCommission = entryValue * commissionRate
        maintenanceMargin = entryValue / leverage
        borrowValue = entryValue - maintenanceMargin
      funding
        fundingFee = borrowValue * fundingRate
        fundingFee = entryValue * fundingRate
      close
        closeValue = closePrice * volume
        entryCommission = closeValue * commissionRate

      unrealizedPnL = ...
      realizedPnL =
          closeValue
          - entryValue
          - entryCommission
          - closeCommission
          - fundingFee x days x 3

  */
  return BN.add(
    fee,
    BN.mul(
      BN.sub(markPrice, entryPrice),
      volume,
      side === OrderSide.BUY ? 1 : -1,
    ),
  );
}
