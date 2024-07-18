import { CopyTradeFollowerMoneyInfo } from "./CopyTradeFollowerMoneyInfo";
import { CopyTradeFollowerMoneyMasterInfo } from "./CopyTradeFollowerMoneyMasterInfo";
import { Box } from "@mantine/core";
import { useCopyTradeMode } from "@/hooks/useCopyTradeMode";

export function CopyTradeInfo() {
  const { type } = useCopyTradeMode();
  return (
    <>
      {type.isMaster && <CopyTradeFollowerMoneyMasterInfo/>}
      {(type.isNormal || type.isElse) && <CopyTradeFollowerMoneyInfo/>}
    </>
  );
}
