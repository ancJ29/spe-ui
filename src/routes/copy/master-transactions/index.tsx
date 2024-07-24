import { ROWS_PER_PAGE } from "@/common/configs";
import useTranslation from "@/hooks/useTranslation";
import { fetchCopyTransactions } from "@/services/apis";
import { CopyTransaction } from "@/types";
import {
  NoDataRecord,
  SPETableDateTime,
  SPETableHeader,
} from "@/ui/SPEMisc";
import { Box, Button, Flex, Table, TableData } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

export default function MasterTransactions() {
  const t = useTranslation();
  const [transactions, setTransactions] = useState<CopyTransaction[]>(
    [],
  );
  const [{ cursor, reverse }, setCursor] = useState({
    cursor: "",
    reverse: false,
  });
  const [haveNextPage, setHaveNextPage] = useState(false);
  const [havePreviousPage, setHavePreviousPage] = useState(false);
  useEffect(() => {
    const limit = ROWS_PER_PAGE + (reverse ? 2 : 1);
    fetchCopyTransactions(cursor, limit, reverse).then((data) => {
      reverse
        ? setHavePreviousPage(data.length === limit)
        : setHaveNextPage(data.length === limit);
      setTransactions(data);
    });
  }, [cursor, reverse]);

  const tableData: TableData = useMemo(() => {
    const from = reverse ? 1 : 0;
    return {
      head: [
        "Time",
        "Follower UID",
        "Remark",
        "Type",
        "Amount (USDT)",
      ].map((label, idx) => (
        <SPETableHeader key={idx} label={label} />
      )),
      body: transactions
        .slice(from, from + ROWS_PER_PAGE)
        .map((transaction) => [
          <SPETableDateTime
            key={`${transaction.id}.time`}
            time={transaction.createdAt}
          />,
        ]),
    };
  }, [transactions, reverse]);

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
