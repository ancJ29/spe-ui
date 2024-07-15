import { TransactionType } from "@/common/enums";
import useTranslation from "@/hooks/useTranslation";
import { assetStore } from "@/store/assets";
import { Asset } from "@/ui/Asset/Asset";
import { NoDataRecord } from "@/ui/NoData";
import NumberFormat from "@/ui/NumberFormat";
import { Box, Table, TableData, Title } from "@mantine/core";
import { useEffect, useMemo } from "react";

const TRANSACTION_TYPES = [
  TransactionType.TRANSFER_IN,
  TransactionType.TRANSFER_OUT,
  TransactionType.REALIZED_PNL,
  TransactionType.FUNDING_FEE,
  TransactionType.COMMISSION_FEE,
  TransactionType.LIQUIDATION_CLEARANCE,
  TransactionType.REFERRAL_KICKBACK,
];

export function OtherRecords() {
  const { transactions, accountById } = assetStore();
  const t = useTranslation();

  useEffect(() => {
    assetStore
      .getState()
      .fetchTransactionsHistory({ types: TRANSACTION_TYPES });
  }, []);

  const tableData: TableData = useMemo(() => {
    return {
      head: ["Coin", "Time", "Account", "Type", "Amount"].map((el) =>
        t(el),
      ),
      body: transactions
        .filter((el) => TRANSACTION_TYPES.includes(el.type))
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
              {accountById[row.accountId]?.name || "--"}
            </Title>
          </>,
          <>
            <Title order={6} fz={12}>
              {row.type}
            </Title>
          </>,
          <>
            <Title order={6} fz={12}>
              <NumberFormat decimalPlaces={8} value={row.amount} />
            </Title>
          </>,
        ]),
    };
  }, [accountById, t, transactions]);

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
