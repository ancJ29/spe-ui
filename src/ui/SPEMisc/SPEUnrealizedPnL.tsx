import { profit } from "@/common/logic";
import tradeStore from "@/store/trade";
import { useMemo } from "react";
import { SPETableNumber } from "./SPETableNumber";

export function SPEUnrealizedPnL({
  position,
}: {
  position: {
    symbol: string;
    side: string;
    volume: number;
    entryPrice: number;
    fee: number;
  };
}) {
  const { marketInformation } = tradeStore();
  const unRealizedPnl = useMemo(() => {
    return profit(
      position.entryPrice,
      marketInformation[position.symbol]?.markPrice || 0,
      position.volume,
      position.side,
      position.fee,
    );
  }, [
    marketInformation,
    position.entryPrice,
    position.fee,
    position.side,
    position.symbol,
    position.volume,
  ]);
  return (
    <>
      <SPETableNumber value={unRealizedPnl} />
    </>
  );
}
