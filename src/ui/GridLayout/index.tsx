/* eslint-disable react/prop-types */
import { IconSortUpDown } from "@/routes/copy-trade";
import AppTabs from "@/ui/Tabs";
import { shuffleArray } from "@/utils";
import { splitAndFormatString } from "@/utils/utility";
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Checkbox,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Input,
  InputProps,
  Menu,
  Space,
  Table,
  TableData,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import {
  IconChevronLeft,
  IconChevronRight,
  IconEdit,
  IconInfoSmall,
  IconMenu2,
  IconPlus,
  IconSearch,
  IconStar,
} from "@tabler/icons-react";
import { Fragment, useCallback, useMemo, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import AppButton from "../Button/AppButton";
import { AppCarousel } from "../Carousel/Carousel";
import { AppPopover } from "../Popover/AppPopover";
import AppText from "../Text/AppText";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const initialLayouts =
  // prettier-ignore
  "{\"lg\":[{\"x\":4,\"y\":0,\"w\":2,\"h\":5,\"i\":\"0\",\"static\":false},{\"x\":8,\"y\":0,\"w\":2,\"h\":5,\"i\":\"1\",\"static\":false},{\"x\":6,\"y\":0,\"w\":2,\"h\":4,\"i\":\"2\",\"static\":false}],\"md\":[{\"w\":7,\"h\":12,\"x\":0,\"y\":0,\"i\":\"0\",\"moved\":false,\"static\":false},{\"w\":3,\"h\":12,\"x\":7,\"y\":0,\"i\":\"1\",\"moved\":false,\"static\":false},{\"w\":10,\"h\":8,\"x\":0,\"y\":12,\"i\":\"2\",\"moved\":false,\"static\":false}]}";

const items = [
  {
    data: {
      value: "Favorites",
      label: "Favorites",
      options: {
        v1: ["Spot", "Derivatives"],
        v2: [],
      },
    },
  },
  {
    data: {
      value: "Spot",
      label: "Spot",
      options: {
        v1: [
          "USDT",
          "USDC",
          "USDE",
          "EUR",
          "BTC",
          "ETH",
          "DAI",
          "BRZ",
        ],
        v2: [
          "All",
          "New",
          "0 Fees",
          "Adventure Zone",
          "SOL Ecosystem",
          "ETH Ecosystem",
          "BTC Ecosystem",
          "AI",
          "Modular-BCs",
          "DePIN",
          "LSD",
          "DeFi",
          "GameFi",
          "Inscriptions",
          "Meme",
          "PoW",
          "Stablecoin",
          "Innovation Zone",
          "ETP (Leveraged Tokens)",
          "Margin Trading",
          "Launchpool",
          "Launchpad",
        ],
      },
    },
  },
  {
    data: {
      value: "Perpetual",
      label: "Perpetual",
      options: {
        v1: ["USDT", "USDC"],
        v2: [
          "TOP",
          "Trending",
          "New",
          "Meme",
          "BRC-20",
          "AI",
          "SOL Ecosystem",
          "ETH Staking",
          "Metaverse",
          "DeFi",
          "NFT",
          "Web3",
          "Innovation Zone",
          "Layer1",
          "Layer2",
        ],
      },
    },
  },
  {
    data: {
      value: "Futures",
      label: "Futures",
      options: {
        v1: ["USDC"],
        v2: [],
      },
    },
  },
  {
    data: {
      value: "Options",
      label: "Options",
      options: {
        v1: ["BTC", "ETH", "SOL"],
        v2: [],
      },
    },
  },
  {
    data: {
      value: "Margin Trading",
      label: "Margin Trading",
      options: {
        v1: ["USDT", "USDC", "BTC", "ETH"],
        v2: [
          "All",
          "0 Fees",
          "SOL Ecosystem",
          "ETH Ecosystem",
          "BTC Ecosystem",
          "AI",
          "Modular-BCs",
          "DePIN",
          "LSD",
          "DeFi",
          "GameFi",
          "Inscriptions",
          "Meme",
          "PoW",
          "Stablecoin",
          "Innovation Zone",
          "Margin Trading",
          "Launchpool",
        ],
      },
    },
  },
];

export function GridTrade() {
  const [layouts, setLayouts] = useState(
    JSON.parse(
      (localStorage.getItem("layoutTrade") as string) ??
        initialLayouts,
    ),
  );
  const onLayoutChange = useCallback(
    (...res: unknown[]) => {
      const [, layouts] = res;
      setLayouts(layouts);
      localStorage.setItem("layoutTrade", JSON.stringify(layouts));
    },
    [setLayouts],
  );

  return (
    <>
      <Grid columns={24} gutter={4} p={4}>
        <Grid.Col span={19}>
          <Grid gutter={4}>
            <Grid.Col>
              <TopBar />
            </Grid.Col>
            <Grid.Col>
              <ResponsiveReactGridLayout
                className="layout_trade"
                rowHeight={30}
                onLayoutChange={onLayoutChange}
                measureBeforeMount={false}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                margin={[4, 4]}
                containerPadding={[0, 0]}
                layouts={layouts}
                draggableHandle=".grid-item-drag-handle"
              >
                <div key={0} className="grid-item-box">
                  <Center h={"100%"}>Chart</Center>
                </div>
                <div key={1} className="grid-item-box">
                  <Center h={"100%"}>OrderBook</Center>
                </div>
                <div key={2} className="grid-item-box">
                  <TabsOfTradeHistory />
                </div>
              </ResponsiveReactGridLayout>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={5}>
          <Box bg={"#101014"} h={"100%"} p={10}>
            <Center h={"100%"}>Form trade</Center>
          </Box>
        </Grid.Col>
        <Grid.Col span={24}>
          <Container fluid>
            <TabsOfTradeHistory />
            <Space mb={10} />
            <Box w={400}>
              <MenuToken />
            </Box>
            <Space mb={10} />
            <SearchBox />
            <Space mb={10} />
            <TabSmall />
            <TableTokens />
            <Space mb={10} />

            <Space mb={10} />
          </Container>
        </Grid.Col>
      </Grid>
    </>
  );
}

function TopBar() {
  const { hovered, ref } = useHover();
  return (
    <>
      <Flex bg={"#101014"} align={"center"} gap={20} p={10}>
        <MenuToken />
        <Divider orientation="vertical" />
        <div>
          <AppText instancetype="withPriceLong" c={"green"}>
            3,541.57
          </AppText>
          <AppPopover
            withArrow={false}
            position="bottom-start"
            target={(props) => ({
              children: (
                <AppText
                  onMouseLeave={props.close}
                  style={{ cursor: "help" }}
                  onMouseEnter={props.open}
                  instancetype="WithTextSubtitle"
                  fw={"bold"}
                >
                  3,540.91
                </AppText>
              ),
            })}
            dropdown={() => ({
              children: (
                <div>
                  <AppText instancetype="WithTextTooltip">
                    Mark price is derived by index price and funding
                    rate, and reflects the fair market price.
                    Liquidation is triggered by mark price.
                  </AppText>
                  <AppText
                    component="a"
                    href="#"
                    instancetype="WithTextTooltip"
                    c={"primary"}
                  >
                    Click here for details
                  </AppText>
                </div>
              ),
            })}
          ></AppPopover>
        </div>
        <div>
          <AppText instancetype="withPriceTextStatus">
            Index Price
          </AppText>
          <AppText instancetype="WithTextSubtitle" fw={"bold"}>
            66,232.09
          </AppText>
        </div>
        <div>
          <AppText instancetype="withPriceTextStatus">
            24H Change %
          </AppText>
          <AppText instancetype="WithTextSubtitle" fw={"bold"}>
            +124.08 <span>(+3.61%)</span>
          </AppText>
        </div>
        <div>
          <AppText instancetype="withPriceTextStatus">
            24H High
          </AppText>
          <AppText instancetype="WithTextSubtitle" fw={"bold"}>
            3,655.35
          </AppText>
        </div>
        <div>
          <AppText instancetype="withPriceTextStatus">
            24H Low
          </AppText>
          <AppText instancetype="WithTextSubtitle" fw={"bold"}>
            3,428.56
          </AppText>
        </div>
        <div ref={ref}>
          {!hovered ? (
            <div>
              <AppText instancetype="withPriceTextStatus">
                24H Turnover(USDT)
              </AppText>
              <AppText instancetype="WithTextSubtitle" fw={"bold"}>
                1,455,440,962.99
              </AppText>
            </div>
          ) : (
            <div>
              <AppText instancetype="withPriceTextStatus">
                24H Volume
              </AppText>
              <AppText instancetype="WithTextSubtitle" fw={"bold"}>
                1,455,440,962.99
              </AppText>
            </div>
          )}
        </div>
        <div>
          <AppText instancetype="withPriceTextStatus">
            Open Interest(BTC)
          </AppText>
          <AppText instancetype="WithTextSubtitle" fw={"bold"}>
            1,455,440,962.99
          </AppText>
        </div>
        <div>
          <AppText instancetype="withPriceTextStatus">
            <span>Funding Rate</span>/ Countdown
          </AppText>
          <Flex gap={5}>
            <AppText
              instancetype="WithTextSubtitle"
              fw={"bold"}
              c={"primary"}
            >
              -0.006%
            </AppText>
            <AppText instancetype="WithTextSubtitle" fw={"bold"}>
              /
            </AppText>
            <AppText instancetype="WithTextSubtitle" fw={"bold"}>
              02:10:11
            </AppText>
          </Flex>
        </div>

        {/* <Button p={0} variant="transparent" c={"white"}>
                    <IconBook />
                </Button> */}
      </Flex>
    </>
  );
}

function SearchBox(props: Partial<InputProps>) {
  return (
    <>
      <Input
        variant="filled"
        placeholder="Search traders"
        leftSection={<IconSearch size={16} />}
        {...props}
      />
    </>
  );
}

function MenuToken() {
  return (
    <>
      <Menu
        trigger="hover"
        withinPortal
        position="bottom-start"
        width={500}
        closeDelay={300}
      >
        <Menu.Target>
          <Flex align={"center"} gap={10}>
            <IconMenu2 />
            <Avatar
              src={
                "https://www.bybit.com/bycsi-root/assets/image/coins/dark/eth.svg"
              }
            ></Avatar>
            <div>
              <Flex align={"center"} gap={5}>
                <AppText instancetype="WithTokenIcon">
                  ETHUSDT
                </AppText>
                <AppPopover
                  withArrow={false}
                  position="bottom-start"
                  withinPortal
                  zIndex={99999}
                  target={(props) => ({
                    children: (
                      <ActionIcon
                        onMouseEnter={props.open}
                        variant="light"
                        radius={"100%"}
                        size={20}
                        onMouseLeave={props.close}
                      >
                        <IconInfoSmall />
                      </ActionIcon>
                    ),
                  })}
                  dropdown={() => ({
                    children: (
                      <AppText instancetype="WithTextTooltip">
                        Ethereum USDT Perpetual,using USDT itself as
                        the collateral
                      </AppText>
                    ),
                  })}
                ></AppPopover>
              </Flex>

              <AppText instancetype="WithTextSubtitle">
                USDC Futures
              </AppText>
            </div>
          </Flex>
        </Menu.Target>
        <Menu.Dropdown
          variant="transparent"
          style={{ border: "none", borderRadius: 0 }}
        >
          <Box px={10} pt={10}>
            <SearchBox />
          </Box>
          <Space mb={5} />
          <TabSmall />
          <TableTokens />
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

function TabSmall() {
  const [activeTab, setActiveTab] = useState<string>("Favorites");
  const onChange = (value: string | null) => {
    setActiveTab(value || "");
  };
  const v1 = useMemo(() => {
    return items.find((i) => i.data.value === activeTab)?.data.options
      .v1 as [];
  }, [activeTab]);
  const v2 = useMemo(() => {
    return items.find((i) => i.data.value === activeTab)?.data.options
      .v2 as [];
  }, [activeTab]);

  return (
    <>
      <AppTabs
        onChange={onChange}
        items={items}
        defaultValue={activeTab}
        instancetype="WithSmallOnMenu"
      />
      <Space mb={10} />
      <Box px={10}>
        <Flex gap={5}>
          {v1.map((v, i) => (
            <AppButton
              key={i}
              size="xs"
              variant="light"
              color="primary"
              fz={12}
            >
              {v as string}
            </AppButton>
          ))}
        </Flex>
      </Box>
      {v2.length > 0 && (
        <>
          <Space mb={10} />
          <ListCateAsSlide items={v2} />
        </>
      )}
      <Space mb={10} />
    </>
  );
}

function TabsOfTradeHistory() {
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
          <div>
            <TablePositions />
          </div>
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
        children: <div>P&L</div>,
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
        children: <div>Current Orders (0)</div>,
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
        children: <div>Futures</div>,
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
        children: <div>tradeHistory</div>,
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

function ListCateAsSlide(props: Partial<{ items: string[] }>) {
  return (
    <>
      {props.items && props.items.length > 0 && (
        <AppCarousel
          previousControlIcon={<IconChevronLeft size={18} />}
          nextControlIcon={<IconChevronRight size={18} />}
          className="appCarouselText"
          slideGap={10}
          slideSize={100}
          styles={{}}
        >
          {(props.items ?? []).map((v, k) => (
            <div
              key={k}
              style={{
                whiteSpace: "nowrap",
                padding: "0px 10px",
                cursor: "pointer",
              }}
            >
              <AppText fz={14} instancetype="WidthHoverMainColor">
                {v}
              </AppText>
            </div>
          ))}
        </AppCarousel>
      )}
    </>
  );
}

function TableTokens() {
  const tableData = (): TableData => {
    const _items = [
      ["Trading Pairs"],
      ["Price"],
      ["24H %"],
      ["Volume"],
    ];
    const rows = [
      {
        icon: "https://www.bybit.com/bycsi-root/fop/9e97acce-0ffd-4148-8248-1720f6758fa0.svg",
        baseToken: "BTC",
        pairToken: "USDT",
        price: 67534.1,
        dayChange: -0.05,
        volume: 1000000000,
      },
      {
        icon: "https://www.bybit.com/bycsi-root/assets/image/coins/dark/skl.svg",
        baseToken: "SKL",
        pairToken: "USDT",
        price: 67534.1,
        dayChange: -0.05,
        volume: 1000000000,
      },
      {
        icon: "https://www.bybit.com/bycsi-root/assets/image/coins/dark/crv.svg",
        baseToken: "CRV",
        pairToken: "USDT",
        price: 67534.1,
        dayChange: -0.05,
        volume: 1000000000,
      },
      {
        icon: "https://www.bybit.com/bycsi-root/fop/6876d6bf-9409-43cb-85ed-9e63a0ca2022.svg",
        baseToken: "OMIT",
        pairToken: "USDT",
        price: 67534.1,
        dayChange: -0.05,
        volume: 1000000000,
      },
    ];
    const _rows = [
      ...shuffleArray(rows, 20),
      ...shuffleArray(rows, 20),
    ].map(
      (
        { baseToken, dayChange, icon, pairToken, price, volume },
        idx,
      ) => [
        <Flex key={`${idx}.1`} align={"center"} gap={10}>
          <IconStar size={15} />
          <Group gap={7} align="center">
            <Avatar src={icon} size={20} />
            <AppText instancetype="WithCellTokenInMenu">
              {`${baseToken}${pairToken}`}
            </AppText>
          </Group>
        </Flex>,
        <AppText key={1} fz={12} instancetype="withPriceCardTrade">
          {price}
        </AppText>,
        <AppText
          key={`${idx}.2`}
          fz={12}
          instancetype="withPriceCardTrade"
          c={dayChange > 0 ? "green" : dayChange < 0 ? "red" : ""}
        >
          {dayChange > 0 ? "+" : ""} {dayChange}%
        </AppText>,
        <AppText
          key={`${idx}.3`}
          fz={12}
          instancetype="withPriceCardTrade"
        >
          {volume}
        </AppText>,
      ],
    );
    return {
      head: _items.map(([text], i) => {
        return (
          <div key={i}>
            <IconSortUpDown
              pos={2}
              text={
                <AppText instancetype="WithTheadInMenu">
                  {text}
                </AppText>
              }
            />
          </div>
        );
      }),
      body: _rows,
    };
  };
  return (
    <Box style={{ overflowY: "auto", overflowX: "hidden" }} h={400}>
      <Table
        stickyHeader
        highlightOnHover
        withRowBorders={false}
        data={tableData()}
        verticalSpacing={"xs"}
      />
    </Box>
  );
}

function TablePositions() {
  const tableData = (): TableData => {
    const _items = [
      [
        "Contracts",
        "Contract name will always be displayed when you’re scrolling.",
      ],
      [
        "Qty",
        "A positive value of quantity indicates a long position, while a negative value indicates a short position",
      ],
      ["Value", "Notional value of the current position"],
      [
        "Entry Price",
        "The weighted average entry price of your positions",
      ],
      ["Mark Price"],
      [
        "Liq. Price",
        `The est. liquidation price for a USDT Perpetual position in your Unified Trading Account is affected by your average entry price, unrealized P&L, maintenance margin, and the available balance in your account.
                Having multiple positions simultaneously will affect the est. liquidation price for each position. Please note that the est. liquidation price is for reference only.
                Do note that liquidation is triggered when account maintenance margin rate reaches 100%.`,
      ],
      ["IM", "The amount of margin required to open your position"],
      [
        "MM",
        "The minimum amount of margin required for holding your positions.",
      ],
      [
        "Unrealized P&L (%)",
        "Unrealized profit loss and return on equity of this position",
      ],
      [
        "Realized P&L",
        "You can set or cancel take profit/stop loss and trailing stop orders here. Once placed, the order can be viewed under the Positions Tab.",
      ],
      [
        "TP/SL",
        "You can set or cancel take profit/stop loss and trailing stop orders here. Once placed, the order can be viewed under the Positions Tab.",
      ],
      [
        "Trailing Stop",
        "A trailing stop will allow a stop order to follow the last traded price based on a pre-set distance and direction, and will automatically move to lock in the profit or stop loss.",
      ],
      [
        "MMR Close",
        "When the account's Maintenance Margin Rate (MMR) reaches the preset Trigger MMR, a market close order for the entire position will be triggered.",
      ],
      [
        "Reverse Position",
        "The Quick Reverse Function lets you respond to trend changes in the market quickly with a click. With this feature, you can close open positions for the contract and then immediately open a new position in the opposite direction in the same action.",
      ],
      ["Close By"],
    ];
    const rows = [...Array(20)].map(() => ({
      icon: "https://www.bybit.com/bycsi-root/fop/9e97acce-0ffd-4148-8248-1720f6758fa0.svg",
      baseToken: "BTC",
      pairToken: "USDT",
      qty: -960.551,
      entryPrice: 67534.1,
      markPrice: 67534.1,
      liqPrice: [67534.1, null][Math.floor(Math.random() * 2)],
      value: 67534.1,
      IM: `6,226.2725 USDT
                    ≈6,226.27 USD`,
      MM: `1,275.2084 USDT
                    ≈1,275.20 USD`,
      unRealizedPnL: `1,786.6248 USDT
                    (28.69%)
                    ≈1,786.62 USD
                    `,
      realizedPnL: `2,417.9062 USDT
                    ≈2,417.90 USD`,
      tp: [67534.1 + 100, null][Math.floor(Math.random() * 2)],
      sl: [67534.1 - 100, null][Math.floor(Math.random() * 2)],
      TrailingStop: [
        `Trigger: 0.06250
                    ReTrackmen: 0.00005`,
        null,
      ][Math.floor(Math.random() * 2)],
      mmr: ["Trigger: ≥82.28%", null][Math.floor(Math.random() * 2)],
      isBuy: [true, false][Math.floor(Math.random() * 2)],
    }));
    const _rows = [
      ...shuffleArray(rows, 20),
      ...shuffleArray(rows, 20),
    ].map(
      (
        {
          baseToken,
          pairToken,
          entryPrice,
          qty,
          isBuy,
          value,
          markPrice,
          liqPrice,
          IM,
          MM,
          unRealizedPnL,
          realizedPnL,
          tp,
          sl,
          TrailingStop,
          mmr,
        },
        idx,
      ) => [
        <Flex key={`${idx}.1`} align={"center"} gap={8}>
          <Box bg={isBuy ? "green" : "red"} w={"2px"} h={30} />
          <div>
            <AppText instancetype="WithCellToken" fz={12}>
              {baseToken}
              {pairToken}
            </AppText>
            <AppText
              c={isBuy ? "green" : "red"}
              fz={12}
              fw={"bold"}
              style={{ whiteSpace: "nowrap" }}
            >
              Cross 10.00x
            </AppText>
          </div>
        </Flex>,
        <AppText
          key={`${idx}.2`}
          instancetype="WithCellToken"
          fz={12}
          c={isBuy ? "green" : "red"}
        >
          {qty}
        </AppText>,
        <AppText
          key={`${idx}.3`}
          instancetype="WithCellToken"
          fz={12}
        >
          {value}
        </AppText>,
        <AppText
          key={`${idx}.4`}
          instancetype="WithCellToken"
          fz={12}
        >
          {entryPrice}
        </AppText>,
        <AppText
          key={`${idx}.5`}
          instancetype="WithCellToken"
          fz={12}
        >
          {markPrice}
        </AppText>,
        <AppText
          key={`${idx}.6`}
          instancetype="WithCellToken"
          fz={12}
          c={"primary"}
        >
          {liqPrice ?? "--"}
        </AppText>,
        <Box key={`${idx}.7`} w={120}>
          <AppText instancetype="WithCellToken" fz={12}>
            {IM}
          </AppText>
        </Box>,
        <Box key={`${idx}.8`} w={120}>
          <AppText instancetype="WithCellToken" fz={12}>
            {MM}
          </AppText>
        </Box>,
        <AppPopover
          key={`${idx}.9`}
          withArrow={false}
          target={(props) => ({
            children: (
              <AppText
                onMouseEnter={props.open}
                onMouseLeave={props.close}
                instancetype="WithCellToken"
                fz={12}
                c={isBuy ? "green" : "red"}
              >
                {unRealizedPnL}
              </AppText>
            ),
          })}
          dropdown={() => ({
            children: (
              <AppText instancetype="WithTextTooltip">
                By default, the unrealized profit and loss are
                calculated based on the last traded price. When you
                move your cursor here, the unrealized profit and loss
                shown are calculated based on the mark price
              </AppText>
            ),
          })}
        ></AppPopover>,
        <Box w={120} key={`${idx}.10`}>
          <AppText
            instancetype="WithCellToken"
            fz={12}
            c={isBuy ? "green" : "red"}
          >
            {realizedPnL}
          </AppText>
        </Box>,
        <Flex gap={10} align={"center"} key={`${idx}.11`}>
          {tp && sl ? (
            <>
              <Flex align={"center"} direction={"column"} gap={0}>
                <AppText
                  c={"green"}
                  instancetype="WithCellToken"
                  fz={12}
                  fw={"bold"}
                >
                  {tp}
                </AppText>
                <Flex align={"center"} gap={0}>
                  <AppText
                    instancetype="WithCellToken"
                    fz={12}
                    fw={"bold"}
                  >
                    /
                  </AppText>
                  <AppText
                    c={"red"}
                    instancetype="WithCellToken"
                    fz={12}
                    fw={"bold"}
                  >
                    {sl}
                  </AppText>
                </Flex>
              </Flex>
              <AppButton
                variant="outline"
                color="gray"
                size="compact-xs"
              >
                <IconEdit size={10} />
              </AppButton>
            </>
          ) : (
            <AppButton bg={"dark"} size="compact-xs" fz={12}>
              <IconPlus size={16} />
              Add
            </AppButton>
          )}
        </Flex>,
        <Flex w={180} align={"center"} gap={5} key={`${idx}.12`}>
          {TrailingStop ? (
            <>
              <AppText instancetype="WithCellToken" fz={12}>
                {TrailingStop}
              </AppText>
              <Box>
                <AppButton
                  variant="outline"
                  color="gray"
                  size="compact-xs"
                >
                  <IconEdit size={10} />
                </AppButton>
              </Box>
            </>
          ) : (
            <AppButton bg={"dark"} size="compact-xs" fz={12}>
              <IconPlus size={16} />
              Add
            </AppButton>
          )}
        </Flex>,
        <Flex w={170} align={"center"} gap={10} key={`${idx}.13`}>
          {mmr ? (
            <>
              <AppText instancetype="WithCellToken" fz={12}>
                {mmr}
              </AppText>
              <Box>
                <AppButton
                  variant="outline"
                  color="gray"
                  size="compact-xs"
                >
                  <IconEdit size={10} />
                </AppButton>
              </Box>
            </>
          ) : (
            <AppButton bg={"dark"} size="compact-xs" fz={12}>
              <IconPlus size={16} />
              Add
            </AppButton>
          )}
        </Flex>,
        <AppText
          instancetype="WithCellToken"
          fz={12}
          key={`${idx}.14`}
        >
          <AppButton bg={"dark"} size="compact-xs" fz={12}>
            Reverse
          </AppButton>
        </AppText>,
        <Flex key={`${idx}.15`} gap={10}>
          <AppButton bg={"dark"} size="compact-xs" fz={12}>
            Limit
          </AppButton>
          <AppButton bg={"dark"} size="compact-xs" fz={12}>
            Market
          </AppButton>
        </Flex>,
      ],
    );
    return {
      head: _items.map(([text, tooltip], i) => {
        return (
          <div key={i}>
            {tooltip ? (
              <AppPopover
                withArrow={false}
                target={(props) => ({
                  children: (
                    <AppText
                      className="cursor-pointer"
                      fz={12}
                      c={"#71757a"}
                      onMouseEnter={props.open}
                      onMouseLeave={props.close}
                      style={{
                        borderBottom: "solid 1px #595d61",
                        whiteSpace: "nowrap",
                        width: "fit-content",
                      }}
                    >
                      {text}
                    </AppText>
                  ),
                })}
                dropdown={() => ({
                  children: (
                    <AppText instancetype="WithTextTooltip">
                      {tooltip}
                    </AppText>
                  ),
                })}
              ></AppPopover>
            ) : (
              <AppText
                className="cursor-pointer"
                fz={12}
                c={"#71757a"}
                style={{
                  borderBottom: "solid 1px #595d61",
                  whiteSpace: "nowrap",
                  width: "fit-content",
                }}
              >
                {text}
              </AppText>
            )}
          </div>
        );
      }),
      body: _rows,
    };
  };
  return (
    <Box
      style={{ overflowY: "auto", overflowX: "auto" }}
      h={400}
      className="box-scroll"
    >
      <Table
        stickyHeader
        highlightOnHover
        withRowBorders={false}
        data={tableData()}
        verticalSpacing={"xs"}
      />
    </Box>
  );
}
