import { chainByCoin, CoinType, iconsByCoin, ModalMode, textByCoin } from "@/domain/balance";
import { StatusTransaction } from "@/domain/transaction";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import NumberFormat from "@/ui/NumberFormat";
import { ActionIcon, Badge, Box, Button, Flex, Image, Modal, ScrollArea, Table, TableData, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { WithdrawForm } from "../Form";
import { NoDataRecord } from "@/ui/NoData";

export function TableRecordsWithdraw() {
    const { transactions, initialAll } = useTradeStorageInfo();
    const [opened, { open, close }] = useDisclosure(false);
    const [modalMode, setModalMode] = useState<ModalMode>();
    const openModal = (mode: ModalMode) => {
        setModalMode(mode);
        open();
    };
    const colors: Record<StatusTransaction, string> = {
        DONE: "green",
        FAILED: "red",
        PENDING: "orange",
        PROCESSING: "blue"
    }

    const tableData: TableData = {
        head: ["Coin", "Time", "Amount", "Address", "Chain Name", "Status", "Remark", "Action"],
        body: [
            ...[...transactions].map((row) => {
                return [
                    <>
                        <Flex align={"center"} gap={10}>
                            <Box>
                                <Image w={30} h={30} src={iconsByCoin[row.asset as CoinType]} />
                            </Box>
                            <Box>
                                <Title order={6}>{row.asset}</Title>
                                <Text c="dimmed">{textByCoin[row.asset as CoinType]}</Text>
                            </Box>
                        </Flex>
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
                        <Text c="dimmed" size="xs">
                            ≈ $<NumberFormat decimalPlaces={8} value={row.amount} />
                        </Text>
                    </>
                    ,
                    <>
                        <Title order={6} fz={12}>
                            {row.to}
                        </Title>
                    </>,
                    <>
                        <Title order={6} fz={12}>
                            {chainByCoin[row.asset]}
                        </Title>

                    </>
                    ,

                    <>
                        <Badge color={colors[row.status]}>
                        {row.status}
                        </Badge>
                    </>
                    ,
                    <>
                        <Title order={6}>
                            --
                        </Title>
                    </>,
                    <Flex gap={5}>
                        <Button onClick={() => openModal("WITHDRAW")} p={0} size="xs" variant="transparent">Withdraw</Button>
                    </Flex>
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
                        verticalSpacing={"xs"}
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
                    <>
                        {transactions.length === 0 && <NoDataRecord />}
                    </>
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
                    <WithdrawForm onSubmit={initialAll} />
                </Box>
            </Modal>
        </>
    )
}
