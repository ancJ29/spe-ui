import { priceDisplay } from "@/common/utils";
import useTranslation from "@/hooks/useTranslation";
import { assetStore } from "@/store/assets";
import { NoDataRecord } from "@/ui/NoData";
import NumberFormat from "@/ui/NumberFormat";
import { TransferForm } from "@/ui/Wallet";
import {
  ActionIcon,
  Box,
  Divider,
  Flex,
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

type PropsType = {
  //
};
export function TableCopyTradeHistory() {
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
      coin: "BTC",
      quote: "USDT",
      bias: ["long", "short"][Math.floor(Math.random() * 1)],
      biasVal: "5x",
      master: ["Avalanche", "Helios Tech", "Defi Long"][
        Math.floor(Math.random() * 2)
      ],
      price: Math.random() * 200000,
      qty: Math.random() * 3,
      margin: Math.random() * 200000,
      unrealizedPnL: Math.random() * 200000,
      time: Date.now() * (Math.random() * 100),
    });
    return {
      head: [
        "Contract",
        "Time",
        "Price",
        "Qty",
        "Margin(USDT)",
        "Realized PnL",
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
                <Flex h={"100%"}>
                  <Box>
                    {row.bias.toLowerCase().startsWith("long") && (
                      <Divider
                        h={"calc(100% - 5px)"}
                        w={4}
                        bg={"green"}
                      />
                    )}
                    {row.bias.toLowerCase().startsWith("short") && (
                      <Divider
                        h={"calc(100% - 5px)"}
                        w={4}
                        bg={"red"}
                      />
                    )}
                  </Box>
                  <Box pl={10}>
                    <Title order={6}>
                      {row.coin}/{row.quote}
                    </Title>
                    {row.bias.toLowerCase().startsWith("long") && (
                      <Text c={"green"}>
                        {row.bias} {row.biasVal}
                      </Text>
                    )}
                    {row.bias.toLowerCase().startsWith("short") && (
                      <Text c={"red"}>
                        {row.bias} {row.biasVal}
                      </Text>
                    )}
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
                <NumberFormat
                  decimalPlaces={2}
                  value={row.price}
                  suffix="USDT"
                />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={3}
                  value={row.qty}
                  suffix="BTC"
                />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat decimalPlaces={8} value={row.margin} />
              </Title>
            </>,
            <>
              <Title
                order={6}
                c={priceDisplay(row.unrealizedPnL).color}
              >
                <NumberFormat
                  prefix={priceDisplay(row.unrealizedPnL).sub}
                  decimalPlaces={2}
                  value={row.unrealizedPnL}
                  suffix="USDT"
                />
              </Title>
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
