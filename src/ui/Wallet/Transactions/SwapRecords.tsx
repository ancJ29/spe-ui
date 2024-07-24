import BN from "@/common/big-number";
import { STATUS_COLORS } from "@/common/configs";
import { TransactionType } from "@/common/enums";
import useTranslation from "@/hooks/useTranslation";
import { assetStore } from "@/store/assets";
import { Asset } from "@/ui/Asset/Asset";
import NumberFormat from "@/ui/NumberFormat";
import { NoDataRecord } from "@/ui/SPEMisc";
import { Badge, Box, Table, TableData, Title } from "@mantine/core";
import { useEffect, useMemo } from "react";

export function SwapRecords() {
  const t = useTranslation();
  const { transactions } = assetStore();
  useEffect(() => {
    assetStore.getState().fetchTransactionsHistory({
      type: TransactionType.SWAP,
    });
  }, []);

  const tableData: TableData = useMemo(() => {
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
