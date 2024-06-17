/* eslint-disable react/prop-types */
import useMetadata from "@/hooks/useMetadata";
import AppButton from "@/ui/Button/AppButton";
import AppCard from "@/ui/Card/AppCard";
import AppPill from "@/ui/Pill/AppPill";
import { AppPopover } from "@/ui/Popover/AppPopover";
import AppText from "@/ui/Text/AppText";
import {
  Avatar,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Pagination,
  Progress,
  Select,
  SimpleGrid,
  Space,
  Tabs,
} from "@mantine/core";
import {
  IconChartInfographic,
  IconChartPie,
  IconChevronRight,
  IconCoinBitcoin,
  IconHelp,
  IconShare,
  IconStar,
} from "@tabler/icons-react";
import { Fragment, useState } from "react";
import { OptionFilter } from "../copy-trade";
import { Footer, Header } from "../top-page";
import "./index.module.scss";

export default function CopyTradeDetail() {
  const { data } = useMetadata();
  return (
    <>
      <Header metadata={data} />
      <Banner />
      <Box className="bg-copy-trade">
        <Container>
          <Grid gutter={21} py={21}>
            <Grid.Col span={4}>
              <Flex direction={"column"} gap={21}>
                <AppCard>
                  <Performance />
                </AppCard>
                <AppCard>
                  <Profit />
                </AppCard>
              </Flex>
            </Grid.Col>
            <Grid.Col span={8}>
              <AppCard>
                <Statistics />
              </AppCard>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
      {data && <Footer metadata={data} />}
    </>
  );
}

