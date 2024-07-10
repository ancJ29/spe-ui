import { CoinType } from "./balance";

export type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER" | "REALIZED_PNL" | "FUNDING_FEE" | "COMMISSION_FEE" | "LIQUIDATION_CLEARANCE" | "REFERRAL_KICKBACK";
export type StatusTransaction = "PENDING" | "PROCESSING" | "DONE" | "FAILED";

export type Transaction = {
  id: string
  accountId: string
  asset: CoinType
  type: TransactionType
  amount: number
  fee: number
  status: StatusTransaction
  from: string
  to: string
  txId: string
  createdAt: number
  updatedAt: number
};
