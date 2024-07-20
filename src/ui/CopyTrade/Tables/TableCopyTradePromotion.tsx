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
import {
  IconExternalLink,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import { v4 } from "uuid";

type PropsType = {};
export function TableCopyTradePromotion(prosp: PropsType) {
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
      time: Date.now() * Math.floor(Math.random() * 100),
      uuid: v4(),
      follower: Math.floor(Math.random() * 100),
      followersPrice: Math.random() * 100000,
      settledProfit: Math.random() * 100000,
      unsettledProfit: Math.random() * 100000,
    });
    return {
      head: [
        "Time",
        "Promoter UID",
        "Follower",
        "Followers' AUM (USDT)",
        `Settled Profit Sharing
Unsettled Profit Sharing`,
        // "Order Margin",
        "Remark",
        // "Experience Fund",
        "Promoter Link",
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
              <Title order={6}>{row.uuid}</Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={0}
                  value={row.follower}
                />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={2}
                  value={row.followersPrice}
                />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={8}
                  value={row.settledProfit}
                />
              </Title>
              <Title order={6} c={"primary"}>
                <NumberFormat
                  decimalPlaces={8}
                  value={row.unsettledProfit}
                />
              </Title>
            </>,
            <>
              <Button justify="center" variant="light" size="xs">
                <IconPlus size={16} />
                {t("Add Remarks")}
              </Button>
            </>,
            <>
              <Flex gap={5}>
                <Button p={0} size="xs" variant="transparent">
                  <IconExternalLink />
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
