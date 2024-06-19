/* eslint-disable react/prop-types */
import { IconSortUpDown, OptionFilter } from "@/routes/copy-trade";
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
    NumberFormatter,
    NumberInput,
    SegmentedControl,
    Space,
    Table,
    TableData,
    TextInput,
    alpha,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import {
    IconArrowRight,
    IconChevronLeft,
    IconChevronRight,
    IconEdit,
    IconInfoSmall,
    IconMenu2,
    IconPlus,
    IconPlusMinus,
    IconSearch,
    IconStar,
} from "@tabler/icons-react";
import { Fragment, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import AppButton from "../Button/AppButton";
import { AppCarousel } from "../Carousel/Carousel";
import { AppPopover } from "../Popover/AppPopover";
import AppText from "../Text/AppText";
import { dataHistories } from "./tradeHistory";
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
                                    <OrderBook />
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
                        <Forms />
                    </Box>
                </Grid.Col>
                <Grid.Col span={24}>
                    <Container fluid>
                        <Forms />
                        <Space mb={10} />
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
                    <AppPopover
                        withArrow={false}
                        position="bottom-start"
                        target={(props) => ({
                            children: (
                                <div onMouseLeave={props.close}
                                    style={{ cursor: "help" }}
                                    onMouseEnter={props.open}>
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
                            ),
                        })}
                        dropdown={() => ({
                            children: (
                                <div>
                                    <AppText instancetype="WithTextTooltip">
                                        <p>Funding fees will be exchanged between long and short position holders every 8 hours. Please note that the funding rate will fluctuate in real time every 8 hours. If the funding rate is positive upon settlement, long position holders will pay short position holders. If the funding rate is negative, short position holders will pay long position holders.</p>

                                        <p>Your position value at the timestamp when funding is settled will be used to derive your funding fees.</p>

                                        <p>Funding Fees = Position Value * Funding Rate</p>
                                    </AppText>

                                </div>
                            ),
                        })}
                    ></AppPopover>
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
                    <Box>
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
            <Box>
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
                children: <>
                    <TableCurrentOrders />
                </>,
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
                children: <>
                    <TableOrderHistory />
                </>,
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
                children: <>
                    <TableTradeHistory />
                </>,
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
    return (
        <>
            <Flex direction={"column"} h={"100%"}>
                <Box
                    style={{ overflowY: "auto", overflowX: "auto" }}
                    h={"100%"}
                    className="box-scroll"
                >
                    <Table
                        stickyHeader
                        highlightOnHover
                        withRowBorders={false}
                        data={dataHistories["positions"]!() as TableData}
                        verticalSpacing={"xs"}
                    />
                </Box>
                <Box className="text-border-middle" my={20}>
                    <AppText instancetype="WithTextTooltip" c={"#71757a"} bg={"#101014"} w={"fit-content"} mx={"auto"} px={10} display={"flex"} style={{ alignItems: "center", gap: 0 }}>
                        Only the last 100 transactions are displayed on this page. To view more, check out  &nbsp;
                        <AppText w={"fit-content"} fw={"bold"} instancetype="WithTextTooltip" component="a" href="#" display={"flex"} style={{ alignItems: "center", gap: 5 }}>
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
                <Table
                    stickyHeader
                    highlightOnHover
                    withRowBorders={false}
                    data={dataHistories["PnL"]!() as TableData}
                    verticalSpacing={"xs"}
                />

            </Box>
            <Box className="text-border-middle" my={20}>
                <AppText instancetype="WithTextTooltip" c={"#71757a"} bg={"#101014"} w={"fit-content"} mx={"auto"} px={10} display={"flex"} style={{ alignItems: "center", gap: 0 }}>
                    Only the last 100 transactions are displayed on this page. To view more, check out  &nbsp;
                    <AppText w={"fit-content"} fw={"bold"} instancetype="WithTextTooltip" component="a" href="#" display={"flex"} style={{ alignItems: "center", gap: 5 }}>
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
                    onChange={(values, valuesRight) => {
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
                    <Table
                        stickyHeader
                        highlightOnHover
                        withRowBorders={false}
                        data={dataHistories["currentOrders"]!(_t) as TableData}
                        verticalSpacing={"xs"}
                    />
                </Box>
                <Box className="text-border-middle" my={20}>
                    <AppText instancetype="WithTextTooltip" c={"#71757a"} bg={"#101014"} w={"fit-content"} mx={"auto"} px={10} display={"flex"} style={{ alignItems: "center", gap: 0 }}>
                        Only the last 100 transactions are displayed on this page. To view more, check out  &nbsp;
                        <AppText w={"fit-content"} fw={"bold"} instancetype="WithTextTooltip" component="a" href="#" display={"flex"} style={{ alignItems: "center", gap: 5 }}>
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
                    onChange={(values, valuesRight) => {
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
                        }
                    ]}
                />
                <Box
                    style={{ overflowY: "auto", overflowX: "auto" }}
                    h={"100%"}
                    className="box-scroll"
                >
                    <Table
                        stickyHeader
                        highlightOnHover
                        withRowBorders={false}
                        data={dataHistories["orderHistory"]!(_t) as TableData}
                        verticalSpacing={"xs"}
                    />
                </Box>
                <Box w={"100%"} className="text-border-middle" my={20}>
                    <AppText instancetype="WithTextTooltip" c={"#71757a"} bg={"#101014"} w={"fit-content"} mx={"auto"} px={10} display={"flex"} style={{ alignItems: "center", gap: 0 }}>
                        Only the last 100 transactions are displayed on this page. To view more, check out  &nbsp;
                        <AppText w={"fit-content"} fw={"bold"} instancetype="WithTextTooltip" component="a" href="#" display={"flex"} style={{ alignItems: "center", gap: 5 }}>
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
                <FilterGroupButtons items={[
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
                    }
                ]}
                />
                <Box
                    style={{ overflowY: "auto", overflowX: "auto" }}
                    h={"100%"}
                    className="box-scroll"
                >
                    <Table
                        stickyHeader
                        highlightOnHover
                        withRowBorders={false}
                        data={dataHistories["tradeHistory"]!() as TableData}
                        verticalSpacing={"xs"}
                    />

                </Box>
                <Box className="text-border-middle" my={20}>
                    <AppText instancetype="WithTextTooltip" c={"#71757a"} bg={"#101014"} w={"fit-content"} mx={"auto"} px={10} display={"flex"} style={{ alignItems: "center", gap: 0 }}>
                        Only the last 100 transactions are displayed on this page. To view more, check out  &nbsp;
                        <AppText w={"fit-content"} fw={"bold"} instancetype="WithTextTooltip" component="a" href="#" display={"flex"} style={{ alignItems: "center", gap: 5 }}>
                            All Orders
                            <IconArrowRight size={14} />
                        </AppText>
                    </AppText>
                </Box>
            </Flex>
        </>
    );
}

