/* eslint-disable react/prop-types */
import { priceDisplay } from "@/common/utils";
import { MODAL_STYLES } from "@/domain/config";
import useSPETranslation from "@/hooks/useSPETranslation";
import { fetchMasterTraders, fetchTrader } from "@/services/apis";
import logger from "@/services/logger";
import authStore from "@/store/auth";
import {
  MasterTraderInformation,
  PublicCopyMasterDetail,
} from "@/types";
import AppButton from "@/ui/Button/AppButton";
import AppCard from "@/ui/Card/AppCard";
import AppChart from "@/ui/Chart/Chart";
import { CopySettingForm } from "@/ui/Copy";
import NumberFormat from "@/ui/NumberFormat";
import { OptionFilter } from "@/ui/OptionFilter";
import { AppPopover } from "@/ui/Popover/AppPopover";
import { NoDataRecord } from "@/ui/SPEMisc";
import AppText from "@/ui/Text/AppText";
import { avatarUrl, getDatesArray } from "@/utils/utility";
import {
  Avatar,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Progress,
  SegmentedControl,
  SimpleGrid,
  Space,
  Table,
  TableData,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconChartInfographic,
  IconChartPie,
  IconChevronRight,
  IconCoinBitcoin,
  IconHelp,
  IconShare,
  IconStar,
} from "@tabler/icons-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.module.scss";

