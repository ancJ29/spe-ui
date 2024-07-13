import { Balance, BalanceOverview, MarketPrice } from "@/common/types";
import { Transaction } from "@/domain/transaction";
import { DepositAddressFormData, GetAccountsFormData, TransactionsHistoryFormData } from "@/types";
import { Account } from "../domain/account";

export interface TradeStorageService {
  depositAddress: string
  balances: Balance[]
  overview: BalanceOverview
  fundingAccount?: Account
  fundingBalances: Balance[]
  accounts: Account[]
  transactions: Transaction[]
  marketPrices: MarketPrice
  reloadAll(): Promise<void>
  fetchTransactionsHistory(queryParams: TransactionsHistoryFormData): Promise<void>
}

export interface DepositService {
  getDepositAddress(formData: DepositAddressFormData): Promise<unknown>
}

export interface AccountService {
  getAccounts(formData: GetAccountsFormData): Promise<unknown>
}
