import { OrderSide } from "@/common/enums";
import useSyncData from "@/hooks/useSyncData";
import { fetchCopyOrders } from "@/services/apis";
import { CopyOrder } from "@/types";
import {
  NoDataRecord,
  SPETableHeader,
  SPETableSymbol,
} from "@/ui/SPEMisc";
import {
  Box,
  Flex,
  Pagination,
  Table,
  TableData,
} from "@mantine/core";
import { useCallback, useMemo } from "react";

export default function MasterOrders() {
  const fetch = useCallback(() => fetchCopyOrders(), []);
  const orders = useSyncData<CopyOrder[]>(fetch);

  const tableData: TableData = useMemo(() => {
    return {
      head: [
        "Contract",
        "Time",
        "Price (USDT)",
        "Volume",
        "Margin (USDT)",
        "Realized PnL",
        "Followers",
      ].map((label, idx) => (
        <SPETableHeader key={idx} label={label} />
      )),
      body: orders?.map((order) => {
        const color = order.side === OrderSide.BUY ? "green" : "red";
        return [
          <SPETableSymbol
            color={color}
            key={`${order.orderId}.symbol`}
            symbol={order.symbol}
          />,
        ];
      }),
    };
  }, [orders]);

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
        <Flex justify={"center"} mt={20}>
          <Pagination total={10} />
        </Flex>
      </Table.ScrollContainer>
    </Box>
  );
}
