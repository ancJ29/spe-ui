import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { DepositService, TradeStorageService } from "./ports";
import { useDeposit } from "@/services/depositAdapter";

export function useAddToDeposit() {
  const storage: TradeStorageService = useTradeStorageInfo();
  const deposit: DepositService = useDeposit();
  async function addToDeposit() {
    deposit.tryDeposit({
      amount: 50,
      chain: "Bitcoin",
      coin: "BTC",
      fromAddress: "",
      txId: "",
      walletAddress: ""
    });
  }
  return {
    addToDeposit
  };
}
