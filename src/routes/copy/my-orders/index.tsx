import { ROWS_PER_PAGE } from "@/common/configs";
import { OrderSide } from "@/common/enums";
import useTranslation from "@/hooks/useTranslation";
import { fetchCopyOrders } from "@/services/apis";
import { CopyOrder } from "@/types";
import { MasterTrader } from "@/ui/Copy";
import {
  NoDataRecord,
  SPETableHeader,
  SPETableNumber,
  SPETableSymbol,
} from "@/ui/SPEMisc";
import { Box, Button, Flex, Table, TableData } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

export default function MyPositions() {
  const t = useTranslation();
  const [orders, setOrders] = useState<CopyOrder[]>([]);
  const [{ cursor, reverse }, setCursor] = useState({
    cursor: "",
    reverse: false,
  });
  const [haveNextPage, setHaveNextPage] = useState(false);
  const [havePreviousPage, setHavePreviousPage] = useState(false);
  useEffect(() => {
    const limit = ROWS_PER_PAGE + (reverse ? 2 : 1);
    fetchCopyOrders(cursor, limit, reverse).then((data) => {
      reverse
        ? setHavePreviousPage(data.length === limit)
        : setHaveNextPage(data.length === limit);
      setOrders(data);
    });
  }, [cursor, reverse]);

  const tableData: TableData = useMemo(() => {
    const from = reverse ? 1 : 0;
    return {
      head: [
        "Trader",
        "Contract",
        "Price",
        "Volume",
        "Margin",
        "Realized PnL",
      ].map((label, idx) => (
        <SPETableHeader key={idx} label={label} />
      )),
      body: orders.slice(from, from + ROWS_PER_PAGE).map((order) => {
        const color = order.side === OrderSide.BUY ? "green" : "red";
        return [
          <MasterTrader
            key={`${order.orderId}.avatar`}
            name={order.trader?.name}
            avatar={order.trader?.avatar}
          />,
          <SPETableSymbol
            color={color}
            key={`${order.orderId}.symbol`}
            symbol={order.symbol}
          />,
          <SPETableNumber
            key={`${order.orderId}.price`}
            value={order.avgPrice}
          />,
          <SPETableNumber
            key={`${order.orderId}.volume`}
            value={order.filled}
          />,
          <SPETableNumber
            key={`${order.orderId}.margin`}
            value={0}
          />,
          <SPETableNumber key={`${order.orderId}.pnl`} value={0} />,
        ];
      }),
    };
  }, [orders, reverse]);

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
        {haveNextPage || havePreviousPage ? (
          <Flex justify={"center"} mt={20} gap={10}>
            {" "}
            <Button
              size="xs"
              disabled={!havePreviousPage}
              onClick={() => {
                setHaveNextPage(true);
                setCursor({
                  cursor: orders[0].orderId,
                  reverse: true,
                });
              }}
            >
              <IconArrowLeft size={16} /> {t("Previous page")}
            </Button>
            <Button
              size="xs"
              disabled={!haveNextPage}
              onClick={() => {
                setHavePreviousPage(true);
                setCursor({
                  reverse: false,
                  cursor: orders[orders.length - 1].orderId,
                });
              }}
            >
              {t("Next page")} <IconArrowRight size={16} />
            </Button>
          </Flex>
        ) : (
          <> </>
        )}
      </Table.ScrollContainer>
    </Box>
  );
}
