import { ASSET_COIN_LIST } from "@/common/configs";
import { ModalMode } from "@/domain/balance";
import { COIN_IMAGES } from "@/domain/config";
import useTranslation from "@/hooks/useTranslation";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { useAssetStore } from "@/store/assets";
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
import { TransferForm } from "../Form";

export function TradingAssetsTable() {
  const t = useTranslation();
  const [modalMode, setModalMode] = useState<ModalMode>();
  const [opened, { open, close }] = useDisclosure(false);
  const [coin, setCoin] = useState("");
  const { accounts, balances, fundingAccount, tradingAccount } =
    useTradeStorageInfo();

  const openModal = useCallback(
    (mode: ModalMode, coin: string) => {
      setModalMode(mode);
      setCoin(coin);
      open();
    },
    [open],
  );

  const rows = useMemo(() => {
    const accountId = accounts.find(
      (el) => !el.isFunding && !el.isCopyMaster,
    )?.id;
    return accountId
      ? balances.filter((el) => el.accountId === accountId)
      : [];
  }, [accounts, balances]);

  const tableData: TableData = useMemo(() => {
    return {
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
                <NumberFormat
                  decimalPlaces={3}
                  value={row.usdValue}
                />
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
                  onClick={() => openModal("TRANSFER", row.coin)}
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
  }, [openModal, rows, t]);

  const onSubmit = useCallback(() => {
    useAssetStore.getState().initial();
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
          {modalMode == "TRANSFER" && (
            <TransferForm
              coin={coin}
              accountIds={[
                tradingAccount?.id || "",
                fundingAccount?.id || "",
              ]}
              onSubmit={onSubmit}
            />
          )}
        </Box>
      </Modal>
    </>
  );
}
