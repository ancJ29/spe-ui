import { AccountType } from "./enums";

export function isTradingAccount(account: {
  type: AccountType,
  isFunding: boolean,
}) {
  if (account.type === AccountType.MAIN) {
    return !account.isFunding;
  }
  return false;
}

export function isFundingAccount(account: {
  type: AccountType,
  isFunding: boolean,
}) {
  if (account.type === AccountType.MAIN) {
    return account.isFunding;
  }
  return false;
}
