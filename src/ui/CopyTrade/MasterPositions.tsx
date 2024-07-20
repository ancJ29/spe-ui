import { OrderSide } from "@/common/enums";
import useSPEInterval from "@/hooks/useSPEInterval";
import useSyncData from "@/hooks/useSyncData";
import { fetchOpenCopyPositions } from "@/services/apis";
import tradeStore from "@/store/trade";
import { CopyPosition } from "@/types";
import { NoDataRecord } from "@/ui/NoData";
import {
  SPETableHeader,
  SPETableMarkPrice,
  SPETableNumber,
  SPETableSide,
  SPETableSymbol,
  SPEUnrealizedPnL,
} from "@/ui/SPEMisc";
import { ONE_MINUTE } from "@/utils";
import { Box, Table, TableData } from "@mantine/core";
import { useCallback, useMemo } from "react";

export function MasterPositions() {
  const fetch = useCallback(() => fetchOpenCopyPositions(), []);
  const positions = useSyncData<CopyPosition[]>(fetch);
  useSPEInterval(() => {
    tradeStore.getState().loadAllMarketInformation();
  }, ONE_MINUTE);

  const tableData: TableData = useMemo(() => {
    return {
      head: [
        "Contract",
        "Side",
        "Master's Qty / Followers' Qty",
        "Entry Price",
        "Mark Price",
        "Masters' Margin (USDT) / Followers' Margin (USDT)",
        "Masters' Unrealized PnL (USDT) / Followers' Unrealized PnL (USDT)",
      ].map((label, idx) => (
        <SPETableHeader key={idx} label={label} />
      )),
      body: positions?.map((position) => {
        const color =
          position.side === OrderSide.BUY ? "green" : "red";
        return [
          <SPETableSymbol
            color={color}
            key={`${position.positionId}.${position.symbol}`}
            symbol={position.symbol}
          />,
          <SPETableSide
            key={`${position.positionId}.side`}
            color={color}
            side={position.side}
          />,
          <Box key={`${position.positionId}.size`}>
            <SPETableNumber value={position.volume} />
            <SPETableNumber value={0} />
          </Box>,
          <SPETableNumber
            key={`${position.positionId}.price`}
            value={position.entryPrice}
          />,
          <SPETableMarkPrice
            key={`${position.positionId}.price`}
            symbol={position.symbol}
          />,
          <Box key={`${position.positionId}.margin`}>
            <SPETableNumber value={position.margin} />
            <SPETableNumber value={0} />
          </Box>,
          <Box key={`${position.positionId}.pnl`}>
            <SPEUnrealizedPnL
              key={`${position.positionId}.unRealizedPnl`}
              position={position}
            />
            <SPETableNumber value={0} />
          </Box>,
        ];
      }),
    };
  }, [positions]);

  return (
    <Box h={"100%"} w={"100%"}>
      <Table.ScrollContainer minWidth={"100%"} h={"100%"}>
        <Table
          data={tableData}
          stickyHeader
          highlightOnHover
          styles={{
            th: {
              whiteSpace: "nowrap",
              fontSize: "12px",
            },
          }}
          classNames={{
            table: "table-sticky-column",
          }}
        />
        {tableData.body?.length === 0 ? <NoDataRecord /> : <></>}
      </Table.ScrollContainer>
    </Box>
  );
}
