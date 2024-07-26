import BN from "@/common/big-number";
import { TransactionType } from "@/common/enums";
import useSPEPagination from "@/hooks/useSPEPagination";
import useTranslation from "@/hooks/useTranslation";
import { fetchTransactions } from "@/services/apis";
import { assetStore } from "@/store/assets";
import { Asset } from "@/ui/Asset/Asset";
import NumberFormat from "@/ui/NumberFormat";
import { NoDataRecord, SPEPagination } from "@/ui/SPEMisc";
import { Box, Table, TableData, Title } from "@mantine/core";
import { useCallback, useMemo } from "react";

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
  const { accountById } = assetStore();
  const t = useTranslation();

  const fetch = useCallback(
    (cursor: string, limit: number, reverse: boolean) => {
      return fetchTransactions(
        TRANSACTION_TYPES,
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

  const tableData: TableData = useMemo(() => {
    return {
      head: [
        "Time",
        "Coin",
        "Account",
        "Amount",
        "Transaction Type",
      ].map((el) => t(el)),
      body: transactions.map((row) => [
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
