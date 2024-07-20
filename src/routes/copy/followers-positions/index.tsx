import { ROWS_PER_PAGE } from "@/common/configs";
import useSyncData from "@/hooks/useSyncData";
import useTranslation from "@/hooks/useTranslation";
import {
  fetchFollowerInformation,
  remarkFollowerApi,
} from "@/services/apis";
import { FollowerInformation } from "@/types";
import AppButton from "@/ui/Button/AppButton";
import { RemoveFollowerForm } from "@/ui/Copy";
import {
  NoDataRecord,
  SPETableDateTime,
  SPETableDoubleNumbers,
  SPETableHeader,
  SPETableText,
} from "@/ui/SPEMisc";
import { error, success } from "@/utils/notifications";
import {
  Box,
  Flex,
  Pagination,
  Table,
  TableData,
  TextInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconDeviceFloppy, IconUserX } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";

export default function MyFollowerPositions() {
  const t = useTranslation();
  const fetch = useCallback(() => fetchFollowerInformation(), []);
  const followers = useSyncData<FollowerInformation[]>(fetch);
  const total = useMemo(
    () => 1 + Math.floor((followers?.length || 0) / ROWS_PER_PAGE),
    [followers],
  );
  const [page, setPage] = useState(1);
  const tableData: TableData = useMemo(() => {
    return {
      head: [
        "Time",
        "Follower UID",
        "Positions",
        ["Investment (USDT)", "Current Assets (USDT)"],
        ["Settled Profit Sharing", "Unsettled Profit Sharing"],
        ["Total PnL (USDT/%)", "Unrealized PnL (USDT/%)"],
        "Remark",
        "Action",
      ].map((label, idx) => (
        <SPETableHeader key={idx} label={label} />
      )),
      body: (followers || [])
        .slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE)
        .map((follower, idx) => [
          <SPETableDateTime
            key={`${idx}.followFrom`}
            time={follower.followFrom}
          />,
          <SPETableText key={`${idx}.uid`} value={follower.uid} />,
          <span key={`${idx}.positions`}>
            {follower.totalCopyPositions.toLocaleString()}
          </span>,
          <SPETableDoubleNumbers
            maw={200}
            key={`${idx}.asset`}
            values={[follower.invested || 0, follower.current || 0]}
          />,
          <SPETableDoubleNumbers
            maw={200}
            key={`${idx}.profit`}
            values={[follower.settled || 0, follower.unSettled || 0]}
          />,
          <SPETableDoubleNumbers
            maw={200}
            key={`${idx}.profit`}
            values={[
              follower.realizedPnl || 0,
              follower.unrealizedPnl || 0,
            ]}
          />,
          <Remark
            key={`${idx}.remark`}
            accountId={follower.accountId}
            remark={follower.remark || ""}
          />,
          <AppButton
            key={`${idx}.action`}
            instancetype="Default"
            variant="transparent"
            onClick={() => {
              modals.open({
                title: t("Remove follower"),
                centered: true,
                withinPortal: true,
                size: "lg",
                padding: "xl",
                portalProps: {},
                styles: {
                  title: {
                    fontSize: "20px",
                  },
                },
                children: (
                  <RemoveFollowerForm
                    uid={follower.uid}
                    accountId={follower.accountId}
                  />
                ),
              });
            }}
          >
            <IconUserX />
          </AppButton>,
        ]),
    };
  }, [page, followers, t]);

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
        {total > 1 && (
          <Flex justify={"center"} mt={20}>
            <Pagination
              withEdges
              value={page}
              total={total}
              onChange={setPage}
            />
          </Flex>
        )}
      </Table.ScrollContainer>
    </Box>
  );
}

function Remark({
  accountId,
  remark,
}: {
  remark: string;
  accountId: string;
}) {
  const t = useTranslation();
  const [value, setValue] = useState(remark || "");

  return (
    <TextInput
      size="sm"
      value={value}
      onChange={(e) => {
        setValue(e.target.value || "");
      }}
      rightSection={
        <IconDeviceFloppy
          size={16}
          color="#f18f14"
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            remarkFollowerApi(accountId, value)
              .then(() => {
                success(t("Success"), t("Follower has been removed"));
              })
              .catch(() => {
                error(
                  t("Something went wrong"),
                  t("Cannot remove the follower"),
                );
              });
          }}
        />
      }
    />
  );
}
