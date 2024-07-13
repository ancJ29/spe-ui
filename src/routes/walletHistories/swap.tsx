import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { TableRecordsSwap } from "@/ui/Wallet";
import { useEffect } from "react";

export default function Page() {
  const { reloadAll, fetchTransactionsHistory, transactions } =
    useTradeStorageInfo();
  useEffect(() => {
    fetchTransactionsHistory({
      type: ["TRANSFER"],
      accountId: "10142657272871527001726",
    }).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <>
      <TableRecordsSwap />
    </>
  );
}
