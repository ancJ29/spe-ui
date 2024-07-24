import BN from "@/common/big-number";
import { ROWS_PER_PAGE, STATUS_COLORS } from "@/common/configs";
import { TransactionType } from "@/common/enums";
import useSPEPagination from "@/hooks/usePagination";
import useTranslation from "@/hooks/useTranslation";
import { fetchTransactionsHistoryApi } from "@/services/apis";
import { Asset } from "@/ui/Asset/Asset";
import NumberFormat from "@/ui/NumberFormat";
import { NoDataRecord } from "@/ui/SPEMisc";
import {
  Badge,
  Box,
  Button,
  Flex,
  Table,
  TableData,
  Title,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useCallback, useMemo } from "react";

export function SwapRecords() {
  const t = useTranslation();

  const fetch = useCallback(
    (cursor: string, limit: number, reverse: boolean) => {
      return fetchTransactionsHistoryApi({
        type: TransactionType.SWAP,
        cursor,
        limit,
        reverse,
      });
    },
    [],
  );
  const {
    data: transactions,
    haveNextPage,
    reverse,
    havePreviousPage,
    setCursor,
    setHaveNextPage,
    setHavePreviousPage,
  } = useSPEPagination(fetch);

  const tableData: TableData = useMemo(() => {
    const from = reverse ? 1 : 0;
    return {
      head: [
        "Time",
        "Coin Received",
        "Amount Received",
        "Coin Paid",
        "Amount Paid",
        "Exchange Rate",
        "Status",
      ].map((el) => t(el)),
      body: transactions
        .slice(from, from + ROWS_PER_PAGE)
        .filter((el) => el.type === TransactionType.SWAP)
        .map((row) => {
          return [
            <Title order={6} fz={12} key={`${row.id}.time`}>
              {new Date(row.updatedAt).toLocaleString()}
            </Title>,
            <Asset asset={row.toAsset} key={`${row.id}.to`} />,
            <Title order={6} fz={12} key={`${row.id}.toAmount`}>
              {row.toAmount}
            </Title>,
            <Asset asset={row.asset} key={`${row.id}.from`} />,
            <Title order={6} fz={12} key={`${row.id}.fromAmount`}>
              <NumberFormat decimalPlaces={8} value={row.amount} />
            </Title>,
            <Title order={6} fz={12} key={`${row.id}.rate`}>
              <NumberFormat
                decimalPlaces={8}
                value={
                  row.toAsset === "USDT"
                    ? BN.div(row.toAmount, row.amount)
                    : BN.div(row.amount, row.toAmount)
                }
              />
            </Title>,
            row.status ? (
              <Badge
                key={`${row.id}.status`}
                color={STATUS_COLORS[row.status]}
              >
                {row.status}
              </Badge>
            ) : (
              <span key={`${row.id}.status`}>-</span>
            ),
          ];
        }),
    };
  }, [reverse, t, transactions]);

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
        <>{transactions.length === 0 && <NoDataRecord />}</>
        {haveNextPage || havePreviousPage ? (
          <Flex justify={"center"} mt={20} gap={10}>
            {" "}
            <Button
              size="xs"
              disabled={!havePreviousPage}
              onClick={() => {
                setHaveNextPage(true);
                setCursor({
                  cursor: transactions[0].id,
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
                  cursor: transactions[transactions.length - 1].id,
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
