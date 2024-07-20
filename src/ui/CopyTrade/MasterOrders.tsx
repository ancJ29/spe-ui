import BN from "@/common/big-number";
import { OrderSide } from "@/common/enums";
import useSyncData from "@/hooks/useSyncData";
import { fetchClosedCopyPositions } from "@/services/apis";
import { assetStore } from "@/store/assets";
import { CopyPosition } from "@/types";
import { NoDataRecord } from "@/ui/NoData";
import { TransferForm } from "@/ui/Wallet";
import {
  ActionIcon,
  Box,
  Flex,
  Modal,
  Pagination,
  ScrollArea,
  Table,
  TableData,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import {
  SPETableHeader,
  SPETableNumber,
  SPETableSide,
  SPETableSymbol,
} from "../SPEMisc";

export function MasterOrders() {
  const [opened, { close }] = useDisclosure(false);
  const [coin] = useState("");
  const { fundingAccount, tradingAccount } = assetStore();
  const fetch = useCallback(() => fetchClosedCopyPositions(), []);
  const positions = useSyncData<CopyPosition[]>(fetch);

  const tableData: TableData = useMemo(() => {
    return {
      head: [
        "Contract",
        "Time",
        "Price (USDT)",
        "Qty",
        "Margin (USDT)",
        "Realized PnL",
        "Followers",
      ].map((label, idx) => (
        <SPETableHeader key={idx} label={label} />
      )),
      body: positions?.map((position) => {
        const color =
          position.side === OrderSide.BUY ? "green" : "red";
        return [
          <SPETableSymbol
            color={color}
            key={`${position.positionId}.${position.symbol}`}
            symbol={position.symbol}
          />,
          <SPETableSide
            key={`${position.positionId}.side`}
            color={color}
            side={position.side}
          />,
          <SPETableNumber
            key={`${position.positionId}.price`}
            value={position.entryPrice}
          />,
          <SPETableNumber
            key={`${position.positionId}.volume`}
            value={position.closedVolume}
          />,
          <SPETableNumber
            key={`${position.positionId}.margin`}
            value={BN.div(
              BN.mul(position.entryPrice, position.closedVolume),
              position.leverage,
            )}
          />,
          <SPETableNumber
            key={`${position.positionId}.pnl`}
            value={position.realizedPnl}
          />,
          <SPETableNumber
            key={`${position.positionId}.total`}
            value={0}
          />,
        ];
      }),
    };
  }, [positions]);

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
