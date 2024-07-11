import orderAll from "@/assets/images/icon/orderAll.svg";
import orderBuy from "@/assets/images/icon/orderBuy.svg";
import orderHorizontal from "@/assets/images/icon/orderHorizontal.svg";
import orderSell from "@/assets/images/icon/orderSell.svg";

import orderAllLight from "@/assets/images/icon/orderAll-light.svg";
import orderBuyLight from "@/assets/images/icon/orderBuy-light.svg";
import orderHorizontalLight from "@/assets/images/icon/orderHorizontal-light.svg";
import orderSellLight from "@/assets/images/icon/orderSell-light.svg";


import AppTabs from "@/ui/Tabs";
import {
  Box,
  Flex,
  Image,
  SegmentedControl,
  Select,
} from "@mantine/core";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { useState } from "react";
import {
  AskOrderBookTrade,
  BidOrderBookTrade,
  GridRecentTrade,
  OrderAllOrderBookTrade,
  OrderHorizontalOrderBookTrade,
} from ".";

export function OrderBook() {
  return (
    <>
      <AppTabs
        instancetype="WithMediumNoBorder"
        className="noBg"
        defaultValue={"1"}
        showPanel
        items={[
          {
            data: {
              label: "Order Book",
              value: "1",
            },
            tabsPanelProps: {
              children: <GridOrderBook />,
              value: "positions",
            },
          },
          {
            data: {
              label: "Recent Trades",
              value: "2",
            },
            tabsPanelProps: {
              children: <GridRecentTrade />,
              value: "2",
            },
          },
        ]}
      />
    </>
  );
}

type GridTypes =
  | "orderAll"
  | "orderHorizontal"
  | "orderBuy"
  | "orderSell";
function GridOrderBook() {
  const [gridType, setGridType] = useState<GridTypes>("orderAll");
  const w = 14;
  return (
    <>
      <>
        <Flex
          align={"center"}
          justify={"space-between"}
          px={10}
          py={5}
        >
          <Box>
            <SegmentedControl
              withItemsBorders={false}
              size="sm"
              onChange={(v) => setGridType(v as GridTypes)}
              value={gridType}
              styles={{
                root: {
                  background: "none",
                },
              }}
              data={[
                {
                  value: "orderAll",
                  label: (
                    <Box w={w}>
                      <Image lightHidden src={orderAll} />
                      <Image darkHidden src={orderAllLight} />
                    </Box>
                  ),
                },
                {
                  value: "orderHorizontal",
                  label: (
                    <Box w={w}>
                      <Image lightHidden src={orderHorizontal} />
                      <Image darkHidden src={orderHorizontalLight} />
                    </Box>
                  ),
                },
                {
                  value: "orderBuy",
                  label: (
                    <Box w={w}>
                      <Image lightHidden src={orderBuy} />
                      <Image darkHidden src={orderBuyLight} />
                    </Box>
                  ),
                },
                {
                  value: "orderSell",
                  label: (
                    <Box w={w}>
                      <Image lightHidden src={orderSell} />
                      <Image darkHidden src={orderSellLight} />
                    </Box>
                  ),
                },
              ]}
            />
          </Box>
          <Box>
            <Select
              w={80}
              data={["0.1", "0.2", "0.4", "1", "2", "5", "10"]}
              defaultValue="0.1"
              withCheckIcon={false}
              rightSection={<IconCaretDownFilled size={14} />}
              allowDeselect={false}
              rightSectionWidth={20}
              size="xs"
              classNames={{
                root: "app-select",
                option: "app-select-option",
              }}
              comboboxProps={{
                position: "bottom",
                offset: 0,
                withinPortal: true,
              }}
              styles={{
                input: {
                  border: "none",
                  fontSize: "12px",
                  textAlign: "center",
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: 0,
                  fontWeight: "bold",
                  color: "light-dark(black, white)",
                  background: "light-dark(#f3f5f7, #26282c)",
                  minHeight: "unset",
                  height: "24px",
                },
                option: {
                  fontSize: "12px",
                  textAlign: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                },
              }}
            />
          </Box>
        </Flex>
        {gridType === "orderAll" && <OrderAllOrderBookTrade />}
        {gridType === "orderHorizontal" && (
          <OrderHorizontalOrderBookTrade />
        )}
        {gridType === "orderBuy" && <BidOrderBookTrade />}
        {gridType === "orderSell" && <AskOrderBookTrade />}
      </>
    </>
  );
}
