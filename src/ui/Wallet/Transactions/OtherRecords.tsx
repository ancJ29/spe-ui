import BN from "@/common/big-number";
import { TransactionType } from "@/common/enums";
import useTranslation from "@/hooks/useTranslation";
import { assetStore } from "@/store/assets";
import { Asset } from "@/ui/Asset/Asset";
import NumberFormat from "@/ui/NumberFormat";
import { NoDataRecord } from "@/ui/SPEMisc";
import { Box, Table, TableData, Title } from "@mantine/core";
import { useEffect, useMemo } from "react";

const TRANSACTION_TYPES = [
  TransactionType.TRANSFER_IN,
  TransactionType.TRANSFER_OUT,
  TransactionType.REALIZED_PNL,
  TransactionType.FUNDING_FEE,
  TransactionType.DEPOSIT_COPY_FUND,
  TransactionType.WITHDRAW_COPY_FUND,
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
      head: [
        "Time",
        "Coin",
        "Account",
        "Amount",
        "Transaction Type",
      ].map((el) => t(el)),
      body: transactions
        .filter((el) => TRANSACTION_TYPES.includes(el.type))
        .map((row) => [
          <Title order={6} fz={12} key={`${row.id}.time`}>
            {new Date(row.updatedAt).toLocaleString()}
          </Title>,
          <Asset asset={row.asset} key={`${row.id}.asset`} />,
          <Title order={6} fz={12} key={`${row.id}.account`}>
            {accountById[row.accountId]?.name || "--"}
          </Title>,
          <Title order={6} fz={12} key={`${row.id}.amount`}>
            <NumberFormat
              decimalPlaces={8}
              value={BN.add(row.amount, row.fee || 0)}
            />
          </Title>,
          <Title order={6} fz={12} key={`${row.id}.type`}>
            {row.type}
          </Title>,
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