function Banner() {
  return (
    <>
      <Box className="banner-copy-detail">
        <Container h={"100%"}>
          <Center w={"100%"} h={"100%"}>
            <Flex w={"100%"} justify={"space-between"}>
              <Box>
                <Flex gap={36}>
                  <Avatar
                    size={126}
                    src={
                      "https://www.bybit.com/bycsi-root/fop/copytrade/a6fc7bce-dc27-4bd0-94ec-38f9046c50b0.jpg?format=avif&quality=40"
                    }
                  />
                  <Box>
                    <Group>
                      <AppText fz={32} c={"white"} fw={"bold"}>
                        KING 👑
                      </AppText>
                      <AppPopover
                        target={(props) => ({
                          children: (
                            <AppText
                              className="cursor-pointer"
                              fz={12}
                              fw={"bold"}
                              c={"white"}
                              onMouseEnter={props.open}
                              onMouseLeave={props.close}
                              component="span"
                            >
                              Bronze
                            </AppText>
                          ),
                        })}
                        dropdown={() => ({
                          children: (
                            <Box>
                              <AppText fz={16} fw={"bold"}>
                                Master Trader Rank
                              </AppText>
                              <AppText fz={14} fw={"bold"}>
                                Cadet to Bronze
                              </AppText>
                              <Space mb={5} />
                              <AppText c={"gray"} fz={12} fw={"bold"}>
                                Update Time 2024-06-08
                              </AppText>
                              <AppText c={"gray"} fz={12} fw={"bold"}>
                                View{" "}
                                <AppText
                                  component="a"
                                  href="#"
                                  c={"primary"}
                                  fz={12}
                                >
                                  Bybit Master Trader Level System
                                </AppText>
                              </AppText>
                            </Box>
                          ),
                        })}
                      ></AppPopover>
                    </Group>
                    <Space mb={10} />
                    <Box>
                      <Flex gap={24} align={"center"}>
                        <Box>
                          <AppPopover
                            width={200}
                            target={(props) => ({
                              children: (
                                <AppText
                                  className="cursor-pointer"
                                  instancetype="WithSize14Gray"
                                  onMouseEnter={props.open}
                                  onMouseLeave={props.close}
                                  component="span"
                                >
                                  Follower(s)
                                </AppText>
                              ),
                            })}
                            dropdown={() => ({
                              children: (
                                <AppText
                                  fz={12}
                                  style={{ textAlign: "center" }}
                                >
                                  No. of Current Follower(s)
                                </AppText>
                              ),
                            })}
                          ></AppPopover>
                          <AppText c={"white"} fw={"bolder"} fz={24}>
                            122
                          </AppText>
                        </Box>
                        <Box>
                          <Divider
                            h={32}
                            orientation="vertical"
                            color={"#404347"}
                          />
                        </Box>
                        <Box>
                          <AppPopover
                            width={200}
                            target={(props) => ({
                              children: (
                                <AppText
                                  className="cursor-pointer"
                                  instancetype="WithSize14Gray"
                                  component="span"
                                  onMouseEnter={props.open}
                                  onMouseLeave={props.close}
                                >
                                  Trading Days
                                </AppText>
                              ),
                            })}
                            dropdown={() => ({
                              children: (
                                <AppText
                                  fz={12}
                                  style={{ textAlign: "center" }}
                                >
                                  The days when a Master Trader holds
                                  open positions.
                                </AppText>
                              ),
                            })}
                          ></AppPopover>
                          <AppText c={"white"} fw={"bolder"} fz={24}>
                            37
                          </AppText>
                        </Box>
                        <Box>
                          <Divider
                            h={32}
                            orientation="vertical"
                            color={"#404347"}
                          />
                        </Box>
                        <Box>
                          <AppPopover
                            width={200}
                            target={(props) => ({
                              children: (
                                <AppText
                                  className="cursor-pointer"
                                  instancetype="WithSize14Gray"
                                  component="span"
                                  onMouseEnter={props.open}
                                  onMouseLeave={props.close}
                                >
                                  Stability Index
                                </AppText>
                              ),
                            })}
                            dropdown={() => ({
                              children: (
                                <AppText
                                  fz={12}
                                  style={{ textAlign: "center" }}
                                >
                                  Using advanced analytics, the
                                  Stability Index gauges how well
                                  Master Traders are dealing with
                                  volatility.
                                </AppText>
                              ),
                            })}
                          ></AppPopover>
                          <AppText c={"white"} fw={"bolder"} fz={24}>
                            3.0/5.0
                          </AppText>
                        </Box>
                      </Flex>
                    </Box>
                    <Space mb={30} />
                    <Box>
                      <Flex gap={16} align={"center"}>
                        <Box>
                          <Group align="center" gap={5}>
                            <IconCoinBitcoin
                              color="white"
                              width={20}
                            />
                            <AppText c={"white"} fz={14}>
                              AUM72,633.38 USDT
                            </AppText>
                          </Group>
                        </Box>
                        <Box>
                          <Divider
                            h={12}
                            orientation="vertical"
                            color={"#404347"}
                          />
                        </Box>
                        <Box>
                          <Group align="center" gap={10}>
                            <AppPopover
                              width={200}
                              target={(props) => ({
                                children: (
                                  <Group gap={5} align="center">
                                    <IconChartInfographic
                                      color="white"
                                      width={20}
                                    />
                                    <AppText
                                      c={"white"}
                                      fz={14}
                                      className="cursor-pointer"
                                      onMouseEnter={props.open}
                                      onMouseLeave={props.close}
                                    >
                                      Total Assets ***** USDT
                                    </AppText>
                                  </Group>
                                ),
                              })}
                              dropdown={() => ({
                                children: (
                                  <AppText
                                    fz={12}
                                    style={{ textAlign: "center" }}
                                  >
                                    All assets a Master Trader owns in
                                    the Copy Trading Account.
                                  </AppText>
                                ),
                              })}
                            ></AppPopover>
                            <Flex align={"center"}>
                              <AppPopover
                                width={200}
                                target={(props) => ({
                                  children: (
                                    <AppText
                                      h={26}
                                      className="cursor-pointer"
                                      onMouseEnter={props.open}
                                      onMouseLeave={props.close}
                                    >
                                      <IconHelp
                                        color="gray"
                                        width={14}
                                      />
                                    </AppText>
                                  ),
                                })}
                                dropdown={() => ({
                                  children: (
                                    <AppText
                                      fz={12}
                                      style={{ textAlign: "center" }}
                                    >
                                      This trader has hidden asset
                                      info from non-Followers
                                    </AppText>
                                  ),
                                })}
                              ></AppPopover>
                            </Flex>
                          </Group>
                        </Box>
                        <Box>
                          <Divider
                            h={12}
                            orientation="vertical"
                            color={"#404347"}
                          />
                        </Box>
                        <Box>
                          <Flex align={"center"} gap={10}>
                            <IconChartPie color="white" width={20} />
                            <AppText c={"white"} fz={14}>
                              Profit Sharing 10%
                            </AppText>
                          </Flex>
                        </Box>
                      </Flex>
                      <Space mb={10} />
                      <Flex gap={8}>
                        <AppPopover
                          width={300}
                          target={(props) => ({
                            children: (
                              <div
                                className="cursor-pointer"
                                onMouseEnter={props.open}
                                onMouseLeave={props.close}
                              >
                                <AppPill
                                  instancetype="WithTagSmall"
                                  c={"#6c8bb8"}
                                  bg={"rgba(92,135,199,.16)"}
                                >
                                  High Leverage
                                </AppPill>
                              </div>
                            ),
                          })}
                          dropdown={() => ({
                            children: (
                              <>
                                <AppText fw={"bold"}>
                                  High Leverage
                                </AppText>
                                <AppText instancetype="WithTextTooltip">
                                  Traders whose average leverage used
                                  in the last 30 days is above 30X.
                                </AppText>
                              </>
                            ),
                          })}
                        ></AppPopover>
                        <AppPopover
                          width={300}
                          target={(props) => ({
                            children: (
                              <div
                                className="cursor-pointer"
                                onMouseEnter={props.open}
                                onMouseLeave={props.close}
                              >
                                <AppPill
                                  instancetype="WithTagSmall"
                                  c={"#6c8bb8"}
                                  bg={"rgba(92,135,199,.16)"}
                                >
                                  Money Maker
                                </AppPill>
                              </div>
                            ),
                          })}
                          dropdown={() => ({
                            children: (
                              <>
                                <AppText fw={"bold"}>
                                  Money Maker
                                </AppText>
                                <AppText instancetype="WithTextTooltip">
                                  Earn more than 50USDT in profits for
                                  your Followers.
                                </AppText>
                              </>
                            ),
                          })}
                        ></AppPopover>
                      </Flex>
                    </Box>
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Flex gap={20} align={"center"}>
                  <Group gap={10} className="cursor-pointer">
                    <IconShare color="white" width={20} />
                    <AppText fz={12} c={"white"} fw={"bold"}>
                      Share
                    </AppText>
                  </Group>
                  <Box>
                    <Divider
                      h={14}
                      orientation="vertical"
                      color={"#404347"}
                    />
                  </Box>
                  <Group gap={10} className="cursor-pointer">
                    <IconStar color="white" width={20} />
                    <AppText fz={12} c={"white"} fw={"bold"}>
                      Subscribe
                    </AppText>
                  </Group>
                </Flex>
                <Space mb={24} />
                <AppButton instancetype="WithGradient">
                  Copy
                </AppButton>
                <Space mb={10} />
                <AppText
                  style={{ textAlign: "center" }}
                  c={"white"}
                  fz={12}
                >
                  <AppText
                    fw={900}
                    variant="gradient"
                    component="span"
                    gradient={{
                      from: "orange",
                      to: "yellow",
                      deg: 90,
                    }}
                  >
                    128
                  </AppText>{" "}
                  Slots Left
                </AppText>
                {/* <Space mb={10} /> */}
                <AppText
                  fz={12}
                  style={{ textAlign: "center" }}
                  c={"#595d61"}
                >
                  7-Day Views: 8920
                </AppText>
              </Box>
            </Flex>
          </Center>
        </Container>
      </Box>
    </>
  );
}

