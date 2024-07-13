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

export function FiatDepositRecords() {
  const t = useTranslation();
  const { transactions } = useTradeStorageInfo();
  useEffect(() => {
    useAssetStore.getState().fetchTransactionsHistory({
      type: TransactionType.FIAT_DEPOSIT,
    });
  }, []);
  const tableData: TableData = useMemo(() => {
    return {
      head: [
        "Coin",
        "Time",
        "JPY Amount",
        "USDT Amount",
        "Status",
      ].map((el) => t(el)),
      body: transactions
        .filter((el) => el.type === TransactionType.FIAT_DEPOSIT)
        .map((row) => [
          <>
            <Asset asset={row.asset} />
          </>,
          <>
            <Title order={6} fz={12}>
              {new Date(row.updatedAt).toLocaleString()}
            </Title>
          </>,
          <>
            <Title order={6} fz={12}>
              <NumberFormat decimalPlaces={8} value={row.jpyAmount} />
            </Title>
          </>,
          <>
            <Title order={6} fz={12}>
              <NumberFormat decimalPlaces={8} value={row.amount} />
            </Title>
          </>,
          <>
            <Badge color={STATUS_COLORS[row.status]}>
              {row.status}
            </Badge>
          </>,
        ]),
    };
  }, [t, transactions]);

  return (
    <Box h={"100%"} w={"100%"}>
      <Table.ScrollContainer minWidth={"100%"} h={"100%"}>
        <Table
          data={tableData}
          stickyHeader
          highlightOnHover
          verticalSpacing={"xs"}
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
