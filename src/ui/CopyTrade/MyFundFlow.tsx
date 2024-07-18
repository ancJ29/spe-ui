import { useCopyTradeMode } from "@/hooks/useCopyTradeMode";
import { TableCopyTradeTransaction, TableCopyTradeMasterTransaction } from "./Tables";

export function MyFundFlow() {
  const { type } = useCopyTradeMode();
  return (
    <>
      {type.isMaster && <TableCopyTradeMasterTransaction />}
      {(type.isNormal || type.isElse) && <TableCopyTradeTransaction/>}
    </>
  );
}
