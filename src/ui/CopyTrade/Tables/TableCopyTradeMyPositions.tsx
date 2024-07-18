import useTranslation from "@/hooks/useTranslation";
import { assetStore } from "@/store/assets";
import { NoDataRecord } from "@/ui/NoData";
import NumberFormat from "@/ui/NumberFormat";
import {
  Box,
  Divider,
  Flex,
  Pagination,
  Table,
  TableData,
  Text,
  Title,
} from "@mantine/core";
import { useCallback, useMemo } from "react";
type PropsType = {};
export function TableCopyTradeMyPositions(props: PropsType) {
  const t = useTranslation();
  const { accounts, balances, fundingAccount, tradingAccount } =
    assetStore();


  const tableData: TableData = useMemo(() => {
    const rows = [
      {
        coin: "BTC",
        quote: "USDT",
        qtyMaster: 0.929,
        qtyFollowers: 3.574,
        entryPrice: 58788.98,
        mkPrice: 62764.65,
        marginMaster: 11661.67,
        marginFollowers: 44864.177713,
        unrealizedMaster: 11661.67,
        unrealizedFollowers: 44864.177713,
        bias: ["long", "short"][Math.floor(Math.random() * 1)],
        biasVal: "5x",
      }
    ];
    return {
      head: [
        "Contract",
        `Master's Qty
Followers' Qty`,
        "Entry Price",
        "Mark Price",
        `Masters' Margin (USDT)
Followers' Margin (USDT)`,
        `Masters' Unrealized PnL (USDT)
Followers' Unrealized PnL (USDT)`,
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
        ...rows.map((row) => {
          return [
            <>
              <Flex align={"center"} gap={10}>
                <Flex h={"100%"}>
                  <Box>
                    {row.bias.toLowerCase().startsWith("long") && <Divider h={"calc(100% - 5px)"} w={4} bg={"green"} />}
                    {row.bias.toLowerCase().startsWith("short") && <Divider h={"calc(100% - 5px)"} w={4} bg={"red"} />}
                  </Box>
                  <Box pl={10}>
                    <Title order={6}>{row.coin}/{row.quote}</Title>
                    {row.bias.toLowerCase().startsWith("long") && <Text c={"green"}>{row.bias} {row.biasVal}</Text>}
                    {row.bias.toLowerCase().startsWith("short") && <Text c={"red"}>{row.bias} {row.biasVal}</Text>}
                  </Box>
                </Flex>
              </Flex>
            </>,
            <>
              <Title order={6}>
                <NumberFormat decimalPlaces={2} value={row.qtyMaster} />
                <NumberFormat decimalPlaces={2} value={row.qtyFollowers} />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat decimalPlaces={2} value={row.entryPrice} />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={8}
                  value={row.mkPrice}
                />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat decimalPlaces={2} value={row.marginMaster} />
                <NumberFormat decimalPlaces={2} value={row.marginFollowers} />
              </Title>
            </>,
            <>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={8}
                  value={row.unrealizedMaster}
                />
              </Title>
              <Title order={6}>
                <NumberFormat
                  decimalPlaces={8}
                  value={row.unrealizedFollowers}
                />
              </Title>
            </>,
          ];
        }),
      ],
    };
  }, [accounts, balances, t]);

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

    </>
  );
}
