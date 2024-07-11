import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { TableRecordsDeposit } from "@/ui/Wallet";
import { useEffect } from "react";

export default function Page() {
  const { fetchTransactionsHistory, transactions } =
    useTradeStorageInfo();
  useEffect(() => {
    fetchTransactionsHistory({
      type: ["DEPOSIT"],
      accountId: "10142657272871527001726",
    }).then((res: any) => {
      console.log(res);
    });
  }, [fetchTransactionsHistory]);
  return (
    <>
      <TableRecordsDeposit />
    </>
  );
}