type FilterButtons = {
    value: string
    label: string
    order: number
    pos: "right" | "left"
};
type FilterGroupButtonsType = {
    items: FilterButtons[], value?: string, valueRight?: string, onChange?: (values: string[], valuesRight: string[]) => void
};
function FilterGroupButtons({ ...props }: FilterGroupButtonsType) {
    const [filterValues, setFilterValues] = useState<string[]>([props.value as string]);
    const [filterValuesRight, setFilterValuesRight] = useState<string[]>([props.valueRight as string]);

    useEffect(() => {
        const left = props.items.filter(i => i?.pos === "left").sort((a, b) => a?.order - b?.order) as FilterButtons[] ?? [];
        const right = props.items.filter(i => i?.pos === "right").sort((a, b) => a?.order - b?.order) as FilterButtons[] ?? [];
        if (left.length > 0) {
            setFilterValues([left[0].value]);
        }
        if (right.length > 0) {
            setFilterValuesRight([right[0].value]);
        }
    }, []);

    useEffect(() => {
        if (props.onChange) {
            props.onChange(filterValues, filterValuesRight);
        }
    }, [filterValues, filterValuesRight]);

    const _items = useMemo(() => {
        const left = props.items.filter(i => i?.pos === "left").sort((a, b) => a?.order - b?.order) as FilterButtons[];
        const right = props.items.filter(i => i?.pos === "right").sort((a, b) => a?.order - b?.order) as FilterButtons[];
        return {
            left,
            right
        };
    }, [items]);

    const _styles = useMemo(() => {
        return {
            left: {
                active: {
                    bg: "dark",
                },
                default: {
                    color: "light",
                    variant: "subtle",
                }
            },
            right: {
                active: {
                    color: "white",
                    fw: "bolder"
                },
                default: {
                    color: "light"
                }
            }
        };
    }, []);

    const onChange = useCallback((value: string, isRight = false) => {
        if (isRight) {
            setFilterValuesRight([value]);
        } else {
            setFilterValues([value]);
        }

    }, [filterValues]);



    return <>
        <Flex gap={12} my={10} align={"center"}>
            {_items.left.map((item: FilterButtons, i) => (
                <Fragment key={i}>
                    <AppButton
                        onClick={() => onChange(item.value)}
                        size="compact-xs"
                        fz={12}
                        value={item.value}
                        {...(filterValues.includes(item.value) ? _styles.left.active : _styles.left.default)}
                    >
                        {item.label}
                    </AppButton>
                </Fragment>
            ))}
            <Box>
                <Box h={20} w={1} bg={"dark"} />
            </Box>
            {_items.right.map((item: FilterButtons, i) => (
                <Fragment key={i}>
                    <AppButton
                        onClick={() => onChange(item.value, true)}
                        px={0}
                        size="compact-xs"
                        fz={12}
                        variant="subtle"
                        value={item.value}
                        {...(filterValuesRight.includes(item.value) ? _styles.right.active : _styles.right.default)}
                    >
                        {item.label}</AppButton>
                </Fragment>
            ))}
        </Flex>
    </>;
}