export default function CopyTradeDetail() {
  const params = useParams();
  const [trader, setTrader] = useState<PublicCopyMasterDetail>();

  useEffect(() => {
    params.id &&
      fetchTrader(params.id).then((trader) => {
        logger.debug("trader", trader);
        setTrader(trader);
      });
  }, [params.id]);

  if (!trader) {
    return <></>;
  }
  return (
    <>
      <Banner {...trader} />
      <Box className="bg-copy-trade">
        <Container>
          <Grid gutter={21} py={21}>
            <Grid.Col
              span={{
                xs: 12,
                sm: 4,
              }}
            >
              <Flex direction={"column"} gap={21}>
                <AppCard>
                  <Performance {...trader} />
                </AppCard>
                {/* <AppCard>
                  <Profit />
                </AppCard> */}
              </Flex>
            </Grid.Col>
            <Grid.Col
              span={{
                xs: 12,
                sm: 8,
              }}
            >
              <AppCard>
                <TabsUI {...trader} />
              </AppCard>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

function Banner(trader: PublicCopyMasterDetail) {
  const t = useSPETranslation();
  const navigate = useNavigate();
  const [myTrader, setMyTrader] = useState<MasterTraderInformation>();
  const { me } = authStore();

  useEffect(() => {
    fetchMasterTraders().then((traders) => {
      logger.debug("traders", traders);
      setMyTrader(
        traders.find(
          (t) => t.masterAccountId === trader.masterAccountId,
        ),
      );
    });
  }, [trader.masterAccountId]);

  return (
    <>
      <Box
        className="banner-copy-detail"
        py={{
          xs: "30px",
          md: "0",
        }}
        h={{
          xs: "auto",
          md: "315px",
        }}
      >
        <Container h={"100%"}>
          <Center w={"100%"} h={"100%"}>
            <Flex
              w={"100%"}
              justify={"space-between"}
              wrap={{
                xs: "wrap",
                md: "nowrap",
              }}
            >
              <Box>
                <Flex
                  gap={36}
                  wrap={{
                    xs: "wrap",
                    md: "nowrap",
                  }}
                >
                  <Box
                    w={{
                      xs: "100%",
                      md: "unset",
                    }}
                  >
                    <Avatar
                      mx={{
                        xs: "auto",
                        md: "unset",
                      }}
                      size={126}
                      src={avatarUrl(trader.avatar)}
                    />
                  </Box>
                  <Box>
                    <AppText fz={32} c={"white"} fw={"bold"}>
                      {trader.name}
                    </AppText>
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
                                  {t("Follower(s)")}
                                </AppText>
                              ),
                            })}
                            dropdown={() => ({
                              children: (
                                <AppText
                                  fz={12}
                                  style={{ textAlign: "center" }}
                                >
                                  {t(" No. of Current Follower(s)")}
                                </AppText>
                              ),
                            })}
                          ></AppPopover>
                          <AppText c={"white"} fw={"bolder"} fz={24}>
                            {trader.followers || 0}
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
                                  {t("Trading Days")}
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
                                  {t("Stability Index")}
                                </AppText>
                              ),
                            })}
                            dropdown={() => ({
                              children: (
                                <AppText
                                  fz={12}
                                  style={{ textAlign: "center" }}
                                >
                                  {t(
                                    "Using advanced analytics, the Stability Index gauges how well Master Traders are dealing with volatility.",
                                  )}
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
                      <Flex
                        gap={16}
                        align={"center"}
                        wrap={{
                          xs: "wrap",
                          md: "nowrap",
                        }}
                      >
                        <Box>
                          <Group align="center" gap={5}>
                            <IconCoinBitcoin
                              color="white"
                              width={20}
                            />
                            <AppText c={"white"} fz={14}>
                              {`AUM: ${trader.aum} USDT`}
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
                                      {t("Total Assets")} ***** USDT
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
                              {t("Profit Sharing")} {trader.sharing}%
                            </AppText>
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                </Flex>
              </Box>
              <Box
                w={{
                  xs: "100%",
                  md: "unset",
                }}
                py={{
                  xs: "30px",
                  md: "0",
                }}
                pl={{
                  xs: "0",
                  md: "calc(126px + 30px)",
                  lg: "0",
                }}
              >
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
                      {t("Subscribe")}
                    </AppText>
                  </Group>
                </Flex>
                <Space mb={24} />
                {myTrader ? (
                  <AppButton
                    instancetype="WithGradient"
                    onClick={() => {
                      navigate("/copy/mine/traders");
                    }}
                  >
                    {t("Copy history")}
                  </AppButton>
                ) : (
                  <AppButton
                    instancetype="WithGradient"
                    onClick={() => {
                      if (!me?.id) {
                        const { pathname, search } = window.location;
                        navigate(
                          `/login?redirect=${encodeURIComponent(
                            pathname + search,
                          )}`,
                        );
                        return;
                      }
                      modals.open({
                        ...MODAL_STYLES,
                        title: t("Follow %s", trader.name),
                        children: (
                          <CopySettingForm
                            masterAccountId={trader.masterAccountId}
                          />
                        ),
                      });
                    }}
                  >
                    {t("Copy")}
                  </AppButton>
                )}
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
                  {t("Slots Left")}
                </AppText>
              </Box>
            </Flex>
          </Center>
        </Container>
      </Box>
    </>
  );
}

type Period = "7D" | "30D" | "90D";

function Performance(props: PublicCopyMasterDetail) {
  const t = useSPETranslation();
  const [time, setTime] = useState<Period>("7D");

  const data = useMemo(() => {
    if (time === "7D") {
      return props.performance.w;
    } else if (time === "30D") {
      return props.performance.m;
    } else {
      return props.performance.q;
    }
  }, [props, time]);

  const performanceItems = useMemo(() => {
    const {
      pToL,
      pnlRatio,
      totalTrades,
      avgHoldingTime,
      volatility,
    } = data;
    return [
      [
        "Profit-to-Loss Ratio",
        <>
          <NumberFormat value={pToL} />:
          <NumberFormat value={pnlRatio} />
        </>,
        "The ratio of average profit per winning order to average loss per losing order.",
      ],
      [
        "Weekly Trades",
        <>
          <NumberFormat value={totalTrades} />
        </>,
        "The average number of trades the Master Trader made weekly in the last month.",
      ],
      [
        "Avg. Holding Time",
        <>
          <NumberFormat value={avgHoldingTime} suffix="Days" />
        </>,
        "The average position holding period of all closed positions",
      ],
      [
        "ROI Volatility",
        <>
          <NumberFormat value={volatility} prefix={"%"} />
        </>,
        "Higher value indicates less stable returns.",
      ],
      [
        "Last Traded at",
        <>
          {data.lastTrade
            ? new Date(data.lastTrade).toLocaleString()
            : "--"}
        </>,
        "The last time the Master Trader opened or closed a position.",
      ],
    ];
  }, [data]);

  return (
    <>
      <Group justify="space-between" p={0} m={0}>
        <AppText fz={16} fw={"bold"}>
          {t("Performance")}
        </AppText>
        <OptionFilter
          onChange={(v) => setTime(v as Period)}
          value={time}
          items={[
            {
              label: "7 Days",
              value: "7D",
            },
            {
              label: "30 Days",
              value: "30D",
            },
            {
              label: "90 Days",
              value: "90D",
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
          <AppText
            instancetype="withPriceLong"
            c={priceDisplay(data.roi).color}
          >
            <NumberFormat
              prefix={priceDisplay(data.roi).sub}
              value={data.roi}
              suffix="%"
            />
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
                  {t(
                    "Total profit that includes realized and unrealized PnL",
                  )}
                </AppText>
              ),
            })}
          ></AppPopover>
          <AppText
            instancetype="withPriceLong"
            c={priceDisplay(data.avgPnL).color}
          >
            <NumberFormat
              prefix={priceDisplay(data.avgPnL).sub}
              value={data.avgPnL}
            />
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
          <AppText instancetype="withPriceLong">
            <NumberFormat value={data.totalWin} suffix="%" />
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
          <AppText
            instancetype="withPriceLong"
            c={priceDisplay(data.followerPnL).color}
          >
            <NumberFormat
              prefix={priceDisplay(data.followerPnL).sub}
              value={data.followerPnL}
              suffix="%"
            />
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
                  {t("Max. Drawdown")}
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
          <AppText instancetype="withPriceLong">
            <NumberFormat value={data.drawDown} suffix="%" />
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
                  {t("Avg. PnL per Trade")}
                </AppText>
              ),
            })}
            dropdown={() => ({
              children: (
                <AppText instancetype="WithTextTooltip">
                  {t(
                    "The average profit and loss of all the closed positions made by a Master Trader. A higher value indicates that the Master Trader has a good performance in terms of profit.",
                  )}
                </AppText>
              ),
            })}
          ></AppPopover>
          <AppText
            instancetype="withPriceLong"
            c={priceDisplay(data.avgPnL).color}
          >
            <NumberFormat
              prefix={priceDisplay(data.avgPnL).sub}
              value={data.avgPnL}
            />
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
              <NumberFormat value={data.totalWin} />
            </AppText>
          </AppText>
          <AppText instancetype="withPriceNormal">
            Lose{" "}
            <AppText
              instancetype="withPriceNormal"
              component="span"
              c={"gray"}
            >
              <NumberFormat value={data.totalLoss} />
            </AppText>
          </AppText>
        </Flex>
        <Box>
          <Progress
            value={Math.floor((data.totalWin + data.totalLoss) / 100)}
            color="green"
          />
        </Box>
      </Box>
      <Space mb={20} />
      <SimpleGrid cols={2}>
        {performanceItems.map(([v1, v2, v3], i) => (
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
            {t("Measured in: USDT")}
          </AppText>
        </Flex>
      </SimpleGrid>
    </>
  );
}

// cspell:disable
const profitItems = [
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

export function Profit() {
  const t = useSPETranslation();

  return (
    <>
      <Group justify="space-between" p={0}>
        <AppText fz={16} fw={"bold"}>
          {t("Profit (Follower)")}
        </AppText>
        <AppButton
          variant="transparent"
          c={"gray"}
          m={0}
          p={0}
          rightSection={<IconChevronRight size={20} />}
        >
          {t("View All")}
        </AppButton>
      </Group>
      <Space mb={10} />
      <Divider h={1} color="#f3f5f7" />
      <Space mb={10} />
      <SimpleGrid cols={2}>
        {profitItems.map(({ v1, v12, v13, v2, v21, isGreen }, i) => (
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
                        {t("Cumulative Profit")}
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
                        {t("Total ROI")}
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
            {t("Measured in: USDT")}
          </AppText>
        </Flex>
      </SimpleGrid>
    </>
  );
}
type TradeDataType = "CurrentPosition" | "OrderHistory";
function TabsUI(props: PublicCopyMasterDetail) {
  const t = useSPETranslation();
  const series = useMemo(() => {
    return props.series;
  }, [props.series]);

  const [value, setValue] = useState("7DPnlP"); // 7DPnlP | 7DPnl | CumulativePnLP | CumulativePnL
  const [valueRate, setValueRate] = useState("7DWinRate"); // 7DWinRate | 7DDrawdown | 7DFollowersPnL
  const [tradeMode, setTradeMode] =
    useState<TradeDataType>("CurrentPosition"); // CurrentPosition | OrderHistory

  const unitAsLabel = useMemo(() => {
    return {
      pnl: {
        "7DPnlP": "%",
        "7DPnl": "USDT",
        "CumulativePnLP": "%",
        "CumulativePnL": "USDT",
      }[value],
      rate: {
        "7DWinRate": "%",
        "7DDrawdown": "%",
        "7DFollowersPnL": "USDT",
      }[valueRate],
    };
  }, [value, valueRate]);

  const valueAsLabel = useMemo(() => {
    return {
      "7DPnlP": "7D PnL%",
      "7DPnl": "7D PnL",
      "CumulativePnLP": "Cumulative PnL%",
      "CumulativePnL": "Cumulative PnL",
    }[value];
  }, [value]);

  const valueRateAsLabel = useMemo(() => {
    return {
      "7DWinRate": "7D Win Rate",
      "7DDrawdown": "7D Drawdown",
      "7DFollowersPnL": "7D Followers PnL",
    }[valueRate];
  }, [valueRate]);

  const tableDataPosition: TableData = useMemo(() => {
    const rows: any[] = []; // eslint-disable-line
    // Contract	Order Price	Qty	Margin/Realized PnL	Followers	Time
    return {
      head: [
        "Contract",
        "Entry Price",
        "Qty",
        "Position Margin",
        "Unrealized PnL(%)",
        "Followers",
      ].map((el) => t(el)),
      body: rows.map((row) => [
        <>
          <Text hiddenFrom="sm" c={"dimmed"}>
            {t("Available")}
          </Text>
          <Title order={6}>
            <NumberFormat decimalPlaces={8} value={row.amount} />
          </Title>
          <Text c="dimmed" size="xs">
            ~ $
            {<NumberFormat decimalPlaces={3} value={row.usdValue} />}
          </Text>
        </>,
        <>
          <Text hiddenFrom="sm" c={"dimmed"}>
            {t("Frozen")}
          </Text>
          <Title order={6}>
            {<NumberFormat decimalPlaces={8} value={row.locked} />}
          </Title>
          <Text c="dimmed" size="xs">
            ~ $
            {
              <NumberFormat
                decimalPlaces={3}
                value={row.lockedUsdValue}
              />
            }
          </Text>
        </>,
        <>
          <Text hiddenFrom="sm" c={"dimmed"}>
            {t("BTC Valuation")}
          </Text>
          <Title order={6}>
            {<NumberFormat decimalPlaces={8} value={row.btcValue} />}
          </Title>
        </>,
      ]),
    };
  }, [t]);

  const tableDataHistory: TableData = useMemo(() => {
    const rows: any[] = []; // eslint-disable-line
    // Contract	Order Price	Qty	Margin/Realized PnL	Followers	Time
    return {
      // Contract	Order Price	Qty	Margin/Realized PnL	Followers	Time
      head: [
        "Contract",
        "Order Price",
        "Qty",
        "Margin/Realized PnL",
        "Followers",
        "Time",
      ].map((el) => t(el)),
      body: rows.map((row) => [
        <>
          <Text hiddenFrom="sm" c={"dimmed"}>
            {t("Available")}
          </Text>
          <Title order={6}>
            <NumberFormat decimalPlaces={8} value={row.amount} />
          </Title>
          <Text c="dimmed" size="xs">
            ~ $
            {<NumberFormat decimalPlaces={3} value={row.usdValue} />}
          </Text>
        </>,
        <>
          <Text hiddenFrom="sm" c={"dimmed"}>
            {t("Frozen")}
          </Text>
          <Title order={6}>
            {<NumberFormat decimalPlaces={8} value={row.locked} />}
          </Title>
          <Text c="dimmed" size="xs">
            ~ $
            {
              <NumberFormat
                decimalPlaces={3}
                value={row.lockedUsdValue}
              />
            }
          </Text>
        </>,
        <>
          <Text hiddenFrom="sm" c={"dimmed"}>
            {t("BTC Valuation")}
          </Text>
          <Title order={6}>
            {<NumberFormat decimalPlaces={8} value={row.btcValue} />}
          </Title>
        </>,
      ]),
    };
  }, [t]);

  return (
    <>
      <Tabs
        defaultValue="statistics"
        className="tabsCopyTradeDetail"
        keepMounted
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
          <Tabs.Tab value="statistics">{t("Statistics")}</Tabs.Tab>
          <Tabs.Tab value="tradingData">{t("Trading Data")}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="statistics">
          <Space my={"md"} />
          <SegmentedControl
            color="primary"
            value={value}
            onChange={setValue}
            data={[
              { label: "7D PnL%", value: "7DPnlP" },
              { label: "7D PnL", value: "7DPnl" },
              { label: "Cumulative PnL%", value: "CumulativePnLP" },
              { label: "Cumulative PnL", value: "CumulativePnL" },
            ]}
          />
          <Box h={320} w={"100%"} my={20} pos={"relative"}>
            <AppChart
              key={valueAsLabel}
              instancetype="SingLine"
              chartSeries={[
                {
                  name: valueAsLabel,
                  data: series,
                },
              ]}
              chartOptions={{
                xaxis: {
                  categories: getDatesArray(Date.now(), 11),
                },
                title: {
                  text: valueAsLabel,
                  align: "left",
                },
                tooltip: {
                  y: {
                    formatter: function (value) {
                      return `${value} ${unitAsLabel.pnl as string}`;
                    },
                  },
                },
              }}
            />
          </Box>
          <Space my={"md"} />
          <SegmentedControl
            color="primary"
            value={valueRate}
            onChange={setValueRate}
            data={[
              { label: "7D Win Rate", value: "7DWinRate" },
              { label: "7D Drawdown", value: "7DDrawdown" },
              { label: "7D Followers PnL", value: "7DFollowersPnL" },
            ]}
          />
          <Box h={320} w={"100%"} my={20} pos={"relative"}>
            <AppChart
              key={`${valueRateAsLabel}`}
              instancetype="SingLine"
              chartSeries={[
                {
                  name: valueRateAsLabel,
                  data: series,
                },
              ]}
              chartOptions={{
                xaxis: {
                  categories: getDatesArray(Date.now(), 11),
                },
                title: {
                  text: valueRateAsLabel,
                  align: "left",
                },
                tooltip: {
                  y: {
                    formatter: function (value) {
                      return `${value} ${unitAsLabel.rate as string}`;
                    },
                  },
                },
              }}
            />
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="tradingData">
          <Space my={"md"} />
          <SegmentedControl
            color="primary"
            value={tradeMode}
            onChange={(v) => setTradeMode(v as TradeDataType)}
            data={[
              { label: "Current Position", value: "CurrentPosition" },
              { label: "Order History", value: "OrderHistory" },
            ]}
          />
          <Space my={"md"} />
          <Box h={"450px"}>
            {tradeMode === "CurrentPosition" && (
              <Table.ScrollContainer minWidth={"100%"} h={"100%"}>
                <Table
                  data={tableDataPosition}
                  stickyHeader
                  highlightOnHover
                  classNames={{
                    table: "table-sticky-column table-list-gird-view",
                  }}
                  styles={{
                    th: {
                      whiteSpace: "nowrap",
                      fontSize: "12px",
                    },
                  }}
                />
                {tableDataPosition.body?.length === 0 && (
                  <NoDataRecord />
                )}
              </Table.ScrollContainer>
            )}
            {tradeMode === "OrderHistory" && (
              <Table.ScrollContainer minWidth={"100%"} h={"100%"}>
                <Table
                  data={tableDataHistory}
                  stickyHeader
                  highlightOnHover
                  classNames={{
                    table: "table-sticky-column table-list-gird-view",
                  }}
                  styles={{
                    th: {
                      whiteSpace: "nowrap",
                      fontSize: "12px",
                    },
                  }}
                />
                {tableDataHistory.body?.length === 0 && (
                  <NoDataRecord />
                )}
              </Table.ScrollContainer>
            )}
          </Box>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
