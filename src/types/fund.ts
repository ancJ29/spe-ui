
import { CHAIN, CoinType, TRANSACTION_TYPE } from "@/domain/balance";
export type DepositFormData = {
  fromAddress: string
  txId: string
  walletAddress: string
  amount: number
  coin: CoinType
  chain: CHAIN,
  infoBTC: DepositFormData
  infoETH: DepositFormData
  infoUSDT: DepositFormData
};

export type DepositAddressFormData = {
  coin: CoinType
  chain: CHAIN
};

export type DepositAddressPayload = {
  depositAddress: string
};

export type TransferAssetsFormData = {
  coin: CoinType
  amount: string | number
  fromAccountId: string
  toAccountId: string
};

export type GetAccountsFormData = {
  coin: CoinType
  amount: string | number
  fromAccountId: string
  toAccountId: string
};

export type WithdrawFormData = {
  coin: CoinType
  chain: CHAIN,
  address: string,
  amount: number,
  infoBTC: WithdrawFormData
  infoETH: WithdrawFormData
  infoUSDT: WithdrawFormData
};

export type TransferFormData = {
  coin: CoinType
  amount: number,
  toAccountId: string
  fromAccountId: string
};

export type TransactionsHistoryFormData = {
  type: TRANSACTION_TYPE,
  accountId: string,
  limit?: number
  cursor?: number
}
