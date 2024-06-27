import AppButton from "@/ui/Button/AppButton";
import AppTabs from "@/ui/Tabs";
import AppText from "@/ui/Text/AppText";
import { splitAndFormatString } from "@/utils/utility";
import { Box, Checkbox, Divider, Flex, Table, TableData } from "@mantine/core";
import { Fragment, useMemo, useState } from "react";
import { FilterGroupButtons } from "./FilterGroupButtons";
import { dataHistories } from "../tradeHistory";
import { IconArrowRight } from "@tabler/icons-react";

export function TabsOfTradeHistory() {
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
            <TablePositions />
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
        children: <TablePnL />,
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
            <TableCurrentOrders />
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
            <TableOrderHistory />
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
            <TableTradeHistory />
          </>
        ),
        value: "tradeHistory",
      },
    },
  ]);
  const onChange = (value: string | null) => {
    setActiveTab(value || "");
  };
  const rightOptions = useMemo(() => {
    return items
      .find((i) => i.data.value === activeTab)
      ?.data.options.actions.map((i, index) => (
        <Fragment key={index}>
          {i.startsWith("click") ? (
            <AppButton bg={"dark"} size="compact-xs" fz={12}>
              {splitAndFormatString(i)}
            </AppButton>
          ) : i.startsWith("link") ? (
            <AppText
              size="compact-xs"
              fz={12}
              c={"primary"}
              component="a"
              href="#"
            >
              {splitAndFormatString(i)}
            </AppText>
          ) : i.startsWith("check") ? (
            <Checkbox
              size="xs"
              label={splitAndFormatString(i)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            ""
          )}
        </Fragment>
      ));
  }, [activeTab, items]);

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
            {rightOptions}
          </Flex>
        }
        items={items}
        defaultValue={activeTab}
        instancetype="WithMediumNoBorder"
      />
    </>
  );
}

function TablePositions() {
  return (
    <>
      <Flex direction={"column"} h={"100%"}>
        <Box
          style={{ overflowY: "auto", overflowX: "auto" }}
          h={"100%"}
          className="box-scroll"
        >
          {dataHistories["positions"] && (
            <Table
              stickyHeader
              highlightOnHover
              withRowBorders={false}
              data={dataHistories["positions"]() as TableData}
              verticalSpacing={"xs"}
            />
          )}
        </Box>
        <Box className="text-border-middle" my={20}>
          <AppText
            instancetype="WithTextTooltip"
            c={"#71757a"}
            bg={"#101014"}
            w={"fit-content"}
            mx={"auto"}
            px={10}
            display={"flex"}
            style={{ alignItems: "center", gap: 0 }}
          >
                        Only the last 100 transactions are displayed on this page.
                        To view more, check out &nbsp;
            <AppText
              w={"fit-content"}
              fw={"bold"}
              instancetype="WithTextTooltip"
              component="a"
              href="#"
              display={"flex"}
              style={{ alignItems: "center", gap: 5 }}
            >
                            All Orders
              <IconArrowRight size={14} />
            </AppText>
          </AppText>
        </Box>
      </Flex>
    </>
  );
}

function TablePnL() {
  return (
    <Flex direction={"column"} h={"100%"}>
      <Box
        style={{ overflowY: "auto", overflowX: "auto" }}
        h={"100%"}
        className="box-scroll"
      >
        {dataHistories["PnL"] && (
          <Table
            stickyHeader
            highlightOnHover
            withRowBorders={false}
            data={dataHistories["PnL"]() as TableData}
            verticalSpacing={"xs"}
          />
        )}
      </Box>
      <Box className="text-border-middle" my={20}>
        <AppText
          instancetype="WithTextTooltip"
          c={"#71757a"}
          bg={"#101014"}
          w={"fit-content"}
          mx={"auto"}
          px={10}
          display={"flex"}
          style={{ alignItems: "center", gap: 0 }}
        >
                    Only the last 100 transactions are displayed on this page.
                    To view more, check out &nbsp;
          <AppText
            w={"fit-content"}
            fw={"bold"}
            instancetype="WithTextTooltip"
            component="a"
            href="#"
            display={"flex"}
            style={{ alignItems: "center", gap: 5 }}
          >
                        All Orders
            <IconArrowRight size={14} />
          </AppText>
        </AppText>
      </Box>
    </Flex>
  );
}

