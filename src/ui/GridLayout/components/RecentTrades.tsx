import {
  Box,
  Flex,
  NumberFormatter,
  Table,
  TableData,
  Text,
} from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import dayjs from "dayjs";

export function GridRecentTrade() {
  return (
    <>
      <>
        <Table.ScrollContainer minWidth={"100%"} h={"100%"}>
          <Table
            styles={{
              thead: {
                background: "#101014",
              },
              th: {
                fontSize: "12px",
                fontWeight: 500,
                padding: "10px 10px",
              },
            }}
            data={tableData}
            stickyHeader
            verticalSpacing={2}
            withRowBorders={false}
          />
        </Table.ScrollContainer>
      </>
    </>
  );
}
const c = ["#ec4349", "#21b16b"];
const icons = [
  <IconArrowDown key="1" color={c[0]} size={16} />,
  <IconArrowUp key="2" color={c[1]} size={16} />,
];
const r = () => Math.floor(Math.random() * 2);

const tableData: TableData = {
  head: [
    <Box key="1" w={"100px"}>
      Price(USDT)
    </Box>,
    <Flex key="2" justify={"end"}>
      Qty(BTC)
    </Flex>,
    <Flex key="3" justify={"end"}>
      Time
    </Flex>,
  ],
  body: [
    ...[...Array(100)].map(() => {
      const price = Math.random() * 10e6;
      const isUp = c[r()] === c[1];
      const color = isUp ? c[1] : c[0];
      const icon = isUp ? icons[1] : icons[0];
      const qty = Math.random() * (0.03 - 0.1) + 0.1;
      const time = dayjs(Math.random() * Date.now()).format(
        "HH:mm:ss",
      );
      return [
        <>
          <Flex
            align={"center"}
            w={"100px"}
            justify={"space-between"}
            gap={10}
          >
            <NumberFormatter
              style={{
                color,
                fontSize: "12px",
                fontWeight: "500",
                width: "72px",
              }}
              value={price}
              fixedDecimalScale
              decimalScale={2}
              thousandSeparator
            />
            <Flex>{icon}</Flex>
          </Flex>
        </>,
        <Flex key="1" justify={"end"}>
          <NumberFormatter
            style={{
              fontSize: "12px",
              color: "white",
              fontWeight: "600",
            }}
            value={qty}
            fixedDecimalScale
            decimalScale={3}
            thousandSeparator
          />
        </Flex>,
        <Flex key="2" justify={"end"}>
          <Text
            style={{
              fontSize: "12px",
              color: "white",
              fontWeight: "600",
            }}
          >
            {time}
          </Text>
        </Flex>,
      ];
    }),
  ],
};
