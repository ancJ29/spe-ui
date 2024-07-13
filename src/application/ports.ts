import { Balance, BalanceOverview, MarketPrice, SpeTransaction } from "@/common/types";
import { DepositAddressFormData, GetAccountsFormData } from "@/types";
import { Account } from "../domain/account";

export interface TradeStorageService {
  balances: Balance[]
  accountById: Record<string, Account>
  overview: BalanceOverview
  fundingAccount?: Account
  tradingAccount?: Account
  fundingBalances: Balance[]
  accounts: Account[]
  transactions: SpeTransaction[]
  marketPrices: MarketPrice
}

export interface DepositService {
  getDepositAddress(formData: DepositAddressFormData): Promise<unknown>
}

export interface AccountService {
  getAccounts(formData: GetAccountsFormData): Promise<unknown>
}