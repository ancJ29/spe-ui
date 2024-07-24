import { STATUS_COLORS } from "@/common/configs";
import { TransactionType } from "@/common/enums";
import useTranslation from "@/hooks/useTranslation";
import { assetStore } from "@/store/assets";
import { Asset } from "@/ui/Asset/Asset";
import NumberFormat from "@/ui/NumberFormat";
import { NoDataRecord } from "@/ui/SPEMisc";
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
import { DepositForm } from "../Form";

export function DepositRecords() {
  const t = useTranslation();
  const { transactions } = assetStore();
  useEffect(() => {
    assetStore.getState().fetchTransactionsHistory({
      type: TransactionType.DEPOSIT,
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
        "Time",
        "Coin",
        "Amount",
        "From Address",

        "Status",
        "Action",
      ].map((el) => t(el)),
      // foot: [],
      body: transactions
        .filter((el) => el.type === TransactionType.DEPOSIT)
        .map((row) => [
          <Title order={6} fz={12} key={`${row.id}.time`}>
            {new Date(row.updatedAt).toLocaleString()}
          </Title>,
          <Asset asset={row.asset} key={`${row.id}.asset`} />,
          <>
            <Title order={6} fz={12}>
              <NumberFormat decimalPlaces={8} value={row.amount} />
            </Title>
          </>,
          <>
            <Title order={6} fz={12} key={`${row.id}.from`}>
              {row.from || "N/A"}
            </Title>
          </>,
          <Badge
            color={STATUS_COLORS[row.status]}
            key={`${row.id}.status`}
          >
            {row.status}
          </Badge>,
          <Flex gap={5} key={`${row.id}.action`}>
            <Button
              onClick={() => openModal(row.asset)}
              p={0}
              size="xs"
              variant="transparent"
            >
              {t("Deposit")}
            </Button>
          </Flex>,
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
          <DepositForm maw={"100%"} coin={coin} onClose={close} />
        </Box>
      </Modal>
    </>
  );
}
