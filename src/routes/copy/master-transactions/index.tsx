import useSPEPagination from "@/hooks/useSPEPagination";
import { fetchCopyTransactions } from "@/services/apis";
import {
  NoDataRecord,
  SPEPagination,
  SPETableDateTime,
  SPETableHeader,
} from "@/ui/SPEMisc";
import { Box, Table, TableData } from "@mantine/core";
import { useCallback, useMemo } from "react";

export default function MasterTransactions() {
  const fetch = useCallback(
    (cursor: string, limit: number, reverse: boolean) => {
      return fetchCopyTransactions(cursor, limit, reverse);
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
        "Follower UID",
        "Remark",
        "Type",
        "Amount (USDT)",
      ].map((label, idx) => (
        <SPETableHeader key={idx} label={label} />
      )),
      body: transactions.map((transaction) => [
        <SPETableDateTime
          key={`${transaction.id}.time`}
          time={transaction.createdAt}
        />,
      ]),
    }),
    [transactions],
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
        <>{tableData.body?.length === 0 && <NoDataRecord />}</>
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
