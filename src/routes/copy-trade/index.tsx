/* eslint-disable jsx-a11y/label-has-associated-control */
import allTraderIcon from "@/assets/images/all-trader.svg";
import moneyIcon from "@/assets/images/money.svg";
import topTradeIcon from "@/assets/images/top-trader.svg";
import useMetadata from "@/hooks/useMetadata";
import useTranslation from "@/hooks/useTranslation";
import authStore from "@/store/auth";
import AppButton from "@/ui/Button/AppButton";
import AppCard from "@/ui/Card/AppCard";
import { AppCarousel } from "@/ui/Carousel/Carousel";
import { Header } from "@/ui/Header";
import AppText from "@/ui/Text/AppText";
import { Carousel } from "@mantine/carousel";
import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Input,
  Popover,
  Space,
  Tabs,
  Text,
  lighten,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowRight,
  IconCopy,
  IconInfoCircleFilled,
  IconSearch,
} from "@tabler/icons-react";

import {
  CardTrader,
  CardTraderBonus,
  CardTraderTop1,
} from "@/ui/CardCopyTrades";
import { GridMasterTraders } from "@/ui/GridMasterTraders";
import { OptionFilter } from "@/ui/OptionFilter";
import { OptionFilterAsCheckbox } from "@/ui/OptionFilterAsCheckbox";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../top-page";
import classes from "./index.module.scss";

const sizeContainer = "xl";

const traders = [
  {
    avatar: "/images/bybit/a6fc7bce-dc27-4bd0-94ec-38f9046c50b0.jpg",
    userName: "KING 👑",
    top: 1,
  },
  {
    avatar: "/images/bybit/ff8f94ee-757d-4063-b741-4e75546a78ce.png",
    userName: "₿eatTheFatCats",
    top: 2,
  },
  {
    avatar: "/images/bybit/5162cd0a-f072-45db-9b1c-d2d675ead6c8.jpg",
    userName: "ThisIsAna",
    top: 3,
  },
  {
    avatar: "/images/bybit/a98158da-6d59-4666-aaad-9c745c5d87b3.png",
    userName: "ᴛʀᴀᴅᴇʀ ʙʏʙɪᴛ🥇", // cspell: disable-line
    top: 4,
  },
  {
    avatar: "/images/bybit/cc074b0d-38a7-48ee-a1c8-8e12c56acf8c.jpg",
    userName: "AI Pro Trade",
    top: 5,
  },
];

