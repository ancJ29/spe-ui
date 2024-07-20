import { priceDisplay } from "@/common/utils";
import useTranslation from "@/hooks/useTranslation";
import { assetStore } from "@/store/assets";
import NumberFormat from "@/ui/NumberFormat";
import { NoDataRecord } from "@/ui/SPEMisc";
import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Pagination,
  Space,
  Table,
  TableData,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconLogout,
  IconPlus,
  IconSettings2,
  IconX,
} from "@tabler/icons-react";
import { useMemo } from "react";
import {
  AddFundForm,
  CopyTradingSettingsForm,
  WithdrawFundsForm,
} from "../Forms";

type ModalType = "AddFund" | "SettingCopy" | "Withdraw" | "Close";
type PropsType = {};
export function TableCopyTradeMyMasters(props: PropsType) {
  const t = useTranslation();
  const { accounts, balances, fundingAccount, tradingAccount } =
    assetStore();
  const openModal = (type: ModalType) => {
    if (type === "Close") {
      return alert("TODO: CLOSE");
    }
    modals.open({
      title: t("Copy Trading Settings"),
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
        <>
          {type === "AddFund" && <AddFundForm />}
          {type === "SettingCopy" && <CopyTradingSettingsForm />}
          {type === "Withdraw" && <WithdrawFundsForm />}
        </>
      ),
    });
  };
  const tableData: TableData = useMemo(() => {
    const _row = () => ({
      master: {
        avatar:
          "https://www.bybit.com/bycsi-root/app/assets/token/1a4ad541f3bf738a65de4ddb1e5d603b.svg",
        name: "DeFiLong",
        p1: 20,
        p2: 30,
      },
      assets: Math.random() * 200000,
      netPl: Math.random() * 200000,
      copiedPositions: Math.random() * 4,
      investment: Math.random() * 200000,
      withdrawable: Math.random() * 10,
    });
    return {
      head: [
        "Master",
        "Assets (USDT)",
        "Net PnL (USDT)",
        "Copied Positions",
        "Investment",
        // "Order Margin",
        "Withdrawable",
        // "Experience Fund",
        "Action",
      ].map((el) => {
        return (
          <Box
            style={{
              whiteSpace: "pre",
            }}
          >
            {t(el)}
          </Box>
        );
      }),
      body: [
        ...[...Array(20)].map(() => {
          const row = _row();
          return [
            <>
              <Flex align={"center"} gap={10}>
                <Box>
                  <Image w={40} h={40} src={row.master.avatar} />
                </Box>
                <Box>
                  <Title order={6}>{row.master.name}</Title>
                  <Space mb={5} />
                  <Flex gap={5}>
                    <Badge radius={4} variant="light" size="xs">
                      {t("Master")}{" "}
                      <NumberFormat
                        value={row.master.p1}
                        decimalPlaces={0}
                        suffix="%"
                      />{" "}
                    </Badge>
                    <Badge radius={4} variant="light" size="xs">
                      {t("Promoter")}{" "}
                      <NumberFormat
                        value={row.master.p2}
                        decimalPlaces={0}
                        suffix="%"
                      />
                    </Badge>
                  </Flex>
                </Box>
              </Flex>
            </>,
            <>
              <Title order={6}>
                <NumberFormat decimalPlaces={2} value={row.assets} />
              </Title>
            </>,
            <>
              <Title order={6} c={priceDisplay(row.netPl).color}>
                <NumberFormat
                  prefix={priceDisplay(row.netPl).sub}
                  decimalPlaces={2}
                  value={row.netPl}
                />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={0}
                  value={row.copiedPositions}
                />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={8}
                  value={row.investment}
                />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={8}
                  value={row.withdrawable}
                />
              </Title>
            </>,
            <>
              <Flex gap={10}>
                <Button
                  onClick={() => openModal("AddFund")}
                  p={0}
                  size="xs"
                  variant="transparent"
                >
                  <IconPlus />
                </Button>
                <Button
                  onClick={() => openModal("Withdraw")}
                  p={0}
                  size="xs"
                  variant="transparent"
                >
                  <IconLogout />
                </Button>
                <Button
                  onClick={() => openModal("SettingCopy")}
                  p={0}
                  size="xs"
                  variant="transparent"
                >
                  <IconSettings2 />
                </Button>
                <Button
                  onClick={() => openModal("Close")}
                  p={0}
                  size="xs"
                  variant="transparent"
                >
                  <IconX />
                </Button>
              </Flex>
            </>,
          ];
        }),
      ],
    };
  }, [accounts, balances, t]);

  return (
    <>
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
          <Flex justify={"center"} mt={20}>
            <Pagination total={10} />
          </Flex>
        </Table.ScrollContainer>
      </Box>
    </>
  );
}
