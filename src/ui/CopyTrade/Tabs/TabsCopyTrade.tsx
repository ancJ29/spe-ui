import { useCopyTradeMode } from "@/hooks/useCopyTradeMode";
import { CopyTabsInfo } from "./CopyTabsInfo";
import { CopyTabsMasterInfo } from "./CopyTabsMasterInfo";

export function TabsCopyTrade() {
  const { type } = useCopyTradeMode();
  return (
    <>
      {type.isMaster && <CopyTabsMasterInfo />}
      {(type.isNormal || type.isElse) && <CopyTabsInfo />}
    </>
  );
}
