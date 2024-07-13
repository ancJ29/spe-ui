import {
  CoinType,
  iconsByCoin,
  ModalMode,
  textByCoin,
} from "@/domain/balance";
import useTranslation from "@/hooks/useTranslation";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { NoDataRecord } from "@/ui/NoData";
import NumberFormat from "@/ui/NumberFormat";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ScrollArea,
  Table,
  TableData,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import {
  DepositForm,
  SwapForm,
  TransferForm,
  WithdrawForm,
} from "../Form";

export function TableCoinsTradingWallet() {
  const t = useTranslation();
  const [modalMode, setModalMode] = useState<ModalMode>();
  const [opened, { open, close }] = useDisclosure(false);
  const { accounts, balances, reloadAll } = useTradeStorageInfo();

  const rows = useMemo(() => {
    const accountId = accounts.find(
      (el) => !el.isFunding && !el.isCopyMaster,
    )?.id;
    return accountId
      ? balances.filter((el) => el.accountId === accountId)
      : [];
  }, [accounts, balances]);

  const openModal = (mode: ModalMode) => {
    setModalMode(mode);
    open();
  };

  const tableData: TableData = {
    head: [
      "Coin",
      "Assets",
      "Total Equity",
      "Available Margin",
      "Position Margin",
      // "Order Margin",
      "Unrealized PnL",
      // "Experience Fund",
      "Actions",
    ].map((el) => t(el)),
    body: [
      ...rows.map((row) => {
        return [
          <>
            <Flex align={"center"} gap={10}>
              <Box>
                <Image
                  w={30}
                  h={30}
                  src={iconsByCoin[row.coin as CoinType]}
                />
              </Box>
              <Box>
                <Title order={6}>{row.coin}</Title>
                <Text c="dimmed">
                  {textByCoin[row.coin as CoinType]}
                </Text>
              </Box>
            </Flex>
          </>,
          <>
            <Title order={6}>
              <NumberFormat decimalPlaces={8} value={row.amount} />
            </Title>
            <Text c="dimmed" size="xs">
              ~ $
              <NumberFormat decimalPlaces={3} value={row.usdValue} />
            </Text>
          </>,
          <>
            <Title order={6}>
              <NumberFormat decimalPlaces={8} value={row.equity} />
            </Title>
          </>,
          <>
            <Title order={6}>
              <NumberFormat
                decimalPlaces={8}
                value={row.availableMargin}
              />
            </Title>
          </>,
          <>
            <Title order={6}>
              <NumberFormat decimalPlaces={8} value={row.margin} />
            </Title>
          </>,
          <>
            <Title order={6}>
              <NumberFormat
                decimalPlaces={8}
                value={row.unRealizedPnl}
              />
            </Title>
          </>,
          <>
            <Flex gap={5}>
              <Button
                onClick={() => openModal("TRANSFER")}
                p={0}
                size="xs"
                variant="transparent"
              >
                {t("Transfer")}
              </Button>
            </Flex>
          </>,
        ];
      }),
    ],
  };
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
          <>{rows.length === 0 && <NoDataRecord />}</>
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
          {modalMode == "DEPOSIT" && (
            <DepositForm maw={"100%"} onClose={close} />
          )}
          {modalMode == "SWAP" && <SwapForm onSubmit={reloadAll} />}
          {modalMode == "TRANSFER" && (
            <TransferForm onSubmit={reloadAll} />
          )}
          {modalMode == "WITHDRAW" && (
            <WithdrawForm onSubmit={reloadAll} />
          )}
        </Box>
      </Modal>
    </>
  );
}