function Performance() {
  const items = [
    [
      "Profit-to-Loss Ratio",
      "3.41 : 1",
      "The ratio of average profit per winning order to average loss per losing order.",
    ],
    [
      "Weekly Trades",
      "1.39",
      "The average number of trades the Master Trader made weekly in the last month.",
    ],
    [
      "Avg. Holding Time",
      "1.71Days",
      "The average position holding period of all closed positions",
    ],
    [
      "ROI Volatility",
      "22.11%",
      "Higher value indicates less stable returns.",
    ],
    [
      "Sharpe Ratio",
      "0.08",
      "Higher value indicates better returns at same level of ROI volatility.",
    ],
    [
      "Sortino Ratio",
      "3.10",
      "Higher value indicates better returns at same level of risk of loss.",
    ],
    [
      "Last Traded at",
      "2024-06-07 02:12:08",
      "The last time the Master Trader opened or closed a position.",
    ],
  ];
  return (
    <>
      <Group justify="space-between" p={0} m={0}>
        <AppText fz={16} fw={"bold"}>
          Performance
        </AppText>
        <OptionFilter
          items={[
            {
              label: "7 Days",
              value: "7D",
            },
            {
              label: "30 Days",
              value: "30",
            },
            {
              label: "90 Days",
              value: "90",
            },
          ]}
        />
      </Group>
      <Space mb={10} />
      <Divider h={1} color="#f3f5f7" />
      <Space mb={10} />
      <SimpleGrid cols={2}>
        <div>
          <AppPopover
            width={200}
            target={(props) => ({
              children: (
                <AppText
                  component="span"
                  instancetype="WidthTooltipGray"
                  className="cursor-pointer"
                  onMouseEnter={props.open}
                  onMouseLeave={props.close}
                >
                  ROI
                </AppText>
              ),
            })}
            dropdown={() => ({
              children: (
                <AppText instancetype="WithTextTooltip">
                  ROI is a performance measure used to evaluate the
                  efficiency or profitability of a Master Trader.
                </AppText>
              ),
            })}
          ></AppPopover>
          <AppText instancetype="withPriceLong" c={"green"}>
            +18.45%
          </AppText>
        </div>
        <Flex align={"end"} direction={"column"}>
          <AppPopover
            width={200}
            target={(props) => ({
              children: (
                <AppText
                  component="span"
                  instancetype="WidthTooltipGray"
                  className="cursor-pointer"
                  onMouseEnter={props.open}
                  onMouseLeave={props.close}
                >
                  {"Master's PnL"}
                </AppText>
              ),
            })}
            dropdown={() => ({
              children: (
                <AppText instancetype="WithTextTooltip">
                  Total profit that includes realized and unrealized
                  PnL
                </AppText>
              ),
            })}
          ></AppPopover>
          <AppText instancetype="withPriceLong" c={"green"}>
            +619.31
          </AppText>
        </Flex>
        <div>
          <AppPopover
            width={200}
            target={(props) => ({
              children: (
                <AppText
                  component="span"
                  instancetype="WidthTooltipGray"
                  className="cursor-pointer"
                  onMouseEnter={props.open}
                  onMouseLeave={props.close}
                >
                  Win Rate
                </AppText>
              ),
            })}
            dropdown={() => ({
              children: (
                <AppText instancetype="WithTextTooltip">
                  Shows the average win rate of a Master Trader over a
                  certain period.
                </AppText>
              ),
            })}
          ></AppPopover>
          <AppText instancetype="withPriceLong">50.00%</AppText>
        </div>
        <Flex align={"end"} direction={"column"}>
          <AppPopover
            width={200}
            target={(props) => ({
              children: (
                <AppText
                  component="span"
                  instancetype="WidthTooltipGray"
                  className="cursor-pointer"
                  onMouseEnter={props.open}
                  onMouseLeave={props.close}
                >
                  {"Followers' PnL"}
                </AppText>
              ),
            })}
            dropdown={() => ({
              children: (
                <AppText instancetype="WithTextTooltip">
                  {
                    "Total profit of past and current Followers. Master's and Followers' PnL may be inconsistent as Followers' entry time/prices may vary."
                  }
                </AppText>
              ),
            })}
          ></AppPopover>
          <AppText instancetype="withPriceLong" c={"green"}>
            +2,181.36
          </AppText>
        </Flex>
        <div>
          <AppPopover
            width={200}
            target={(props) => ({
              children: (
                <AppText
                  component="span"
                  instancetype="WidthTooltipGray"
                  className="cursor-pointer"
                  onMouseEnter={props.open}
                  onMouseLeave={props.close}
                >
                  Max. Drawdown
                </AppText>
              ),
            })}
            dropdown={() => ({
              children: (
                <AppText instancetype="WithTextTooltip">
                  {
                    "A low Max. Drawdown indicates that the unrealized losses from a Master Trader's trading strategy has been relatively small."
                  }
                </AppText>
              ),
            })}
          ></AppPopover>
          <AppText instancetype="withPriceLong">23.95%</AppText>
        </div>
        <Flex align={"end"} direction={"column"}>
          <AppPopover
            width={200}
            target={(props) => ({
              children: (
                <AppText
                  component="span"
                  instancetype="WidthTooltipGray"
                  className="cursor-pointer"
                  onMouseEnter={props.open}
                  onMouseLeave={props.close}
                >
                  Avg. PnL per Trade
                </AppText>
              ),
            })}
            dropdown={() => ({
              children: (
                <AppText instancetype="WithTextTooltip">
                  The average profit and loss of all the closed
                  positions made by a Master Trader. A higher value
                  indicates that the Master Trader has a good
                  performance in terms of profit.
                </AppText>
              ),
            })}
          ></AppPopover>
          <AppText instancetype="withPriceLong" c={"green"}>
            +34.40
          </AppText>
        </Flex>
      </SimpleGrid>
      <Space mb={10} />
      <Divider h={1} color="#f3f5f7" />
      <Space mb={15} />
      <Box>
        <Flex justify={"space-between"} mb={5}>
          <AppText instancetype="withPriceNormal">
            Win{" "}
            <AppText
              component="span"
              c={"green"}
              instancetype="withPriceNormal"
              fw={"bold"}
            >
              9
            </AppText>
          </AppText>
          <AppText instancetype="withPriceNormal">
            Lose{" "}
            <AppText
              instancetype="withPriceNormal"
              component="span"
              c={"gray"}
            >
              9
            </AppText>
          </AppText>
        </Flex>
        <Box>
          <Progress value={50} color="green" />
        </Box>
      </Box>
      <Space mb={20} />
      <SimpleGrid cols={2}>
        {items.map(([v1, v2, v3], i) => (
          <Fragment key={i}>
            <>
              <AppPopover
                width={200}
                target={(props) => ({
                  children: (
                    <AppText
                      component="span"
                      instancetype="WidthTooltipGray"
                      className="cursor-pointer"
                      onMouseEnter={props.open}
                      onMouseLeave={props.close}
                    >
                      {v1}
                    </AppText>
                  ),
                })}
                dropdown={() => ({
                  children: (
                    <AppText instancetype="WithTextTooltip">
                      {v3}
                    </AppText>
                  ),
                })}
              ></AppPopover>
              <Flex align={"end"} direction={"column"}>
                <AppText instancetype="withPriceNormal">{v2}</AppText>
              </Flex>
            </>
          </Fragment>
        ))}
        <div></div>
        <Flex align={"end"} direction={"column"}>
          <AppText
            component="span"
            instancetype="WidthTooltipGray"
            fz={12}
          >
            Measured in: USDT
          </AppText>
        </Flex>
      </SimpleGrid>
    </>
  );
}

