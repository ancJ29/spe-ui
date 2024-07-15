import BN from "./big-number";
import { AccountType, OrderSide } from "./enums";

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
  return {
    max:
      side === OrderSide.BUY ? BN.div(freeAmount, price) : freeAmount,
    min: 0,
  };
}
