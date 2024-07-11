import { chainByCoin, CoinType, iconsByCoin, ModalMode, textByCoin } from "@/domain/balance";
import { StatusTransaction } from "@/domain/transaction";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { NoDataRecord } from "@/ui/NoData";
import NumberFormat from "@/ui/NumberFormat";
import { ActionIcon, Badge, Box, Button, Flex, Image, Table, TableData, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export function TableRecordsOthers() {
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
        head: ["Coin", "Time", "Account", "Type", "Amount"],
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
                            {row.accountId}
                        </Title>
                    </>,
                    <>
                    <Title order={6} fz={12}>
                        {row.type}
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

        </>
    )
}