function Statistics() {
  return (
    <>
      <TabsUI />
    </>
  );
}

function Profit() {
  // cspell:disable
  const items = [
    {
      v1: "cyp**@***",
      v12: "The total profit earned from copy trades initiated by this Master Trader",
      v13: "+2,181.36",
      v2: "+265.58%",
      v21: "The total profit from copy trades initiated by this Master Trader / The cumulative margin required to copy these trades",
      isGreen: true,
    },
    {
      v1: "theolge",
      v12: "The total profit earned from copy trades initiated by this Master Trader",
      v13: "0.00",
      v2: "0.00%",
      v21: "The total profit from copy trades initiated by this Master Trader / The cumulative margin required to copy these trades",
    },
    {
      v1: "SyraIO",
      v12: "The total profit earned from copy trades initiated by this Master Trader",
      v13: "0.00",
      v2: "0.00%",
      v21: "The total profit from copy trades initiated by this Master Trader / The cumulative margin required to copy these trades",
    },
    {
      v1: "rev**@***",
      v12: "The total profit earned from copy trades initiated by this Master Trader",
      v13: "0.00",
      v2: "0.00%",
      v21: "The total profit from copy trades initiated by this Master Trader / The cumulative margin required to copy these trades",
    },
    {
      v1: "87x**@***",
      v12: "The total profit earned from copy trades initiated by this Master Trader",
      v13: "0.00",
      v2: "0.00%",
      v21: "The total profit from copy trades initiated by this Master Trader / The cumulative margin required to copy these trades",
    },
  ];
  // cspell:enable
  return (
    <>
      <Group justify="space-between" p={0}>
        <AppText fz={16} fw={"bold"}>
          Profit (Follower)
        </AppText>
        <AppButton
          variant="transparent"
          c={"gray"}
          m={0}
          p={0}
          rightSection={<IconChevronRight size={20} />}
        >
          View All
        </AppButton>
      </Group>
      <Space mb={10} />
      <Divider h={1} color="#f3f5f7" />
      <Space mb={10} />
      <SimpleGrid cols={2}>
        {items.map(({ v1, v12, v13, v2, v21, isGreen }, i) => (
          <Fragment key={i}>
            <>
              <Flex direction={"column"}>
                <AppText instancetype="withPriceNormal">{v1}</AppText>
                <AppPopover
                  width={200}
                  target={(props) => ({
                    children: (
                      <AppText
                        component="span"
                        instancetype="WidthTooltipGray"
                        className="cursor-pointer"
                        onMouseEnter={props.open}
                        onMouseLeave={props.close}
                      >
                        Cumulative Profit
                      </AppText>
                    ),
                  })}
                  dropdown={() => ({
                    children: (
                      <AppText instancetype="WithTextTooltip">
                        {v12}
                      </AppText>
                    ),
                  })}
                ></AppPopover>
                <AppText
                  instancetype="withPriceNormal"
                  c={isGreen ? "green" : ""}
                >
                  {v13}
                </AppText>
              </Flex>
              <Flex align={"end"} direction={"column"}>
                <AppText instancetype="withPriceNormal" opacity={0}>
                  {v1}
                </AppText>
                <AppPopover
                  width={200}
                  target={(props) => ({
                    children: (
                      <AppText
                        component="span"
                        instancetype="WidthTooltipGray"
                        className="cursor-pointer"
                        onMouseEnter={props.open}
                        onMouseLeave={props.close}
                      >
                        Total ROI
                      </AppText>
                    ),
                  })}
                  dropdown={() => ({
                    children: (
                      <AppText instancetype="WithTextTooltip">
                        {v21}
                      </AppText>
                    ),
                  })}
                ></AppPopover>
                <AppText
                  instancetype="withPriceNormal"
                  c={isGreen ? "green" : ""}
                >
                  {v2}
                </AppText>
              </Flex>
            </>
          </Fragment>
        ))}
        <div></div>
        <Flex align={"end"} direction={"column"}>
          <AppText
            component="span"
            instancetype="WidthTooltipGray"
            fz={12}
          >
            Measured in: USDT
          </AppText>
        </Flex>
      </SimpleGrid>
    </>
  );
}

