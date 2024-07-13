import { ASSET_COIN_LIST, STATUS_COLORS } from "@/common/configs";
import { TransactionType } from "@/common/enums";
import useTranslation from "@/hooks/useTranslation";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { useAssetStore } from "@/store/assets";
import { Asset } from "@/ui/Asset/Asset";
import { NoDataRecord } from "@/ui/NoData";
import NumberFormat from "@/ui/NumberFormat";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Flex,
  Modal,
  ScrollArea,
  Table,
  TableData,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { WithdrawForm } from "../Form";

export function WithdrawRecords() {
  const t = useTranslation();
  const { transactions } = useTradeStorageInfo();
  useEffect(() => {
    useAssetStore.getState().fetchTransactionsHistory({
      type: TransactionType.WITHDRAW,
    });
  }, []);
  const [opened, { open, close }] = useDisclosure(false);
  const [coin, setCoin] = useState("");
  const openModal = useCallback(
    (coin: string) => {
      setCoin(coin);
      open();
    },
    [open],
  );

  const tableData: TableData = useMemo(() => {
    return {
      head: [
        "Coin",
        "Time",
        "Amount",
        "Address",
        "Chain Name",
        "Status",
        "Remark",
        "Action",
      ].map((el) => t(el)),
      body: transactions
        .filter((el) => el.type === TransactionType.WITHDRAW)
        .map((row) => [
          <>
            <Asset asset={row.asset} />
          </>,
          <>
            <Title order={6} fz={12}>
              {new Date(row.updatedAt).toLocaleString()}
            </Title>
          </>,
          <>
            <Title order={6} fz={12}>
              <NumberFormat decimalPlaces={8} value={row.amount} />
            </Title>
          </>,
          <>
            <Title order={6} fz={12}>
              {row.to}
            </Title>
          </>,
          <>
            <Title order={6} fz={12}>
              {ASSET_COIN_LIST[row.asset]}
            </Title>
          </>,
          <>
            <Badge color={STATUS_COLORS[row.status]}>
              {row.status}
            </Badge>
          </>,
          <>
            <Title order={6}>--</Title>
          </>,
          // prettier-ignore
          <>
            <Flex gap={5}>
              <Button
                onClick={() => openModal(row.asset)}
                p={0}
                size="xs"
                variant="transparent"
              >
                Withdraw
              </Button>
            </Flex>
          </>,
        ]),
    };
  }, [openModal, t, transactions]);

  return (
    <>
      <Box h={"100%"} w={"100%"}>
        <Table.ScrollContainer minWidth={"100%"} h={"100%"}>
          <Table
            data={tableData}
            stickyHeader
            highlightOnHover
            verticalSpacing={"xs"}
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
          <>{transactions.length === 0 && <NoDataRecord />}</>
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
          content: {
            background: "none",
            boxShadow: "none",
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
          <WithdrawForm coin={coin} onSubmit={close} />
        </Box>
      </Modal>
    </>
  );
}