function TableCurrentOrders() {
  const [_t, setType] = useState<string>("Active");
  return (
    <>
      <Flex direction={"column"} h={"100%"}>
        <FilterGroupButtons
          onChange={(values) => {
            if (values[0]) {
              setType(values[0]);
            }
          }}
          items={[
            {
              label: "Active",
              order: 1,
              pos: "left",
              value: "Active",
            },
            {
              label: "Conditional",
              order: 1,
              pos: "left",
              value: "Conditional",
            },
            {
              label: "TP/SL",
              order: 1,
              pos: "left",
              value: "TPandSL",
            },
            {
              label: "Trailing Stop",
              order: 1,
              pos: "left",
              value: "TrailingStop",
            },
            {
              label: "MMR Close",
              order: 1,
              pos: "left",
              value: "MMRClose",
            },
          ]}
        />

        <Box
          style={{ overflowY: "auto", overflowX: "auto" }}
          h={"100%"}
          className="box-scroll"
        >
          {dataHistories["currentOrders"] && (
            <Table
              stickyHeader
              highlightOnHover
              withRowBorders={false}
              data={dataHistories["currentOrders"](_t) as TableData}
              verticalSpacing={"xs"}
            />
          )}
        </Box>
        <Box className="text-border-middle" my={20}>
          <AppText
            instancetype="WithTextTooltip"
            c={"#71757a"}
            bg={"#101014"}
            w={"fit-content"}
            mx={"auto"}
            px={10}
            display={"flex"}
            style={{ alignItems: "center", gap: 0 }}
          >
                        Only the last 100 transactions are displayed on this page.
                        To view more, check out &nbsp;
            <AppText
              w={"fit-content"}
              fw={"bold"}
              instancetype="WithTextTooltip"
              component="a"
              href="#"
              display={"flex"}
              style={{ alignItems: "center", gap: 5 }}
            >
                            All Orders
              <IconArrowRight size={14} />
            </AppText>
          </AppText>
        </Box>
      </Flex>
    </>
  );
}

function TableOrderHistory() {
  const [_t, setType] = useState<string>("limitAndMarket");
  return (
    <>
      <Flex direction={"column"} h={"100%"}>
        <FilterGroupButtons
          onChange={(values) => {
            if (values[0]) {
              setType(values[0]);
            }
          }}
          items={[
            {
              label: "Limit & Market",
              order: 1,
              pos: "left",
              value: "limitAndMarket",
            },
            {
              label: "Conditional",
              order: 1,
              pos: "left",
              value: "Conditional",
            },
            {
              label: "TP/SL",
              order: 1,
              pos: "left",
              value: "TPandSL",
            },
            {
              label: "Trailing Stop",
              order: 1,
              pos: "left",
              value: "TrailingStop",
            },
            {
              label: "MMR Close",
              order: 1,
              pos: "left",
              value: "MMRClose",
            },
            {
              label: "Last 7D",
              order: 1,
              pos: "right",
              value: "Last 7D",
            },
            {
              label: "Last 30D",
              order: 1,
              pos: "right",
              value: "Last 30D",
            },
            {
              label: "Last 180D",
              order: 1,
              pos: "right",
              value: "Last 180D",
            },
          ]}
        />
        <Box
          style={{ overflowY: "auto", overflowX: "auto" }}
          h={"100%"}
          className="box-scroll"
        >
          {dataHistories["orderHistory"] && (
            <Table
              stickyHeader
              highlightOnHover
              withRowBorders={false}
              data={dataHistories["orderHistory"](_t) as TableData}
              verticalSpacing={"xs"}
            />
          )}
        </Box>
        <Box w={"100%"} className="text-border-middle" my={20}>
          <AppText
            instancetype="WithTextTooltip"
            c={"#71757a"}
            bg={"#101014"}
            w={"fit-content"}
            mx={"auto"}
            px={10}
            display={"flex"}
            style={{ alignItems: "center", gap: 0 }}
          >
                        Only the last 100 transactions are displayed on this page.
                        To view more, check out &nbsp;
            <AppText
              w={"fit-content"}
              fw={"bold"}
              instancetype="WithTextTooltip"
              component="a"
              href="#"
              display={"flex"}
              style={{ alignItems: "center", gap: 5 }}
            >
                            All Orders
              <IconArrowRight size={14} />
            </AppText>
          </AppText>
        </Box>
      </Flex>
    </>
  );
}

function TableTradeHistory() {
  return (
    <>
      <Flex direction={"column"} h={"100%"}>
        <FilterGroupButtons
          items={[
            {
              label: "Last 7D",
              order: 1,
              pos: "right",
              value: "Last 7D",
            },
            {
              label: "Last 30D",
              order: 1,
              pos: "right",
              value: "Last 30D",
            },
            {
              label: "Last 180D",
              order: 1,
              pos: "right",
              value: "Last 180D",
            },
          ]}
        />
        <Box
          style={{ overflowY: "auto", overflowX: "auto" }}
          h={"100%"}
          className="box-scroll"
        >
          {dataHistories["tradeHistory"] && (
            <Table
              stickyHeader
              highlightOnHover
              withRowBorders={false}
              data={dataHistories["tradeHistory"]() as TableData}
              verticalSpacing={"xs"}
            />
          )}
        </Box>
        <Box className="text-border-middle" my={20}>
          <AppText
            instancetype="WithTextTooltip"
            c={"#71757a"}
            bg={"#101014"}
            w={"fit-content"}
            mx={"auto"}
            px={10}
            display={"flex"}
            style={{ alignItems: "center", gap: 0 }}
          >
                        Only the last 100 transactions are displayed on this page.
                        To view more, check out &nbsp;
            <AppText
              w={"fit-content"}
              fw={"bold"}
              instancetype="WithTextTooltip"
              component="a"
              href="#"
              display={"flex"}
              style={{ alignItems: "center", gap: 5 }}
            >
                            All Orders
              <IconArrowRight size={14} />
            </AppText>
          </AppText>
        </Box>
      </Flex>
    </>
  );
}