function TabsUI() {
  const cfd = [
    // cspell:disable-next-line
    ["JASMYUSDT", "UNIUSDT", "GOLDUSDT"],
    [44, 55, 13],
  ];
  const [mode, setMode] = useState<1 | 2 | 3>(1);

  return (
    <>
      <Tabs
        defaultValue="gallery"
        className="tabsCopyTradeDetail"
        classNames={{
          tab: "tab-item-1",
          list: "tab-item-2",
          panel: "tab-item-3",
          root: "tab-item-4",
          tabLabel: "tab-item-5",
          tabSection: "tab-item-6",
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="gallery">Statistics</Tabs.Tab>
          <Tabs.Tab value="messages">
            <AppPopover
              width={200}
              target={(props) => ({
                children: (
                  <Flex
                    align={"center"}
                    gap={5}
                    onMouseEnter={props.open}
                    onMouseLeave={props.close}
                  >
                    <AppText
                      fz={18}
                      fw={"bold"}
                      instancetype="WidthTooltipGray"
                      className="cursor-pointer"
                    >
                      Trades <IconHelp size={14} />
                    </AppText>
                  </Flex>
                ),
              })}
              dropdown={() => ({
                children: (
                  <>
                    <AppText instancetype="WithTextTooltip">
                      {
                        "Followers' positions may not match those of Master Traders."
                      }
                    </AppText>
                  </>
                ),
              })}
            ></AppPopover>
          </Tabs.Tab>
          <Tabs.Tab disabled value="settings">
            Bots
          </Tabs.Tab>
          <Tabs.Tab value="Follower">Follower(s)</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="gallery">
          <Space mt={20} />
          <Grid gutter={15} w={"50%"}>
            <Grid.Col span={4}>
              <AppButton
                onClick={() => setMode(1)}
                w={"100%"}
                variant="light"
                bg={mode == 1 ? "" : "gray.1"}
                c={mode == 1 ? "" : "gray"}
              >
                All
              </AppButton>
            </Grid.Col>
            <Grid.Col span={4}>
              <AppButton
                onClick={() => setMode(2)}
                w={"100%"}
                variant="light"
                bg={mode == 2 ? "" : "gray.1"}
                c={mode == 2 ? "" : "gray"}
              >
                Traders
              </AppButton>
            </Grid.Col>
            <Grid.Col span={4}>
              <AppButton
                disabled
                onClick={() => setMode(3)}
                w={"100%"}
                variant="light"
                bg={mode == 3 ? "" : "gray.1"}
                c={mode == 3 ? "" : "gray"}
              >
                Bots
              </AppButton>
            </Grid.Col>
          </Grid>
          <Box h={320} w={"100%"} my={20} pos={"relative"}>
            <AppChart
              instancetype="Line"
              chartSeries={[
                {
                  name: "Cumulative ROI",
                  data: getSeriesValue(),
                },
                {
                  name: "Cumulative Profit (USDT)",
                  data: getSeriesValue(),
                },
              ]}
              chartOptions={{
                xaxis: {
                  categories: [
                    "06/01",
                    "06/02",
                    "06/03",
                    "06/04",
                    "06/05",
                    "06/06",
                    "06/07",
                    "06/08",
                  ],
                },
              }}
            />
            <Box pos={"absolute"} right={30} top={0}>
              <Flex align={"center"} gap={10}>
                {mode === 2 && (
                  <>
                    <AppText instancetype="WithTextTooltip">
                      Derivatives Pair
                    </AppText>
                    <Select
                      defaultValue={"All Contract"}
                      size="xs"
                      w={120}
                      data={[
                        "All Contract",
                        "XRPUSDT",
                        "ADAUSDT",
                        "UNIUSDT",
                        "DOGEUSDT",
                        "HBARUSDT",
                        "COTIUSDT",
                        "JASMYUSDT",
                      ]}
                    />
                  </>
                )}
                <Select
                  defaultValue={"7 Days"}
                  size="xs"
                  w={100}
                  data={["7 Days", "30 Days", "90 Days"]}
                />
              </Flex>
            </Box>
          </Box>
          <Box h={320} w={"100%"} my={20} pos={"relative"}>
            <AppChart
              instancetype="Bar"
              chartSeries={[
                {
                  name: "Cumulative ROI",
                  data: getSeriesValue(),
                },
              ]}
              chartOptions={{
                xaxis: {
                  categories: [
                    "06/01",
                    "06/02",
                    "06/03",
                    "06/04",
                    "06/05",
                    "06/06",
                    "06/07",
                    "06/08",
                  ],
                },
                title: {
                  text: "Profit",
                  align: "left",
                },
              }}
            />
            <Box pos={"absolute"} right={30} top={0}>
              <Flex align={"center"} gap={10}>
                {mode === 2 && (
                  <>
                    <AppText instancetype="WithTextTooltip">
                      Derivatives Pair
                    </AppText>
                    <Select
                      defaultValue={"All Contract"}
                      size="xs"
                      w={120}
                      data={[
                        "All Contract",
                        "XRPUSDT",
                        "ADAUSDT",
                        "UNIUSDT",
                        "DOGEUSDT",
                        "HBARUSDT",
                        "COTIUSDT",
                        "JASMYUSDT",
                      ]}
                    />
                  </>
                )}
                <Select
                  defaultValue={"7 Days"}
                  size="xs"
                  w={100}
                  data={["7 Days", "30 Days", "90 Days"]}
                />
              </Flex>
            </Box>
          </Box>
          <Box w={"100%"} my={20} pos={"relative"}>
            <Box pos={"absolute"} right={30} top={0}>
              <Flex align={"center"} gap={10}>
                {mode === 2 && (
                  <>
                    <AppText instancetype="WithTextTooltip">
                      Derivatives Pair
                    </AppText>
                    <Select
                      defaultValue={"All Contract"}
                      size="xs"
                      w={120}
                      data={[
                        "All Contract",
                        "XRPUSDT",
                        "ADAUSDT",
                        "UNIUSDT",
                        "DOGEUSDT",
                        "HBARUSDT",
                        "COTIUSDT",
                        "JASMYUSDT",
                      ]}
                    />
                  </>
                )}
                <Select
                  defaultValue={"7 Days"}
                  size="xs"
                  w={100}
                  data={["7 Days", "30 Days", "90 Days"]}
                />
              </Flex>
            </Box>
            <Flex>
              <Group>
                <Box h={230} w={230}>
                  <AppChart
                    instancetype="Pie"
                    chartSeries={[44, 55, 13]}
                    chartOptions={{
                      title: {
                        text: "Trading History",
                        align: "left",
                        margin: 30,
                      },
                      legend: {
                        show: false,
                      },
                      labels: ["JASMYUSDT", "UNIUSDT", "GOLDUSDT"],
                      plotOptions: {
                        pie: {
                          donut: {
                            labels: {
                              show: true,
                              total: {
                                showAlways: false,
                                show: true,
                                label: [
                                  "JASMYUSDT",
                                  "UNIUSDT",
                                  "GOLDUSDT",
                                ][
                                  cfd[1].findIndex((i) => {
                                    const max = _.max(
                                      cfd[1].map((el) => Number(el)),
                                    );
                                    return Number(i) === max;
                                  })
                                ],
                                fontSize: "16px",
                                fontWeight: "bold",
                                formatter: function (w) {
                                  const _m = _.max(
                                    w.globals.seriesTotals,
                                  ) as number;
                                  return `${_m.toString()}`;
                                },
                              },
                              value: {
                                fontSize: "24px",
                                fontWeight: "bold",
                              },
                            },
                          },
                        },
                      },
                    }}
                  />
                </Box>
              </Group>
              <Box pt={40}>
                <Table
                  verticalSpacing={"xs"}
                  data={{
                    head: [
                      <AppText key={1} instancetype="withTheadSmall">
                        Pair / % of the Total Trades
                      </AppText>,
                      "",
                      <AppText key={2} instancetype="withTheadSmall">
                        Total Transactions
                      </AppText>,
                      <AppText key={3} instancetype="withTheadSmall">
                        P&L
                      </AppText>,
                    ],
                    body: [
                      [
                        <>
                          <AppText
                            instancetype="withPriceCardTrade"
                            fz={12}
                          >
                            JASMYUSDT
                          </AppText>
                        </>,
                        <AppPill
                          key={1}
                          instancetype="WithTagSmall"
                          c={"gray"}
                          bg={"gray.1"}
                          fw={"bold"}
                        >
                          66.66%
                        </AppPill>,
                        <AppText key={2}>2</AppText>,
                        <AppText
                          key={3}
                          instancetype="WidthPriceNormal"
                          c={"green"}
                        >
                          +398.28
                        </AppText>,
                      ],
                      [
                        <>
                          <AppText
                            instancetype="withPriceCardTrade"
                            fz={12}
                          >
                            UNIUSDT
                          </AppText>
                        </>,
                        <AppPill
                          key={1}
                          instancetype="WithTagSmall"
                          c={"gray"}
                          bg={"gray.1"}
                          fw={"bold"}
                        >
                          33.66%
                        </AppPill>,
                        <AppText key={2}>2</AppText>,
                        <AppText
                          key={3}
                          instancetype="WidthPriceNormal"
                          c={"green"}
                        >
                          +125.28
                        </AppText>,
                      ],
                      [
                        <>
                          <AppText
                            instancetype="withPriceCardTrade"
                            fz={12}
                          >
                            GOLDUSDT
                          </AppText>
                        </>,
                        <AppPill
                          key={1}
                          instancetype="WithTagSmall"
                          c={"gray"}
                          bg={"gray.1"}
                          fw={"bold"}
                        >
                          15.66%
                        </AppPill>,
                        <AppText key={2}>2</AppText>,
                        <AppText
                          key={3}
                          instancetype="WidthPriceNormal"
                          c={"green"}
                        >
                          +124.28
                        </AppText>,
                      ],
                    ],
                  }}
                />
              </Box>
            </Flex>
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <Center h={"45vh"} c={"gray"}>
            Settings tab content
          </Center>
        </Tabs.Panel>

        <Tabs.Panel value="settings">
          <Center h={"100%"}>Settings tab content</Center>
        </Tabs.Panel>
        <Tabs.Panel value="Follower">
          <Table
            highlightOnHover
            data={tableData()}
            verticalSpacing={"md"}
          />
          <Space mb={30} />
          <Flex justify={"center"} w={"100%"}>
            <Pagination total={10} />
          </Flex>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

import AppChart from "@/ui/Chart/Chart";
import { shuffleArray } from "@/utils";
import { Table, TableData } from "@mantine/core";
import _ from "lodash";
import { getSeriesValue } from "./config";

const tableData = (): TableData => {
  const _items = [
    ["User ID"],
    [
      "Cumulative Cost",
      "The cumulative margin required to copy trades initiated by this Master Trader",
    ],
    [
      "Total Profit Received",
      "The total profit earned from copy trades initiated by this Master Trader",
    ],
    [
      "Total ROI (Follower)",
      "The total profit from copy trades initiated by this Master Trader / The cumulative margin required to copy these trades",
    ],
    [
      "Days of Following",
      "The number of days since you followed this Master Trader.",
    ],
  ];
  const rows = [
    ["cyp**@***", 821.32, 181.36, 265.58, "5 Days"],
    ["leo**@***", 0, 0, 0, "4 Days"],
    ["nak**@***", 14, 0, 0, "6 Days"],
    ["king**@***", 22.2, 0, 0, "7 Days"],
    ["ali**@***", 33, 0, 0, "10 Days"],
    // cspell:disable-next-line
    ["beto**@***", 0, 0, 0, "3 Days"],
    ["cyp**@***", 0, 0, 0, "2 Days"],
  ];
  const _rows = [
    ...shuffleArray(rows, 20),
    ...shuffleArray(rows, 20),
  ].map(([email, cost, profit, roi, days]) => [
    <AppText key={1} fz={12} instancetype="withPriceCardTrade">
      {email}
    </AppText>,
    <AppText key={2} fz={12} instancetype="withPriceCardTrade">
      {cost} USDT
    </AppText>,
    <AppText
      key={3}
      fz={12}
      instancetype="withPriceCardTrade"
      c={(profit as number) > 0 ? "green" : ""}
    >
      {(profit as number) > 0 ? "+" : ""} {profit}USDT
    </AppText>,
    <AppText
      key={4}
      fz={12}
      instancetype="withPriceCardTrade"
      c={(roi as number) > 0 ? "green" : ""}
    >
      {(roi as number) > 0 ? "+" : ""}
      {roi}
    </AppText>,
    <AppText key={5} fz={12} instancetype="withPriceCardTrade">
      {days}
    </AppText>,
  ]);
  return {
    head: _items.map(([text, tooltip], i) => {
      if (tooltip) {
        return (
          <AppPopover
            key={i}
            width={200}
            target={(props) => ({
              children: (
                <Flex
                  align={"center"}
                  gap={5}
                  onMouseEnter={props.open}
                  onMouseLeave={props.close}
                >
                  <AppText
                    instancetype="WithTextTooltip"
                    className="cursor-pointer"
                  >
                    {text}
                  </AppText>
                </Flex>
              ),
            })}
            dropdown={() => ({
              children: (
                <>
                  <AppText instancetype="WithTextTooltip">
                    {tooltip}
                  </AppText>
                </>
              ),
            })}
          ></AppPopover>
        );
      }
      return (
        <AppText
          key={i}
          instancetype="WithTextTooltip"
          className="cursor-pointer"
        >
          {text}
        </AppText>
      );
    }),
    body: _rows,
  };
};
