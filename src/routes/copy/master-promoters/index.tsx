import { ROWS_PER_PAGE } from "@/common/configs";
import useSyncData from "@/hooks/useSyncData";
import useTranslation from "@/hooks/useTranslation";
import { fetchPromoters, remarkPromoterApi } from "@/services/apis";
import { CopyPromoter } from "@/types";
import AppButton from "@/ui/Button/AppButton";
import {
  NoDataRecord,
  SPETableDateTime,
  SPETableDoubleNumbers,
  SPETableHeader,
  SPETableNumber,
  SPETableText,
} from "@/ui/SPEMisc";
import { ONE_MINUTE } from "@/utils";
import { error, success } from "@/utils/notifications";
import {
  Box,
  Flex,
  Pagination,
  Table,
  TableData,
  TextInput,
} from "@mantine/core";
import { IconDeviceFloppy, IconLink } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";

export default function MasterPromoters() {
  const fetch = useCallback(() => fetchPromoters(), []);
  const promoters = useSyncData<CopyPromoter[]>(fetch, ONE_MINUTE);
  const total = useMemo(
    () => 1 + Math.floor((promoters?.length || 0) / ROWS_PER_PAGE),
    [promoters],
  );
  const [page, setPage] = useState(1);
  const tableData: TableData = useMemo(() => {
    return {
      head: [
        "Time",
        "Promoter UID",
        "Followers",
        "Followers' AUM (USDT)",
        ["Settled Profit Sharing", "Unsettled Profit Sharing"],
        "Remark",
        "Promoter Link",
      ].map((label, idx) => (
        <SPETableHeader key={idx} label={label} />
      )),
      body: (promoters || [])
        .slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE)
        .map((promoter, idx) => [
          <SPETableDateTime
            key={`${idx}.followFrom`}
            time={promoter.createdAt}
          />,
          <SPETableText key={`${idx}.uid`} value={promoter.uid} />,
          <span key={`${idx}.positions`}>
            {promoter.followers.toLocaleString()}
          </span>,
          <SPETableNumber
            maw={200}
            key={`${idx}.aum`}
            value={promoter.followersAum || 0}
          />,
          <SPETableDoubleNumbers
            maw={200}
            key={`${idx}.profit`}
            values={[promoter.settled || 0, promoter.unSettled || 0]}
          />,
          <Remark
            key={`${idx}.remark`}
            promoterId={promoter.id || ""}
            remark={promoter.remark || ""}
          />,
          <AppButton
            key={`${idx}.action`}
            instancetype="Default"
            variant="transparent"
            disabled
            onClick={() => {
              alert("Promoter Link");
            }}
          >
            <IconLink />
          </AppButton>,
        ]),
    };
  }, [page, promoters]);

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
  promoterId,
  remark,
}: {
  remark: string;
  promoterId: string;
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
            remarkPromoterApi(promoterId, value)
              .then(() => {
                success(t("Success"), t("Remark updated"));
              })
              .catch(() => {
                error(
                  t("Something went wrong"),
                  t("Cannot add remark"),
                );
              });
          }}
        />
      }
    />
  );
}
