import { useCopyTradeMode } from "@/hooks/useCopyTradeMode";
import { TableCopyTradeHistory } from "./Tables/TableCopyTradeHistory";
import { TableCopyTradeOrderHistory } from "./Tables/TableCopyTradeOrderHistory";
import { Box } from "@mantine/core";

export function CopyHistory() {
  const { type } = useCopyTradeMode();
  return (
    <>
      {type.isMaster && <TableCopyTradeOrderHistory />}
      {(type.isNormal || type.isElse) && <TableCopyTradeHistory />}
    </>
  );
}
