import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { TableRecordsWithdraw } from "@/ui/Wallet";
import { useEffect } from "react";

export default function Page() {
  const { fetchTransactionsHistory, transactions } =
    useTradeStorageInfo();
  useEffect(() => {
    fetchTransactionsHistory({
      type: ["WITHDRAW"],
      accountId: "10142657272871527001726",
    }).then((res: any) => {
      console.log(res);
    });
  }, []);
  return (
    <>
      <TableRecordsWithdraw />
    </>
  );
}
