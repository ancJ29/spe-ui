import BN from "@/common/big-number";
import { STATUS_COLORS } from "@/common/configs";
import { TransactionType } from "@/common/enums";
import useSPEPagination from "@/hooks/useSPEPagination";
import useSPETranslation from "@/hooks/useSPETranslation";
import { fetchTransactions } from "@/services/apis";
import { Asset } from "@/ui/Asset/Asset";
import NumberFormat from "@/ui/NumberFormat";
import { NoDataRecord, SPEPagination } from "@/ui/SPEMisc";
import { Badge, Box, Table, TableData, Title } from "@mantine/core";
import { useCallback, useMemo } from "react";

export function SwapRecords() {
  const t = useSPETranslation();

  const fetch = useCallback(
    (cursor: string, limit: number, reverse: boolean) => {
      return fetchTransactions(
        TransactionType.SWAP,
        limit,
        cursor,
        reverse,
      );
    },
    [],
  );

  const {
    data: transactions,
    havePreviousPage,
    haveNextPage,
    goPrev,
    goNext,
  } = useSPEPagination(fetch);

  const tableData: TableData = useMemo(
    () => ({
      head: [
        "Time",
        "Coin Received",
        "Amount Received",
        "Coin Paid",
        "Amount Paid",
        "Exchange Rate",
        "Status",
      ].map((el) => t(el)),
      body: transactions.map((row) => {
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
    }),
    [t, transactions],
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
        <>{transactions.length === 0 && <NoDataRecord />}</>
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
