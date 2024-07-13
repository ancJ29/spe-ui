import BN from "@/common/big-number";
import { STATUS_COLORS } from "@/common/configs";
import { TransactionType } from "@/common/enums";
import useTranslation from "@/hooks/useTranslation";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { useAssetStore } from "@/store/assets";
import { Asset } from "@/ui/Asset/Asset";
import { NoDataRecord } from "@/ui/NoData";
import NumberFormat from "@/ui/NumberFormat";
import { Badge, Box, Table, TableData, Title } from "@mantine/core";
import { useEffect, useMemo } from "react";

export function SwapRecords() {
  const t = useTranslation();
  const { transactions } = useTradeStorageInfo();
  useEffect(() => {
    useAssetStore.getState().fetchTransactionsHistory({
      type: TransactionType.SWAP,
    });
  }, []);

  const tableData: TableData = useMemo(() => {
    return {
      head: [
        "Coin Received",
        "Amount Received",
        "Coin Paid",
        "Amount Paid",
        "Exchange Rate",
        "Time",
        "Status",
      ].map((el) => t(el)),
      body: transactions
        .filter((el) => el.type === TransactionType.SWAP)
        .map((row) => {
          return [
            <>
              <Asset asset={row.toAsset} />
            </>,
            <>
              <Title order={6} fz={12}>
                {row.toAmount}
              </Title>
            </>,
            <>
              <Asset asset={row.asset} />
            </>,
            <>
              <Title order={6} fz={12}>
                <NumberFormat decimalPlaces={8} value={row.amount} />
              </Title>
            </>,
            <>
              <Title order={6} fz={12}>
                <NumberFormat
                  decimalPlaces={8}
                  value={
                    row.toAsset === "USDT"
                      ? BN.div(row.toAmount, row.amount)
                      : BN.div(row.amount, row.toAmount)
                  }
                />
              </Title>
            </>,
            <>
              <Title order={6} fz={12}>
                {new Date(row.updatedAt).toLocaleString()}
              </Title>
            </>,
            <>
              {row.status ? (
                <Badge color={STATUS_COLORS[row.status]}>
                  {row.status}
                </Badge>
              ) : (
                "-"
              )}
            </>,
          ];
        }),
    };
  }, [t, transactions]);

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
      </Table.ScrollContainer>
    </Box>
  );
}
