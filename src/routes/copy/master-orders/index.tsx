import { OrderSide } from "@/common/enums";
import { positionMargin } from "@/common/logic";
import useSPEPagination from "@/hooks/useSPEPagination";
import { fetchMasterCopyOrders } from "@/services/apis";
import {
  NoDataRecord,
  SPEPagination,
  SPETableDateTime,
  SPETableHeader,
  SPETableNumber,
  SPETableSide,
  SPETableSymbol,
} from "@/ui/SPEMisc";
import { Box, Table, TableData } from "@mantine/core";
import { useCallback, useMemo } from "react";

export default function MasterOrders() {
  const fetch = useCallback(
    (cursor: string, limit: number, reverse: boolean) => {
      return fetchMasterCopyOrders(cursor, reverse, limit);
    },
    [],
  );

  const {
    data: orders,
    havePreviousPage,
    haveNextPage,
    goPrev,
    goNext,
  } = useSPEPagination(fetch);

  const tableData: TableData = useMemo(
    () => ({
      head: [
        "Contract",
        "Side",
        "Price (USDT)",
        "Volume",
        "Margin (USDT)",
        "Realized PnL",
        "Followers",
        "Time",
      ].map((label, idx) => (
        <SPETableHeader key={idx} label={label} />
      )),
      body: orders.map((order) => {
        const color = order.side === OrderSide.BUY ? "green" : "red";
        return [
          <SPETableSymbol
            color={color}
            key={`${order.orderId}.symbol`}
            symbol={order.symbol}
          />,
          <SPETableSide
            color={color}
            key={`${order.orderId}.side`}
            side={order.side}
          />,
          <SPETableNumber
            key={`${order.orderId}.price`}
            value={order.avgPrice}
          />,
          <SPETableNumber
            key={`${order.orderId}.volume`}
            value={order.volume}
          />,
          <SPETableNumber
            key={`${order.orderId}.margin`}
            value={positionMargin(
              order.avgPrice || 0,
              order.volume,
              order.leverage || 1,
            )}
          />,
          <SPETableNumber
            key={`${order.orderId}.pnl`}
            value={order.realizedPnl}
          />,
          <span key={`${order.orderId}.followers`}>
            {order.totalFollowers.toLocaleString()}
          </span>,
          <SPETableDateTime
            key={`${order.orderId}.time`}
            time={order.createdAt}
          />,
        ];
      }),
    }),
    [orders],
  );

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
        <>{tableData.body?.length === 0 && <NoDataRecord />}</>
        <SPEPagination
          goPrev={goPrev}
          goNext={goNext}
          havePreviousPage={havePreviousPage}
          haveNextPage={haveNextPage}
        />
      </Table.ScrollContainer>
    </Box>
  );
}