export default function Page() {
  const t = useTranslation();
  const { data } = useMetadata();
  const [opened, { close, open }] = useDisclosure(false);
  const [mode, setMode] = useState<"1" | "2">("1");
  const { me } = authStore();
  return (
    <>
      <Header metadata={data} />
      <Box className="banner-copy">
        <Center w={"100%"} h={"100%"}>
          <Container size={sizeContainer} w={"100%"}>
            <Flex justify={"space-between"}>
              <Box>
                <Center h={"100%"}>
                  <Box>
                    <Text className="textWithCopy">
                      SPE Copy Trading
                    </Text>
                    <AppText
                      fz={24}
                      c={lighten("black", 1)}
                      instancetype="BannerTextSub"
                    >
                      32M+ successful trades, 75% win rate
                    </AppText>
                    <Space mb={20} />
                    <Flex gap={20}>
                      <AppButton
                        instancetype="WithRightIcon"
                        size="md"
                      >
                        Join as transfer
                      </AppButton>
                      <AppButton
                        instancetype="WithOutlinedColor"
                        size="md"
                        rightSection={<IconCopy />}
                      >
                        Refer to Earn 665 USDT
                      </AppButton>
                    </Flex>
                  </Box>
                </Center>
              </Box>
              <AppCard
                pos={"relative"}
                w={394}
                h={"176px"}
                radius={12}
                p={0}
                style={{ overflow: "hidden" }}
              >
                <Box
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #ffe47c, #ffc040)",
                    padding: "20px 18px",
                  }}
                  className="card-dot"
                  pos={"relative"}
                >
                  <AppText fz={"30px"} fw={"bold"}>
                    100 USDT
                  </AppText>
                  <AppText fz={"16px"} fw={"bold"}>
                    Loss Coverage
                  </AppText>
                  <AppButton
                    px={10}
                    py={5}
                    rightSection={<IconArrowRight size={16} />}
                    c={"dark"}
                    bg="hsla(0,0%,100%,.6)"
                    pos={"absolute"}
                    right={0}
                    top={0}
                    size="xs"
                    radius={"0 12px"}
                    fz={10}
                  >
                    <Link
                      style={{
                        all: "unset",
                        display: "block",
                      }}
                      to={
                        me?.isCopyMaster
                          ? "/copy/master/positions"
                          : "/copy/mine/traders"
                      }
                    >
                      {t("My copy trading")}
                    </Link>
                  </AppButton>
                  <Image
                    pos={"absolute"}
                    right={50}
                    bottom={0}
                    w={60}
                    src={moneyIcon}
                  />
                </Box>
                <Box style={{ padding: "16px 16px" }}>
                  <Flex w={"100%"} align={"center"}>
                    <Box>
                      <AppText lineClamp={2} w={218} fz={"xs"}>
                        Be compensated up to 100 USDT in Copy Trading
                        Vouchers on your first Copy Trading order
                        loss.
                      </AppText>
                    </Box>
                    <Flex gap={0} align={"center"} flex={1}>
                      <Popover
                        position="bottom"
                        withArrow
                        shadow="md"
                        opened={opened}
                      >
                        <Popover.Target>
                          <AppButton
                            instancetype="Default"
                            variant="transparent"
                            c={"gray.4"}
                            onMouseEnter={open}
                            onMouseLeave={close}
                          >
                            <IconInfoCircleFilled />
                          </AppButton>
                        </Popover.Target>
                        <Popover.Dropdown
                          style={{ pointerEvents: "none" }}
                          w={"250"}
                        >
                          <Text fz={"12"}>
                            {
                              "Copy Trading Vouchers serve as usable margin for Copy Trades but can't be withdrawn. Profits earned from trading with these Vouchers are withdrawable. However, please note that Vouchers will be forfeited if you un follow your Master Trader after using them."
                            }
                          </Text>
                        </Popover.Dropdown>
                      </Popover>
                      <AppButton c={"dark"}>Claim</AppButton>
                    </Flex>
                  </Flex>
                </Box>
              </AppCard>
            </Flex>
          </Container>
        </Center>
      </Box>
      <Box
        style={{ position: "sticky", top: 0, left: 0, zIndex: 9 }}
        className={classes.boxSticky}
      >
        <Container size={sizeContainer}>
          <Flex justify={"space-between"}>
            <Tabs
              keepMounted
              defaultValue={mode}
              classNames={classes}
              onChange={(v) => setMode(v as "1" | "2")}
            >
              <Tabs.List>
                <Tabs.Tab
                  value={"1"}
                  leftSection={
                    <Image width={30} src={topTradeIcon} />
                  }
                >
                  <AppText instancetype="TabText">
                    Top Master Traders
                  </AppText>
                </Tabs.Tab>
                <Tabs.Tab
                  value="2"
                  leftSection={
                    <Image width={30} src={allTraderIcon} />
                  }
                >
                  <AppText instancetype="TabText">
                    All Master Traders
                  </AppText>
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>

            <Group gap={5}>
              <Input
                variant="filled"
                placeholder="Search traders"
                rightSection={<IconSearch size={16} />}
              />
              <AppButton
                variant="gradient"
                gradient={{ from: "primary", to: "yellow", deg: 90 }}
              >
                Daily Picks
              </AppButton>
            </Group>
          </Flex>
          <Divider />
        </Container>
        <Box py={10}>
          <Container size={sizeContainer}>
            {mode === "2" && (
              <Flex gap={20}>
                <OptionFilter
                  label="30d"
                  items={[
                    {
                      label: "7d",
                      value: "7d",
                    },
                    {
                      label: "30d",
                      value: "30d",
                    },
                    {
                      label: "90d",
                      value: "90d",
                    },
                  ]}
                />
                <OptionFilterAsCheckbox
                  label="Master Trader Rank3"
                  items={[
                    {
                      label: "Cadet",
                      value: "Cadet",
                    },
                    {
                      label: "Bronze",
                      value: "Bronze",
                    },
                    {
                      label: "Silver",
                      value: "Silver",
                    },
                    {
                      label: "Gold",
                      value: "Gold",
                    },
                  ]}
                />
                <OptionFilterAsCheckbox
                  label="Master Trader Type3"
                  items={[
                    {
                      label: "Top Traders By ROI",
                      value: "Top Traders By ROI",
                    },
                    {
                      label: "Top Balanced Traders",
                      value: "Top Balanced Traders",
                    },
                    {
                      label: "Top New Talents",
                      value: "Top New Talents",
                    },
                    {
                      label:
                        "Traders With The Highest Profit For Followers",
                      value:
                        "Traders With The Highest Profit For Followers",
                    },
                    {
                      label: "Lowest Drawdown",
                      value: "Lowest Drawdown",
                    },
                    {
                      label: "Top Intra-Day Traders",
                      value: "Top Intra-Day Traders",
                    },
                  ]}
                />
                <OptionFilterAsCheckbox
                  label="Country"
                  items={[
                    {
                      label: "Afghanistan",
                      value: "Afghanistan",
                    },
                    {
                      label: "Albania",
                      value: "Albania",
                    },
                    {
                      label: "Algeria",
                      value: "Algeria",
                    },
                    {
                      label: "Andorra",
                      value: "Andorra",
                    },
                    {
                      label: "Angola",
                      value: "Angola",
                    },
                    {
                      label: "Antigua and Barbuda",
                      value: "Antigua and Barbuda",
                    },
                    {
                      label: "Argentina",
                      value: "Argentina",
                    },
                  ]}
                />
                <OptionFilterAsCheckbox
                  label="Master Trader Badge"
                  items={[
                    {
                      label: "Top Profit",
                      value: "Top Profit",
                    },
                    {
                      label: "Top ROI",
                      value: "Top ROI",
                    },
                    {
                      label: "Stable",
                      value: "Stable",
                    },
                    {
                      label: "Win Streak",
                      value: "Win Streak",
                    },
                    {
                      label: "SyncMaster ON",
                      value: "SyncMaster ON",
                    },
                    {
                      label: "SyncMaster OFF",
                      value: "SyncMaster OFF",
                    },
                    {
                      label: "High Frequency",
                      value: "High Frequency",
                    },
                    {
                      label: "Low Frequency",
                      value: "Low Frequency",
                    },
                    {
                      label: "High Leverage",
                      value: "High Leverage",
                    },
                    {
                      label: "Low Leverage",
                      value: "Low Leverage",
                    },
                    {
                      label: "Swing Trader",
                      value: "Swing Trader",
                    },
                    {
                      label: "Trend Trader",
                      value: "Trend Trader",
                    },
                    {
                      label: "Veteran",
                      value: "Veteran",
                    },
                  ]}
                />
              </Flex>
            )}
          </Container>
        </Box>
      </Box>
      {mode === "1" && (
        <Box>
          <Box pb={35}>
            <Container size={sizeContainer}>
              <Group justify="space-between" align="center">
                <Box>
                  <AppText instancetype="WithTitleSectionTrade">
                    Top Traders By ROI
                  </AppText>
                  <AppText instancetype="WithSubTitleSectionTrade">
                    Traders that have earned the highest ROI in the
                    last 7 days.
                  </AppText>
                </Box>
                <AppButton
                  variant="transparent"
                  instancetype="WithRightIcon"
                  size="lg"
                  fw={"bold"}
                >
                  View More
                </AppButton>
              </Group>
              <Flex>
                <Box w={"100%"}>
                  <AppCarousel>
                    {[...traders].map((_, k) => (
                      <Carousel.Slide key={k}>
                        <CardTraderTop1 {..._} />
                      </Carousel.Slide>
                    ))}
                  </AppCarousel>
                </Box>
              </Flex>
            </Container>
          </Box>
          <Box py={35}>
            <Container size={sizeContainer}>
              <Group justify="space-between" align="center">
                <Box>
                  <AppText instancetype="WithTitleSectionTrade">
                    Top Balanced Traders
                  </AppText>
                  <AppText instancetype="WithSubTitleSectionTrade">
                    Traders that balance profit and risk.
                  </AppText>
                </Box>
                <AppButton
                  variant="transparent"
                  instancetype="WithRightIcon"
                  size="lg"
                  fw={"bold"}
                >
                  View More
                </AppButton>
              </Group>
              <Flex>
                <Box w={"100%"}>
                  <AppCarousel>
                    {[...Array(10)].map((_, k) => (
                      <Carousel.Slide key={k}>
                        <CardTrader />
                      </Carousel.Slide>
                    ))}
                  </AppCarousel>
                </Box>
              </Flex>
            </Container>
          </Box>
          <Box py={35}>
            <Container size={sizeContainer}>
              <Group justify="space-between" align="center">
                <Box>
                  <AppText instancetype="WithTitleSectionTrade">
                    Top New Talents
                  </AppText>
                  <AppText instancetype="WithSubTitleSectionTrade">
                    New traders with high profit and low drawdown.
                  </AppText>
                </Box>
                <AppButton
                  variant="transparent"
                  instancetype="WithRightIcon"
                  size="lg"
                  fw={"bold"}
                >
                  View More
                </AppButton>
              </Group>
              <Flex>
                <Box w={"100%"}>
                  <AppCarousel>
                    {[...Array(10)].map((_, k) => (
                      <Carousel.Slide key={k}>
                        <CardTrader />
                      </Carousel.Slide>
                    ))}
                  </AppCarousel>
                </Box>
              </Flex>
            </Container>
          </Box>
          <Box py={35} className={classes.bgGradient}>
            <Container size={sizeContainer}>
              <Group justify="space-between" align="center">
                <Box>
                  <AppText instancetype="WithTitleSectionTrade">
                    Boosted Traders (+10% Bonus!)
                  </AppText>
                  <AppText instancetype="WithSubTitleSectionTrade">
                    Follow Boosted Traders and get an extra 10% in
                    bonuses on your investment, up to 50 USDT.
                  </AppText>
                </Box>
                <AppButton
                  variant="transparent"
                  instancetype="WithRightIcon"
                  size="lg"
                  fw={"bold"}
                >
                  View More
                </AppButton>
              </Group>
              <Space mb={30} />
              <Flex>
                <Box w={"100%"}>
                  <Grid>
                    {[...Array(3)].map((_, k) => (
                      <Grid.Col span={4} key={k}>
                        <CardTraderBonus />
                      </Grid.Col>
                    ))}
                  </Grid>
                </Box>
              </Flex>
            </Container>
          </Box>
          <Box py={35}>
            <Container size={sizeContainer}>
              <Group justify="space-between" align="center">
                <Box>
                  <AppText instancetype="WithTitleSectionTrade">
                    Traders With The Highest Profit For Followers
                  </AppText>
                  <AppText instancetype="WithSubTitleSectionTrade">
                    Traders that have earned the highest profits, in
                    USDT, for Followers.
                  </AppText>
                </Box>
                <AppButton
                  variant="transparent"
                  instancetype="WithRightIcon"
                  size="lg"
                  fw={"bold"}
                >
                  View More
                </AppButton>
              </Group>
              <Space mb={30} />
              <Flex>
                <Box w={"100%"}>
                  <Grid>
                    {[...Array(8)].map((_, k) => (
                      <Grid.Col key={k} span={3}>
                        <CardTrader />
                      </Grid.Col>
                    ))}
                  </Grid>
                </Box>
              </Flex>
            </Container>
          </Box>
          <Box py={35}>
            <Container size={sizeContainer}>
              <Group justify="space-between" align="center">
                <Box>
                  <AppText instancetype="WithTitleSectionTrade">
                    Lowest Drawdown
                  </AppText>
                  <AppText instancetype="WithSubTitleSectionTrade">
                    Traders with over 10% ROI and a max. drawdown of
                    less than 20% in the last 30 days.
                  </AppText>
                </Box>
                <AppButton
                  variant="transparent"
                  instancetype="WithRightIcon"
                  size="lg"
                  fw={"bold"}
                >
                  View More
                </AppButton>
              </Group>
              <Space mb={30} />
              <Flex>
                <Box w={"100%"}>
                  <Grid>
                    {[...Array(8)].map((_, k) => (
                      <Grid.Col key={k} span={3}>
                        <CardTrader />
                      </Grid.Col>
                    ))}
                  </Grid>
                </Box>
              </Flex>
            </Container>
          </Box>
          <Box py={35}>
            <Container size={sizeContainer}>
              <Group justify="space-between" align="center">
                <Box>
                  <AppText instancetype="WithTitleSectionTrade">
                    Top Intra-Day Traders
                  </AppText>
                  <AppText instancetype="WithSubTitleSectionTrade">
                    Intra-day traders with over 20% ROI and a win-rate
                    of more than 20% in the last 7 days.
                  </AppText>
                </Box>
                <AppButton
                  variant="transparent"
                  instancetype="WithRightIcon"
                  size="lg"
                  fw={"bold"}
                >
                  View More
                </AppButton>
              </Group>
              <Space mb={30} />
              <Flex>
                <Box w={"100%"}>
                  <Grid>
                    {[...Array(8)].map((_, k) => (
                      <Grid.Col key={k} span={3}>
                        <CardTrader />
                      </Grid.Col>
                    ))}
                  </Grid>
                </Box>
              </Flex>
            </Container>
          </Box>
          <Box pb={35}>
            <Container size={sizeContainer}>
              <AppButton
                variant="light"
                size="md"
                fullWidth
                instancetype="WithRightIcon"
              >
                View All Master Traders
              </AppButton>
            </Container>
          </Box>
        </Box>
      )}
      <Container size={sizeContainer}>
        {mode === "2" && (
          <Box mb={30}>
            <GridMasterTraders />
          </Box>
        )}
      </Container>
      <Footer metadata={data} />
    </>
  );
}
