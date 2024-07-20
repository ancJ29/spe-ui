import { useCopyTradeMode } from "@/hooks/useCopyTradeMode";
import { MaterInformation } from "../MaterInformation";
import { CopyTradeFollowerMoneyInfo } from "./CopyTradeFollowerMoneyInfo";

export function CopyTradeInfo() {
  const { type } = useCopyTradeMode();
  return (
    <>
      {type.isMaster && <MaterInformation />}
      {(type.isNormal || type.isElse) && (
        <CopyTradeFollowerMoneyInfo />
      )}
    </>
  );
}
