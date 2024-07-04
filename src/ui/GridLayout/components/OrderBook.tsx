import AppTabs from "@/ui/Tabs";
import AppText from "@/ui/Text/AppText";
import { Box, Button, Center, Flex, HoverCard, Image, NumberFormatter, SegmentedControl, Select, Space, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconArrowUp, IconCaretDownFilled, IconFlag, IconFlagFilled } from "@tabler/icons-react";
import React, { useState } from "react";
import orderAll from "@/assets/images/icon/orderAll.svg";
import orderBuy from "@/assets/images/icon/orderBuy.svg";
import orderSell from "@/assets/images/icon/orderSell.svg";
import orderHorizontal from "@/assets/images/icon/orderHorizontal.svg";
import { AskOrderBookTrade, BidOrderBookTrade, GridRecentTrade, OrderAllOrderBookTrade, OrderHorizontalOrderBookTrade } from ".";

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
              children: (
                <GridOrderBook />
              ),
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

type GridTypes = "orderAll" | "orderHorizontal" | "orderBuy" | "orderSell";
function GridOrderBook() {
  const [gridType, setGridType] = useState<GridTypes>("orderAll");
  const w = 14;
  return (
    <>
      <>
        <Flex align={"center"} justify={"space-between"} px={10} py={5}>
          <Box>
            <SegmentedControl
              withItemsBorders={false}
              size="sm"
              onChange={(v) => setGridType(v as GridTypes)}
              value={gridType}
              styles={{
                root: {
                  background: "none"
                },
              }}
              data={[
                {
                  value: "orderAll",
                  label: (
                    <Box w={w}>
                      <Image src={orderAll} />
                    </Box>
                  ),
                },
                {
                  value: "orderHorizontal",
                  label: (
                    <Box w={w}>
                      <Image src={orderHorizontal} />
                    </Box>
                  ),
                },
                {
                  value: "orderBuy",
                  label: (
                    <Box w={w}>
                      <Image src={orderBuy} />
                    </Box>
                  ),
                },
                {
                  value: "orderSell",
                  label: (
                    <Box w={w}>
                      <Image src={orderSell} />
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
                  color: "white",
                  background: "#26282c",
                  minHeight: "unset",
                  height: "24px",
                },
                option: {
                  fontSize: "12px",
                  textAlign: "center",
                  justifyContent: "center",
                  fontWeight: "bold"
                },
              }}
            />
          </Box>
        </Flex>
        {gridType === "orderAll" && <OrderAllOrderBookTrade/>}
        {gridType === "orderHorizontal" && <OrderHorizontalOrderBookTrade/> }
        {gridType === "orderBuy" && <BidOrderBookTrade/>}
        {gridType === "orderSell" && <AskOrderBookTrade/>}
      </>
    </>
  );
}



