import { ROWS_PER_PAGE } from "@/common/configs";
import { OrderSide } from "@/common/enums";
import { positionMargin } from "@/common/logic";
import useTranslation from "@/hooks/useTranslation";
import { fetchMasterCopyOrders } from "@/services/apis";
import logger from "@/services/logger";
import { CopyOrder } from "@/types";
import {
  NoDataRecord,
  SPETableDateTime,
  SPETableHeader,
  SPETableNumber,
  SPETableSide,
  SPETableSymbol,
} from "@/ui/SPEMisc";
import { Box, Button, Flex, Table, TableData } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

export default function MasterOrders() {
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
    fetchMasterCopyOrders(cursor, limit, reverse).then((data) => {
      logger.debug(
        "fetchMasterCopyOrders\n",
        data.map((el) => new Date(el.createdAt)).join("\n "),
      );
      logger.debug("fetchMasterCopyOrders\n", data.length, limit);
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
      body: orders.slice(from, from + ROWS_PER_PAGE).map((order) => {
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
