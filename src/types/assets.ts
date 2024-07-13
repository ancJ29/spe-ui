
import { CHAIN, CoinType, TRANSACTION_TYPE } from "@/domain/balance";

type WithdrawInfoFormData = {
  chain: string;
  address: string;
  amount: number;
};

export type WithdrawFormData = {
  coin: CoinType;
  chain: CHAIN;
  address: string;
  amount: number;
  infoBTC: WithdrawInfoFormData;
  infoETH: WithdrawInfoFormData;
  infoUSDT: WithdrawInfoFormData;
};

export type SwapFormData = {
  accountId: string
  symbolFrom: string
  symbolTo: string
  side: string
  volume: number
};

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

export type TransferFormData = {
  coin: CoinType
  amount: number,
  toAccountId: string
  fromAccountId: string
};

export type TransactionsHistoryFormData = {
  type: TRANSACTION_TYPE[],
  accountId: string,
  limit?: number
  cursor?: number
};