function OrderBook() {
    return (
        <>
            <AppTabs instancetype="WithMediumNoBorder" defaultValue={"1"} showPanel
                items={
                    [
                        {
                            data: {
                                label: "Order Book",
                                value: "1"
                            },
                            tabsPanelProps: {
                                children: (
                                    <>
                                        <div className="head_item_grid">
                                            <div className="head_item_grid--item head_item_grid--item-20">
                                                <AppText fz={10}>
                                                    Price(USDT)
                                                </AppText>
                                            </div>
                                            <div className="head_item_grid--item head_item_grid--item-40">
                                                <AppText fz={10}>
                                                    Qty(ETH)
                                                </AppText>
                                            </div>
                                            <div className="head_item_grid--item head_item_grid--item-40">
                                                <AppText fz={10}>
                                                    Total(ETH)
                                                </AppText>
                                            </div>
                                        </div>
                                        {
                                            [...Array(10)].map((item, i) => (
                                                <div className="row_item_grid" key={i}>
                                                    <div className="row_item_grid--item row_item_grid--item-20">
                                                        <AppText c={"red"} fz={12}>
                                                            <NumberFormatter thousandSeparator value={3422.52} />
                                                        </AppText>
                                                    </div>
                                                    <div className="row_item_grid--item row_item_grid--item-40">
                                                        <AppText fz={12}>
                                                            <NumberFormatter thousandSeparator value={Math.random() * 100} />
                                                        </AppText>
                                                    </div>
                                                    <div className="row_item_grid--item row_item_grid--item-40">
                                                        <AppText fz={12}>
                                                            <NumberFormatter thousandSeparator value={Math.random() * 100} />
                                                        </AppText>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                ),
                                value: "positions",
                            },

                        },
                        {
                            data: {
                                label: "Recent Trades",
                                value: "2"
                            },
                            tabsPanelProps: {
                                children: (
                                    <div></div>
                                ),
                                value: "2"
                            }
                        }
                    ]
                }
            />


        </>
    )
}


function Forms() {
    return (
        <>

            <SegmentedControl data={['Limit', 'Market', 'Conditional']} />
            <OptionFilter items={[
                {
                    label: "1",
                    value: "1"
                },
                {
                    label: "3",
                    value: "2"
                },

            ]} />
            <LimitFutureTradeForm />
        </>
    )
}

function LimitFutureTradeForm() {
    return (
        <>

            <NumberInput label="Order Price" rightSectionWidth={80} rightSection={
                <Flex align={"center"} gap={8}>
                    <AppPopover
                        withArrow={false}
                        width={"auto"}
                        target={(props) => ({
                            children: (
                                <AppText onMouseLeave={props.close} style={{
                                    cursor: "pointer"
                                }}
                                    onMouseEnter={props.open} fz={12} c={"primary"} fw={"bold"}>Last</AppText>
                            ),
                        })}
                        dropdown={() => ({
                            children: (
                                <div>
                                    <AppText instancetype="WithTextTooltip">
                                        Fill in the last traded price
                                    </AppText>
                                </div>
                            ),
                        })}
                    ></AppPopover>
                    <Box h={14} w={1} bg={"gray"}></Box>
                    <IconPlusMinus size={18} color="white" />
                </Flex>
            } />
        </>
    )
}
