import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { TableRecordsOthers } from "@/ui/Wallet";
import { useEffect } from "react";

export default function Page() {
  const { fetchTransactionsHistory, transactions } = useTradeStorageInfo();
  useEffect(() => {
    fetchTransactionsHistory({
      type: ["TRANSFER"],
      // type: ["TRANSFER", "COMMISSION_FEE", "FUNDING_FEE", "LIQUIDATION_CLEARANCE", "REALIZED_PNL", "REFERRAL_KICKBACK"],
      accountId: "10142657272871527001726"
    }).then((res: any) => {
      console.log(res);
    });
  }, []);
  return (
    <>
      <TableRecordsOthers />
    </>
  );
}
