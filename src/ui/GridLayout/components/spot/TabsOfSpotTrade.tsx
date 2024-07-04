import AppButton from "@/ui/Button/AppButton";
import AppTabs from "@/ui/Tabs";
import AppText from "@/ui/Text/AppText";
import { Box, Checkbox, Divider, Flex, Table, TableData } from "@mantine/core";
import { Fragment, useMemo, useState } from "react";

export function TabsOfSpotTradeHistory() {
  const [activeTab, setActiveTab] = useState<string>("positions");
  const [items] = useState([
    {
      data: {
        value: "positions",
        label: "Positions (0)",
        options: {
          actions: ["checkShowAllPositions", "clickCloseAll"],
        },
      },
      tabsPanelProps: {
        children: (
          <>
            xx
          </>
        ),
        value: "positions",
      },
    },
    {
      data: {
        value: "PnL",
        label: "P&L",
        options: {
          actions: ["linkToAllOrder"],
        },
      },
      tabsPanelProps: {
        children: (
          <>
            <div></div>
          </>
        ),
        value: "PnL",
      },
    },
    {
      data: {
        value: "currentOrders",
        label: "Current Orders (0)",
        options: {
          actions: ["checkAllActiveOrders", "clickCancelAll"],
        },
      },
      tabsPanelProps: {
        children: (
          <>
            <div></div>
          </>
        ),
        value: "currentOrders",
      },
    },
    {
      data: {
        value: "orderHistory",
        label: "Order History",
        options: {
          actions: ["linkToAllOrder"],
        },
      },
      tabsPanelProps: {
        children: (
          <>
            <div></div>
          </>
        ),
        value: "orderHistory",
      },
    },
    {
      data: {
        value: "tradeHistory",
        label: "Trade History",
        options: {
          actions: ["linkToAllOrder"],
        },
      },
      tabsPanelProps: {
        children: (
          <>
            <div></div>
          </>
        ),
        value: "tradeHistory",
      },
    },
  ]);
  const onChange = (value: string | null) => {
    setActiveTab(value || "");
  };

  return (
    <>
      <AppTabs
        value={activeTab}
        showPanel
        onChange={onChange}
        leftSection={
          <Flex gap={10} align={"center"}>
            <AppText instancetype="withPriceLong" c={"primary"}>
              Trade (Demo Trading)
            </AppText>
            <Divider
              style={{ alignSelf: "center" }}
              h={16}
              orientation="vertical"
            />
          </Flex>
        }
        rightSection={
          <Flex align={"center"} gap={10}>
            <Box
              className="grid-item-drag-handle"
              w={100}
              style={{ alignSelf: "stretch" }}
            ></Box>
            rightOptions
          </Flex>
        }
        items={items}
        defaultValue={activeTab}
        instancetype="WithMediumNoBorder"
      />
    </>
  );
}
