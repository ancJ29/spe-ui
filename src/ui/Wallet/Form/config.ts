import { chainByCoin, CoinType } from "@/domain/balance";
import { DepositFormData, WithdrawFormData } from "@/types";

export function convertToDepositFormData(formData: DepositFormData) {
  const k: CoinType = formData.coin;
  const infoKey = k === "BTC" ? "infoBTC" : k === "ETH" ? "infoETH" : "infoUSDT";
  return {
    "fromAddress": formData[infoKey].fromAddress,
    "txId": formData[infoKey].txId,
    "walletAddress": formData[infoKey].walletAddress,
    "amount": formData[infoKey].amount,
    "coin": formData.coin,
    "chain": chainByCoin[formData.coin]
  };
}


export function convertToSwapFormData(formData: DepositFormData) {
  return {
    "accountId": formData.accountId,
    "symbol": `${formData.symbolFrom}${formData.symbolTo}`,
    "side": formData.side,
    "volume": formData.volume
  };
}


export function convertToWithdrawFormData(formData: WithdrawFormData) {
  const k: CoinType = formData.coin;
  const infoKey = k === "BTC" ? "infoBTC" : k === "ETH" ? "infoETH" : "infoUSDT";
  return {
    "coin": formData.coin,
    "chain": chainByCoin[formData.coin],
    "address": formData[infoKey].address,
    "amount": formData[infoKey].amount,
  };
}

export function convertToTransferFormData(formData: WithdrawFormData) {
  return formData;
}
