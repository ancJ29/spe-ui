import useTranslation from "@/hooks/useTranslation";
import { assetStore } from "@/store/assets";
import NumberFormat from "@/ui/NumberFormat";
import { NoDataRecord } from "@/ui/SPEMisc";
import { TransferForm } from "@/ui/Wallet";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Modal,
  Pagination,
  ScrollArea,
  Table,
  TableData,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconUserPlus, IconX } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import { v4 } from "uuid";
type PropsType = {};
export function TableCopyTradeMyCopy(props: PropsType) {
  const t = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [coin, setCoin] = useState("");
  const { accounts, balances, fundingAccount, tradingAccount } =
    assetStore();

  const openModal = useCallback(
    (coin: string) => {
      setCoin(coin);
      open();
    },
    [open],
  );

  const tableData: TableData = useMemo(() => {
    const _row = () => ({
      time: Date.now() * Math.floor(Math.random() * 200),
      followersId: v4(),
      positions: [0, 1][Math.floor(Math.random() * 1)],
      investment: 350,
      currAssets: 350,
      settled: 0,
      unSettled: 0,
      pnlTotal: 1321321.22,
      pnlunrealized: 21321.22,
    });

    return {
      head: [
        "Time",
        "Follower UID",
        "Positions",
        `Investment (USDT)
Current Assets (USDT)`,
        `Settled Profit Sharing
Unsettled Profit Sharing`,
        // "Order Margin",
        `Total PnL (USDT/%)
Unrealized PnL (USDT/%)`,
        // "Experience Fund",
        "Remark",
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
        ...[...Array(10)].map(() => {
          const row = _row();
          return [
            <>
              <Flex align={"center"} gap={10}>
                <Box>
                  <Title order={6}>
                    {new Date(row.time).toLocaleString()}
                  </Title>
                </Box>
              </Flex>
            </>,
            <>
              <Title order={6}>{row.followersId}</Title>
            </>,
            <>
              <Title order={6}>{row.positions}</Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={2}
                  value={row.investment}
                />
              </Title>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={2}
                  value={row.currAssets}
                />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={2}
                  value={row.settled}
                  suffix="USDT"
                />
              </Title>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={2}
                  value={row.unSettled}
                  suffix="USDT"
                />
              </Title>
            </>,
            <>
              <Title
                order={6}
                c={
                  row.pnlTotal > 0
                    ? "green"
                    : row.pnlTotal < 0
                      ? "red"
                      : "dimmed"
                }
              >
                <NumberFormat
                  decimalPlaces={8}
                  value={row.pnlTotal}
                />
              </Title>
              <Title
                order={6}
                c={
                  row.pnlTotal > 0
                    ? "green"
                    : row.pnlTotal < 0
                      ? "red"
                      : "dimmed"
                }
              >
                <NumberFormat
                  decimalPlaces={8}
                  value={row.pnlunrealized}
                />
              </Title>
            </>,
            <>
              <Box>
                <Button justify="center" variant="light" size="xs">
                  <IconPlus size={16} />
                  {t("Add Remarks")}
                </Button>
              </Box>
            </>,
            <>
              <Flex gap={5}>
                <Button
                  onClick={() => openModal(row.coin)}
                  p={0}
                  size="xs"
                  variant="transparent"
                >
                  <IconUserPlus />
                </Button>
              </Flex>
            </>,
          ];
        }),
      ],
    };
  }, [accounts, balances, openModal, t]);

  const onSubmit = useCallback(() => {
    assetStore.getState().fetchBalances();
    close();
  }, [close]);

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
      <Modal
        centered
        variant="transparent"
        opened={opened}
        onClose={close}
        w={600}
        withCloseButton={false}
        size={"600px"}
        shadow="none"
        styles={{
          body: {
            // border: "solid 1px red",
          },
          root: {
            // border: "solid 1px blue",
          },
          content: {
            // border: "solid 1px orange",
            background: "none",
            boxShadow: "none",
            // overflow: "hidden"
          },
        }}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Box pos={"relative"}>
          <ActionIcon
            onClick={close}
            radius={"xl"}
            variant="transparent"
            pos={"absolute"}
            right={30}
            top={30}
            styles={{
              root: {
                zIndex: 2,
              },
            }}
          >
            <IconX color="gray" />
          </ActionIcon>
          <TransferForm
            coin={coin}
            accountIds={[
              tradingAccount?.id || "",
              fundingAccount?.id || "",
            ]}
            onSubmit={onSubmit}
          />
        </Box>
      </Modal>
    </>
  );
}
