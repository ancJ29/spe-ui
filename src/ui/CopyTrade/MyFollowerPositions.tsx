import { OrderSide } from "@/common/enums";
import useSPEInterval from "@/hooks/useSPEInterval";
import useSyncData from "@/hooks/useSyncData";
import { fetchOpenCopyPositions } from "@/services/apis";
import tradeStore from "@/store/trade";
import { CopyPosition } from "@/types";
import { NoDataRecord } from "@/ui/NoData";
import { ONE_MINUTE } from "@/utils";
import {
  Box,
  Flex,
  Pagination,
  Table,
  TableData,
} from "@mantine/core";
import { useCallback, useMemo } from "react";
import { SPETableHeader, SPETableSymbol } from "../SPEMisc";

export function MyFollowerPositions() {
  const fetch = useCallback(() => fetchOpenCopyPositions(), []);
  const positions = useSyncData<CopyPosition[]>(fetch);
  useSPEInterval(() => {
    tradeStore.getState().loadAllMarketInformation();
  }, ONE_MINUTE);
  const tableData: TableData = useMemo(() => {
    return {
      head: [
        "Time",
        "Follower UID",
        "Positions",
        "Investment (USDT) / Current Assets (USDT)",
        "Settled Profit Sharing / Unsettled Profit Sharing",
        "Total PnL (USDT/%) / Unrealized PnL (USDT/%)",
        "Remark",
        "Action",
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
        ];
      }),
    };
  }, [positions]);

  return (
    <>
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
          <>{tableData.body?.length === 0 && <NoDataRecord />}</>
          <Flex justify={"center"} mt={20}>
            <Pagination total={10} />
          </Flex>
        </Table.ScrollContainer>
      </Box>
    </>
  );
}
