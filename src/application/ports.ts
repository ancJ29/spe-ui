import { DepositAddressFormData, DepositAddressPayload, DepositFormData, GetAccountsFormData, SuccessPayload, TransactionsHistoryFormData } from "@/types";
import { Account } from "../domain/account";
import { Balance } from "../domain/balance";

export interface TradeStorageService {
  depositAddress: string
  balances: Balance
  accounts: Account[]
  initialAll(): Promise<void>
  fetchTransactionsHistory(queryParams: TransactionsHistoryFormData): Promise<void>
}

export interface DepositService {
  getDepositAddress(formData: DepositAddressFormData): Promise<unknown>
  tryDeposit(formData: DepositFormData): Promise<unknown> 
}

export interface AccountService {
  getAccounts(formData: GetAccountsFormData): Promise<unknown>
}

export interface BalanceService {
  setBalances(): Promise<unknown>
}


