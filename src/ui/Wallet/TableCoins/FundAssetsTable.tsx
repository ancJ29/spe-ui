import BN from "@/common/big-number";
import { ASSET_COIN_LIST } from "@/common/configs";
import { COIN_IMAGES } from "@/domain/config";
import useTranslation from "@/hooks/useTranslation";
import { assetStore } from "@/store/assets";
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
import { useCallback, useMemo, useState } from "react";
import {
  DepositForm,
  SwapForm,
  TransferForm,
  WithdrawForm,
} from "../Form";

type ModalMode =
  | "DEPOSIT"
  | "SWAP"
  | "TRANSFER"
  | "WITHDRAW"
  | "ADDRESS";

export function FundAssetsTable({ hideZero }: { hideZero: boolean }) {
  const t = useTranslation();
  const { accounts, balances, fundingAccount, tradingAccount } =
    assetStore();
  const [modalMode, setModalMode] = useState<ModalMode>();
  const [coin, setCoin] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const openModal = useCallback(
    (mode: ModalMode, coin: string) => {
      setModalMode(mode);
      setCoin(coin);
      open();
    },
    [open],
  );

  const tableData: TableData = useMemo(() => {
    const accountId = accounts.find((el) => el.isFunding)?.id;
    const rows = balances.filter((el) => {
      if (accountId && el.accountId === accountId) {
        return hideZero ? BN.gt(el.amount, 0) : true;
      }
      return false;
    });
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
              <Image w={30} h={30} src={COIN_IMAGES[row.coin]} />
            </Box>
            <Box>
              <Title order={6}>{row.coin}</Title>
              <Text c="dimmed">{ASSET_COIN_LIST[row.coin]}</Text>
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
              onClick={() => openModal("DEPOSIT", row.coin)}
              p={0}
              size="xs"
              variant="transparent"
            >
              {t("Deposit")}
            </Button>
            <Button
              onClick={() => openModal("SWAP", row.coin)}
              p={0}
              size="xs"
              variant="transparent"
            >
              {t("Swap")}
            </Button>
            <Button
              onClick={() => openModal("WITHDRAW", row.coin)}
              p={0}
              size="xs"
              variant="transparent"
            >
              {t("Withdraw")}
            </Button>
            {/* <Button p={0} size="xs" variant="transparent">
              {t("Address")} // TODO: Implement this
            </Button> */}
            <Button
              onClick={() => openModal("TRANSFER", row.coin)}
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
  }, [accounts, balances, hideZero, openModal, t]);

  const onSubmit = useCallback(() => {
    assetStore.getState().fetchBalances();
    close();
  }, [close]);

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
            <DepositForm maw={"100%"} coin={coin} onClose={close} />
          )}
          {modalMode == "SWAP" && (
            <SwapForm coin={coin} onSubmit={onSubmit} />
          )}
          {modalMode == "TRANSFER" && (
            <TransferForm
              coin={coin}
              accountIds={[
                fundingAccount?.id || "",
                tradingAccount?.id || "",
              ]}
              onSubmit={onSubmit}
            />
          )}
          {modalMode == "WITHDRAW" && (
            <WithdrawForm coin={coin} onSubmit={onSubmit} />
          )}
        </Box>
      </Modal>
    </>
  );
}
