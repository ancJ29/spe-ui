import useTranslation from "@/hooks/useTranslation";
import { assetStore } from "@/store/assets";
import { NoDataRecord } from "@/ui/NoData";
import NumberFormat from "@/ui/NumberFormat";
import { TransferForm } from "@/ui/Wallet";
import {
  ActionIcon,
  Box,
  Flex,
  Modal,
  Pagination,
  ScrollArea,
  Select,
  Space,
  Table,
  TableData,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import { v4 } from "uuid";

type PropsType = {};
export function TableCopyTradeTransaction(props: PropsType) {
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
      amout: Math.random() * 200000,
      margin: Math.random() * 200000,
      type: ["Master Profit Sharing"][Math.floor(Math.random())],
    });
    return {
      head: [
        "Time",
        "Master",
        "Type",
        "Margin (USDT)",
        "In / Out",
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
              <Title order={6}>
                {new Date(row.time).toLocaleString()}
              </Title>
            </>,
            <>
              <Title order={6}>{row.followersId}</Title>
            </>,

            <>
              <Title order={6}>{row.type}</Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={2}
                  value={row.margin}
                  suffix="USDT"
                />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat decimalPlaces={2} value={row.amout} />
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
      <Space mt={20} />
      <Flex gap={10}>
        <Select
          allowDeselect={false}
          defaultValue={"1"}
          data={[
            {
              value: "1",
              label: "Techvantage Capital",
            },
            {
              value: "2",
              label: "DeFiLong",
            },
            {
              value: "3",
              label: "AvalanChe Alpha",
            },
            {
              value: "4",
              label: "HElios Tech",
            },
          ]}
        ></Select>
        <Select
          allowDeselect={false}
          defaultValue={"1"}
          data={[
            {
              value: "1",
              label: "Al Types",
            },
            {
              value: "2",
              label: "Master Profit Sharing",
            },
            {
              value: "3",
              label: "Promoter Profit Sharing",
            },
            {
              value: "4",
              label: "Investment",
            },
            {
              value: "5",
              label: "Withdraw",
            },
          ]}
        ></Select>
        <Select
          allowDeselect={false}
          defaultValue={"1"}
          data={[
            {
              value: "1",
              label: "In & Out",
            },
            {
              value: "2",
              label: "In",
            },
            {
              value: "3",
              label: "Out",
            },
          ]}
        ></Select>
      </Flex>
      <Space mt={15} />
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
