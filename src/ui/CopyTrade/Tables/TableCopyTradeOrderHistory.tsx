
TableCopyTradeOrderHistory;

import BN from "@/common/big-number";
import { ASSET_COIN_LIST } from "@/common/configs";
import { COIN_IMAGES } from "@/domain/config";
import useTranslation from "@/hooks/useTranslation";
import { assetStore } from "@/store/assets";
import { NoDataRecord } from "@/ui/NoData";
import NumberFormat from "@/ui/NumberFormat";
import { TransferForm } from "@/ui/Wallet";
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  Pagination,
  ScrollArea,
  Table,
  TableData,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
type PropsType = {};
export function TableCopyTradeOrderHistory(prosp: PropsType) {
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
    const rows = [
      {
        coin: "BTC",
        quote: "USDT",
        qty: 0.929,
        price: 58788.98,
        margin: 11661.67,
        realizedPnl: 11661.67,
        bias: ["open long", "close long"][Math.floor(Math.random() * 1)],
        biasVal: "5x",
        time: Date.now() * Math.floor(Math.random() * 100),
        followers: Math.floor(Math.random() * 300)
      }
    ];
    return {
      head: [
        "Contract",
        "Time",
        "Price (USDT)",
        "Qty",
        "Margin (USDT)",
        "Realized PnL",
        "Followers",
      ].map((el) => {
        return (
          <Box style={{
            whiteSpace: "pre"
          }}
          >
            {t(el)}
          </Box>
        );
      }),
      body: [
        ...[...Array(10)].map(() => {
          const row = rows[0];
          return [
            <>
              <Flex align={"center"} gap={10}>
                <Flex h={"100%"}>
                  <Box>
                    {row.bias.toLowerCase().startsWith("open") && <Divider h={"calc(100% - 5px)"} w={4} bg={"green"} />}
                    {row.bias.toLowerCase().startsWith("close") && <Divider h={"calc(100% - 5px)"} w={4} bg={"red"} />}
                  </Box>
                  <Box pl={10}>
                    <Title order={6}>{row.coin}/{row.quote}</Title>
                    {row.bias.toLowerCase().startsWith("open") && <Text c={"green"}>{row.bias} {row.biasVal}</Text>}
                    {row.bias.toLowerCase().startsWith("short") && <Text c={"red"}>{row.bias} {row.biasVal}</Text>}
                  </Box>
                </Flex>
              </Flex>
            </>,
            <>
              <Title order={6}>
                {new Date(row.time).toLocaleString()}
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat decimalPlaces={2} value={row.price} />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={8}
                  value={row.qty}
                />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat decimalPlaces={2} value={row.margin} />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={8}
                  value={row.realizedPnl}
                />
              </Title>

            </>,
            <>
              <Title order={6}>
                {/* <NumberFormat
               decimalPlaces={8}
               value={row.followers}
             /> */}
                {row.followers}
              </Title>
            </>
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
