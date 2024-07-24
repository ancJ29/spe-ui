import { useMemo } from "react";
import { useLocation } from "react-router-dom";
export type CopyTradeModeType = "1" | "3";
export type CopyTradeType = {
  isMaster: boolean;
  isNormal: boolean;
  isElse: boolean;
  type: CopyTradeModeType;
};
export function useCopyTradeMode() {
  const location = useLocation();
  const info = useMemo<CopyTradeType>(() => {
    const query = new URLSearchParams(location.search);
    const type = query.get("type") as CopyTradeModeType;
    const isMaster = query.get("type") === "1";
    const isNormal = query.get("type") === "3";
    const isElse = !isMaster && !isNormal;
    return {
      isMaster,
      isNormal,
      isElse,
      type: type,
    };
  }, [location]);
  return {
    type: info,
  };
}
