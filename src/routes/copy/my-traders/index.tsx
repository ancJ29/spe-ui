import { MODAL_STYLES } from "@/domain/config";
import useTranslation from "@/hooks/useTranslation";
import { assetStore } from "@/store/assets";
import AppButton from "@/ui/Button/AppButton";
import {
  AddFundForm,
  CopySettingForm,
  MasterTrader,
  UnFollowForm,
  WithdrawFundForm,
} from "@/ui/Copy";
import {
  NoDataRecord,
  SPETableHeader,
  SPETableNumber,
} from "@/ui/SPEMisc";
import { Box, Flex, Table, TableData } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconLogout,
  IconPlus,
  IconSettings,
  IconX,
} from "@tabler/icons-react";
import { useMemo } from "react";

export default function MyTraders() {
  const t = useTranslation();
  const { masterTraders: traders } = assetStore();

  const tableData: TableData = useMemo(() => {
    return {
      head: [
        "Trader",
        "Ratio",
        "Assets (USDT)",
        "NetPnL (USDT)",
        "Copied Positions",
        "Investment",
        "Withdraw",
        "Withdrawable",
        "Action",
      ].map((label, idx) => (
        <SPETableHeader key={idx} label={label} />
      )),
      body: traders.map((trader) => [
        <MasterTrader
          key={`${trader.masterAccountId}.avatar`}
          avatar={trader.avatar}
          name={trader.name}
        />,
        <span key={`${trader.masterAccountId}.ratio`}>
          {trader.ratio ? `${trader.ratio}%` : "--"}
        </span>,
        <SPETableNumber
          key={`${trader.masterAccountId}.asset`}
          value={trader.asset}
        />,
        <SPETableNumber
          key={`${trader.masterAccountId}.netPnL`}
          value={trader.netPnL}
        />,
        <SPETableNumber
          key={`${trader.masterAccountId}.totalPositions`}
          value={trader.totalPositions}
        />,
        <SPETableNumber
          key={`${trader.masterAccountId}.invested`}
          value={trader.invested}
        />,
        <SPETableNumber
          key={`${trader.masterAccountId}.withdraw`}
          value={trader.withdraw}
        />,
        <SPETableNumber
          key={`${trader.masterAccountId}.withDrawable`}
          value={trader.withDrawable}
        />,
        <Flex
          key={`${trader.masterAccountId}.actions`}
          justify="start"
          align="center"
        >
          <AppButton
            disabled={trader.paused || trader.ratio === 0}
            instancetype="Default"
            variant="transparent"
            onClick={() => {
              modals.open({
                ...MODAL_STYLES,
                title: t("Add fund"),
                children: (
                  <AddFundForm
                    masterAccountId={trader.masterAccountId}
                  />
                ),
              });
            }}
          >
            <IconPlus />
          </AppButton>
          <AppButton
            instancetype="Default"
            variant="transparent"
            onClick={() => {
              modals.open({
                ...MODAL_STYLES,
                title: t("Withdraw fund"),
                children: (
                  <WithdrawFundForm
                    withdrawable={trader.withDrawable}
                    masterAccountId={trader.masterAccountId}
                  />
                ),
              });
            }}
          >
            <IconLogout />
          </AppButton>
          <AppButton
            instancetype="Default"
            variant="transparent"
            onClick={() => {
              modals.open({
                ...MODAL_STYLES,
                title: t("Copy settings"),
                children: (
                  <CopySettingForm
                    masterAccountId={trader.masterAccountId}
                  />
                ),
              });
            }}
          >
            <IconSettings />
          </AppButton>
          <AppButton
            disabled={trader.ratio === 0}
            instancetype="Default"
            variant="transparent"
            onClick={() => {
              modals.open({
                ...MODAL_STYLES,
                title: t("Un-follow %s", trader.name),
                children: (
                  <UnFollowForm
                    masterAccountId={trader.masterAccountId}
                    name={trader.name}
                  />
                ),
              });
            }}
          >
            <IconX />
          </AppButton>
        </Flex>,
      ]),
    };
  }, [t, traders]);

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
      </Table.ScrollContainer>
    </Box>
  );
}
