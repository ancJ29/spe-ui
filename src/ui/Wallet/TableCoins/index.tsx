import { CHAIN, CoinType, iconsByCoin, textByCoin } from "@/domain/balance";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { ActionIcon, Box, Button, Flex, Image, Modal, NumberFormatter, ScrollArea, Table, TableData, Text, Title } from "@mantine/core";
import Decimal from "decimal.js";
import AppTabs from "@/ui/Tabs";
import { useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { DepositForm, SwapForm, TransferForm, WithdrawForm } from "../Form";
import { IconX } from "@tabler/icons-react";
import NumberFormat from "@/ui/NumberFormat";

type RowType = {
  coin: CoinType
  chain: CHAIN
  available: string
  frozen: string
  btcValuation: string
};

type RowTypePerpetual = {
  coin: CoinType
  chain: CHAIN
  assets: string
  totalEquity: string
  availableMargin: string
  positionMargin: string
  orderMargin: string
  unrealizedPnL: string
  experienceFund: string
};



type ModalMode = "DEPOSIT" | "SWAP" | "TRANSFER" | "WITHDRAW" | "ADDRESS";
export function TableCoins() {
  const { balances, initialAll } = useTradeStorageInfo();
  const [modalMode, setModalMode] = useState<ModalMode>();
  const [opened, { open, close }] = useDisclosure(false);

  const rows = useMemo(() => {
    return balances.balances.filter(i => i.name === "FUNDING ACCOUNT");
  }, [balances.balances]);

  const openModal = (mode: ModalMode) => {
    setModalMode(mode);
    open();
  };

  const tableData: TableData = {
    head: ["Coin", "Available", "Frozen", "BTC Valuation", "Actions"],
    body: [
      ...rows.map((row) => {
        return [
          <>
            <Flex align={"center"} gap={10}>
              <Box>
                <Image w={30} h={30} src={iconsByCoin[row.coin as CoinType]} />
              </Box>
              <Box>
                <Title order={6}>{row.coin}</Title>
                <Text c="dimmed">{textByCoin[row.coin as CoinType]}</Text>
              </Box>
            </Flex>
          </>,
          <>
            <Title order={6}>
              <NumberFormat decimalPlaces={8} value={row.amount} />
            </Title>
            <Text c="dimmed" size="xs">
              ≈ ${<NumberFormat decimalPlaces={8} value={row.amount} />}
            </Text>
          </>,
          <>
            <Title order={6}>
              {<NumberFormat decimalPlaces={8} value={row.locked} />}
            </Title>
            <Text c="dimmed" size="xs">
              ≈ ${<NumberFormat decimalPlaces={8} value={row.locked} />}
            </Text>
          </>,
          <>
            <Title order={6}>
              {new Decimal(row.locked).toFixed(8)}
            </Title>
            <Text c="dimmed" size="xs">
              ≈ ${<NumberFormat decimalPlaces={8} value={row.locked} />}
            </Text>
          </>
          ,
          <>
            <Flex gap={8}>
              <Button onClick={() => openModal("DEPOSIT")} p={0} size="xs" variant="transparent">Deposit</Button>
              <Button onClick={() => openModal("SWAP")} p={0} size="xs" variant="transparent" >Swap</Button>
              <Button onClick={() => openModal("WITHDRAW")} p={0} size="xs" variant="transparent">Widthdraw</Button>
              <Button p={0} size="xs" variant="transparent">Address</Button>
              <Button onClick={() => openModal("TRANSFER")} p={0} size="xs" variant="transparent">Transfer</Button>
            </Flex>
          </>
        ];
      }),
    ],
  };


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
                fontSize: "12px"
              }
            }}
          />
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
          }
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
                zIndex: 2
              }
            }}
          >
            <IconX color="gray" />
          </ActionIcon>
          {modalMode == "DEPOSIT" && <DepositForm maw={"100%"} onSubmit={initialAll} />}
          {modalMode == "SWAP" && <SwapForm onSubmit={initialAll} />}
          {modalMode == "TRANSFER" && <TransferForm onSubmit={initialAll} />}
          {modalMode == "WITHDRAW" && <WithdrawForm onSubmit={initialAll} />}
        </Box>
      </Modal>
    </>
  );
}

