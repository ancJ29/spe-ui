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

export function TableCoinsWallet() {
  const t = useTranslation();
  const { accounts, balances, reloadAll } = useTradeStorageInfo();
  const [modalMode, setModalMode] = useState<ModalMode>();
  const [opened, { open, close }] = useDisclosure(false);

  const tableData: TableData = useMemo(() => {
    const openModal = (mode: ModalMode) => {
      setModalMode(mode);
      open();
    };
    const accountId = accounts.find((el) => el.isFunding)?.id;
    const rows = accountId
      ? balances.filter((el) => el.accountId === accountId)
      : [];
    return {
      head: [
        "Coin",
        "Available",
        "Frozen",
        "BTC Valuation",
        "Actions",
      ].map((el) => t(el)),
      body: rows.map((row) => [
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
            {<NumberFormat decimalPlaces={3} value={row.usdValue} />}
          </Text>
        </>,
        <>
          <Title order={6}>
            {<NumberFormat decimalPlaces={8} value={row.locked} />}
          </Title>
          <Text c="dimmed" size="xs">
            ~ $
            {
              <NumberFormat
                decimalPlaces={3}
                value={row.lockedUsdValue}
              />
            }
          </Text>
        </>,
        <>
          <Title order={6}>
            {<NumberFormat decimalPlaces={8} value={row.btcValue} />}
          </Title>
        </>,
        <>
          <Flex gap={8}>
            <Button
              onClick={() => openModal("DEPOSIT")}
              p={0}
              size="xs"
              variant="transparent"
            >
              {t("Deposit")}
            </Button>
            <Button
              onClick={() => openModal("SWAP")}
              p={0}
              size="xs"
              variant="transparent"
            >
              {t("Swap")}
            </Button>
            <Button
              onClick={() => openModal("WITHDRAW")}
              p={0}
              size="xs"
              variant="transparent"
            >
              {t("Withdraw")}
            </Button>
            {/* <Button p={0} size="xs" variant="transparent">
              {t("Address")}
            </Button> */}
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
      ]),
    };
  }, [accounts, balances, open, t]);

  return (
    <>
      <Box h={"100%"}>
        <Table.ScrollContainer minWidth={"100%"} h={"100%"}>
          <Table
            data={tableData}
            stickyHeader
            highlightOnHover
            classNames={{
              table: "table-sticky-column",
            }}
            styles={{
              th: {
                whiteSpace: "nowrap",
                fontSize: "12px",
              },
            }}
          />
          <>{tableData.body?.length === 0 && <NoDataRecord />}</>
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
