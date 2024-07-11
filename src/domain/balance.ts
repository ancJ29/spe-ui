import btc from "@/assets/images/coins/BTC.svg";
import eth from "@/assets/images/coins/ETH.svg";
import usdt from "@/assets/images/coins/usdt.svg";

import { AccountNameType } from "./account";
export type CoinType = "USDT" | "BTC" | "ETH";
export type CHAIN = "Bitcoin" | "Ethereum" | "Binance Smart Chain"; 
export type TRANSACTION_TYPE = "DEPOSIT" | "WITHDRAW" | "TRANSFER" | "REALIZED_PNL" | "FUNDING_FEE" | "COMMISSION_FEE" | "LIQUIDATION_CLEARANCE" | "REFERRAL_KICKBACK"
export type ModalMode = "DEPOSIT" | "SWAP" | "TRANSFER" | "WITHDRAW" | "ADDRESS";

export type BalanceOverview = {
  totalInBtc: string 
  totalInUsd: string
};

export type BalanceInfo = {
  accountId: string 
  name: AccountNameType
  coin: string
  amount: string
  locked: string
};

export type Balance = {
  balances: BalanceInfo[]
  overview: Record<string | "all", BalanceOverview>
};


export const iconsByCoin: Record<CoinType, string> = {
  BTC: btc,
  ETH: eth,
  USDT: usdt
};

export const textByCoin: Record<CoinType, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  USDT: "TetherUS"
};

export const chainByCoin: Record<CoinType, CHAIN> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  USDT: "Binance Smart Chain"
};

export const DepositCoinsListed: {coin: CoinType, chain: CHAIN, icon: string, options?: {value: string, label: string, icon: string}}[] = [
  {
    chain: "Ethereum",
    coin: "ETH",
    icon: eth,
  },
  {
    chain: "Bitcoin",
    coin: "BTC",
    icon: btc
  },
  {
    chain: "Binance Smart Chain",
    coin: "USDT",
    icon: usdt
  },
];

export type SWAP_MODE = "oneToOne" | "oneToMany" | "manyToMany" | "manyToOne";