export function TablePerpetualCoins() {
  const [modalMode, setModalMode] = useState<ModalMode>();
  const [opened, { open, close }] = useDisclosure(false);
  const { balances, initialAll } = useTradeStorageInfo();

  const rows = useMemo(() => {
    return balances.balances.filter(i => i.name === "TRADING ACCOUNT");
  }, [balances.balances]);

  const openModal = (mode: ModalMode) => {
    setModalMode(mode);
    open();
  };

  const decimalScale = 2;
  const tableData: TableData = {
    head: ["Coin", "Assets", "Total Equity", "Available Margin", "Position Margin", "Order Margin", "Unrealized PnL", "Experience Fund", "Actions"],
    body: [
      ...rows.map((row) => {
        return [
          <>
            <Flex align={"center"} gap={10}>
              <Box>
                <Image w={30} h={30} src={iconsByCoin[row.coin as CoinType]} />
              </Box>
              <Box>
                <Title order={6}>{row.coin}</Title>
                <Text c="dimmed">{textByCoin[row.coin as CoinType]}</Text>
              </Box>
            </Flex>
          </>,
          <>
            <Title order={6}>
              <NumberFormat decimalPlaces={8} value={row.amount}/>
            </Title>
            <Text c="dimmed" size="xs">
              ≈ $<NumberFormat decimalPlaces={8} value={row.amount}/>
            </Text>
          </>,
          <>
            <Title order={6}>
            <NumberFormat decimalPlaces={8} value={row.amount}/>
            </Title>
            <Text c="dimmed" size="xs">
              ≈ $<NumberFormat decimalPlaces={8} value={row.amount}/>
            </Text>
          </>,
          <>
            <Title order={6}>
            <NumberFormat decimalPlaces={8} value={row.amount}/>
            </Title>
            <Text c="dimmed" size="xs">
              ≈ $<NumberFormat decimalPlaces={8} value={row.amount}/>
            </Text>
          </>
          ,
          <>
            <Title order={6}>
            <NumberFormat decimalPlaces={8} value={row.amount}/>
            </Title>
            <Text c="dimmed" size="xs">
              ≈ $<NumberFormat decimalPlaces={8} value={row.amount}/>
            </Text>
          </>
          ,
          <>
            <Title order={6}>
            <NumberFormat decimalPlaces={8} value={row.amount}/>
            </Title>
            <Text c="dimmed" size="xs">
              ≈ $<NumberFormat decimalPlaces={8} value={row.amount}/>
            </Text>
          </>
          ,
          <>
            <Title order={6}>
            <NumberFormat decimalPlaces={8} value={row.amount}/>
            </Title>
            <Text c="dimmed" size="xs">
              ≈ $<NumberFormat decimalPlaces={8} value={row.amount}/>
            </Text>
          </>
          ,
          <>
            <Title order={6}>
            <NumberFormat decimalPlaces={8} value={row.amount}/>
            </Title>
            <Text c="dimmed" size="xs">
              ≈ $<NumberFormat decimalPlaces={8} value={row.amount}/>
            </Text>
          </>
          ,
          <>
            <Flex gap={5}>
              <Button onClick={() => openModal("TRANSFER")} p={0} size="xs" variant="transparent">Transfer</Button>
            </Flex>
          </>
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
                fontSize: "12px"
              }
            }}
            classNames={{
              table: "table-sticky-column",
            }}
          />
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
          }
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
                zIndex: 2
              }
            }}
          >
            <IconX color="gray" />
          </ActionIcon>
          {modalMode == "DEPOSIT" && <DepositForm maw={"100%"} onSubmit={initialAll} />}
          {modalMode == "SWAP" && <SwapForm onSubmit={initialAll} />}
          {modalMode == "TRANSFER" && <TransferForm onSubmit={initialAll} />}
          {modalMode == "WITHDRAW" && <WithdrawForm onSubmit={initialAll} />}
        </Box>
      </Modal>
    </>
  );
}


export function TabsWallet() {
  return (
    <>
      <AppTabs
        className="noBg"
        defaultValue={"1"}
        showPanel
        classNames={{
          root: "tabBorderSmall"
        }}
        styles={{
          tabLabel: {
            fontWeight: "bolder",
            fontSize: "20px"
          }
        }}
        items={[
          {
            data: {
              label: "Wallet",
              value: "1",
            },
            tabsPanelProps: {
              children: <>
                <TableCoins />
              </>,
              value: "positions",
            },
          },
          {
            data: {
              label: "Perpetual Account",
              value: "2",
            },
            tabsPanelProps: {
              children: <>
                <TablePerpetualCoins />
              </>,
              value: "2",
            },
          },
        ]}
      />
    </>
  );
}
