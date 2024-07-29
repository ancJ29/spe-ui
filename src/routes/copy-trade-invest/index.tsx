import allTraderIcon from "@/assets/images/all-trader.svg";
import topTradeIcon from "@/assets/images/top-trader.svg";
import useSPETranslation from "@/hooks/useSPETranslation";
import authStore from "@/store/auth";
import AppButton from "@/ui/Button/AppButton";
import { CardTrader, CardTraderTop1 } from "@/ui/CardCopyTrades";
import { AppCarousel } from "@/ui/Carousel/Carousel";
import NumberFormat from "@/ui/NumberFormat";
import { OptionFilter } from "@/ui/OptionFilter";
import AppText from "@/ui/Text/AppText";
import { Carousel } from "@mantine/carousel";
import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  Input,
  SegmentedControl,
  SimpleGrid,
  Space,
  Tabs,
  Text,
  Title,
  lighten,
} from "@mantine/core";
import { useMediaQuery, useToggle } from "@mantine/hooks";
import { IconEye, IconEyeOff, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./index.module.scss";
import { SelectAsMenu } from "@/ui/SelectAsMenu";

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
  const [mode, setMode] = useState<"1" | "2">("1");
  const t = useSPETranslation();
  const [isOffPrice, togglePrice] = useToggle([false, true]);
  const navigate = useNavigate();
  const { me } = authStore();
  const a = useMediaQuery("")

  return (
    <>
      <Box className="banner-copy">
        <Center w={"100%"} h={"100%"}>
          <Container size={sizeContainer} w={"100%"}>
            <Flex justify={"space-between"} gap={20} wrap={{
              xs: "wrap",
              sm: "nowrap"
            }}>
              <Box>
                <Center h={"100%"}>
                  <Box>
                    <Text className="textWithCopy">
                      {t("Copy Trading")}
                    </Text>
                    <AppText
                      fz={24}
                      c={lighten("black", 1)}
                      instancetype="BannerTextSub"
                    >
                      {t(
                        "Earning with ease by copying the moves of top traders.",
                      )}
                    </AppText>
                    <Space mb={20} />
                    <Flex gap={20}>
                      {me?.isCopyMaster ? (
                        <AppButton
                          size="md"
                          instancetype="WithRightIcon"
                          onClick={() =>
                            navigate("/copy/master/positions")
                          }
                        >
                          {t("My Master Dashboard")}
                        </AppButton>
                      ) : (
                        <AppButton
                          size="md"
                          instancetype="WithRightIcon"
                          onClick={() =>
                            navigate("/inquiry?type=CopyMaster")
                          }
                        >
                          {t("Become a Master")}
                        </AppButton>
                      )}
                    </Flex>
                  </Box>
                </Center>
              </Box>
              <Card
                pos={"relative"}
                w={{
                  xs: "100%",
                  sm: 394
                }}
                mih={"176px"}
                radius={12}
                p={0}
                c={"white"}
                bd={"1px solid rgba(178,203,221, .3)"}
                bg={
                  "linear-gradient(289.57deg,rgba(15,19,35,.2) 6.82%,hsla(0,0%,100%,.092) 79.78%)"
                }
              >
                <Box
                  style={{
                    padding: "20px 18px",
                  }}
                  pos={"relative"}
                >
                  <Flex align={"center"} gap={10}>
                    <AppText fz={"20px"} fw={"bold"}>
                      {t("My Copy Trading")}
                    </AppText>
                    <Box>
                      <Button
                        c={"white"}
                        p={0}
                        m={0}
                        variant="transparent"
                        onClick={() => togglePrice()}
                      >
                        {isOffPrice ? <IconEyeOff /> : <IconEye />}
                      </Button>
                    </Box>
                  </Flex>
                  <Space my={"sm"} />
                  <Flex gap={40}>
                    <Box>
                      <Text fz={12} c={"dimmed"}>
                        {t("Unrealized PnL(USDT)")}
                      </Text>
                      <Title order={4}>
                        <NumberFormat
                          value={0}
                          decimalPlaces={2}
                          hidden={isOffPrice}
                        />
                      </Title>
                    </Box>
                    <Box>
                      <Text fz={12} c={"dimmed"}>
                        {t("Total Assets(USDT)")}
                      </Text>
                      <Title order={4}>
                        <NumberFormat
                          value={0}
                          decimalPlaces={2}
                          hidden={isOffPrice}
                        />
                      </Title>
                    </Box>
                  </Flex>
                  <Space my={"sm"} />
                  <Link
                    style={{
                      all: "unset",
                      display: "block",
                    }}
                    to={"/copy/mine/traders"}
                  >
                    <AppButton
                      fullWidth
                      variant="gradient"
                      gradient={{
                        from: "primary",
                        to: "yellow",
                        deg: 90,
                      }}
                    >
                      {t("View More")}
                    </AppButton>
                  </Link>
                </Box>
              </Card>
            </Flex>
          </Container>
        </Center>
      </Box>
      <Tabs
        keepMounted
        defaultValue={mode}
        classNames={classes}
        onChange={(v) => setMode(v as "1" | "2")}
      >
        <Box
          style={{ position: "sticky", top: 0, left: 0, zIndex: 9 }}
          className={classes.boxSticky}
        >
          <Container size={sizeContainer}>
            <Flex justify={"space-between"} w={"100%"} wrap={{
              xs: "wrap",
              sm: "nowrap"
            }}>
              <Tabs.List w={{
                xs: "100%",
                sm: "auto"
              }}>
                <Tabs.Tab w={"50%"} styles={{
                  tab: {
                    // padding: "5px 0"
                  },
                }}
                  value={"1"}
                  leftSection={
                    <>
                      <Image visibleFrom="md" width={30} src={topTradeIcon} />
                    </>
                  }
                >
                  <AppText instancetype="TabText" fz={{
                    xs: "16px",
                    md: "20px"
                  }}>
                    {t("Top Master Traders")}
                  </AppText>
                </Tabs.Tab>
                <Tabs.Tab w={"50%"} styles={{
                  tab: {
                    // padding: "5px 0"
                  },
                }}
                  value="2"
                  leftSection={
                    <Image visibleFrom="md" width={30} src={allTraderIcon} />
                  }
                >
                  <AppText instancetype="TabText" fz={{
                    xs: "16px",
                    md: "20px"
                  }}>
                    {t("All Master Traders")}
                  </AppText>
                </Tabs.Tab>
              </Tabs.List>
              <Flex py={{
                xs: 10,
                sm: "0"
              }} align={"center"} gap={25} w={{
                xs: "100%",
                sm: "auto"
              }} direction={{
                xs: "row-reverse",
                sm: "unset"
              }}>
                {mode === "2" && <Checkbox label={t("Followable")} />}
                <Box flex={{
                  xs: 1,
                  sm: "auto"
                }}>
                  <Input
                    variant="filled"
                    placeholder={t("Search traders")}
                    rightSection={<IconSearch size={16} />}
                  />
                </Box>
                {/* <AppButton
                variant="gradient"
                gradient={{ from: "primary", to: "yellow", deg: 90 }}
              >
                Daily Picks
              </AppButton> */}
              </Flex>
            </Flex>
            <Divider />
          </Container>
        </Box>
        <Tabs.Panel value="1">
          <Box py={10}>
            <Box pb={35}>
              <Container size={sizeContainer}>
                <Group justify="space-between" align="center">
                  <Box>
                    <AppText instancetype="WithTitleSectionTrade">
                      {t("Highest PnL%")}
                    </AppText>
                    <AppText instancetype="WithSubTitleSectionTrade">
                      {t(
                        "Maximize returns: Copy the top masters in percentage leader-board",
                      )}
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
            <Box py={35} className={classes.bgGradient}>
              <Container size={sizeContainer}>
                <Group justify="space-between" align="center">
                  <Box>
                    <AppText instancetype="WithTitleSectionTrade">
                      {t("Highest Abs. PnL")}
                    </AppText>
                    <AppText instancetype="WithSubTitleSectionTrade">
                      {t(
                        "Leaders in absolute profit: Your pathway to substantial gains",
                      )}
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
                    <AppCarousel className="app-carousel-orange">
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
                      {t("Highest Win Rate")}
                    </AppText>
                    <AppText instancetype="WithSubTitleSectionTrade">
                      {t(
                        "Consistent success: Masters with the highest win ratios",
                      )}
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
        </Tabs.Panel>
        <Tabs.Panel value="2">
          <Container size={sizeContainer}>
            <Box py={10}>
              <Flex gap={{
                xs: 20,
                sm: 3,
                md: 20
              }} align={"center"}>
                <Box>
                  <OptionFilter
                    value="Overview"
                    menuProps={{
                      trigger: "hover",
                    }}
                    label="Overview"
                    items={[
                      {
                        label: "Overview",
                        value: "Overview",
                      },
                      {
                        label: "Daily Settlement",
                        value: "Daily Settlement",
                      },
                      {
                        label: "High-Water Mark",
                        value: "High-Water Mark",
                      },
                    ]}
                  />
                </Box>
                <Box>
                  <Divider
                    orientation="vertical"
                    h={"20px"}
                    bg={"red"}
                    c={"red"}
                  />
                </Box>
                <SegmentedControl visibleFrom="sm"
                  withItemsBorders={false}
                  size="xs"
                  styles={{
                    root: {
                      background: "none",
                    },
                  }}
                  color={"primary"}
                  data={[
                    "PnL%",
                    "Abs. PnL",
                    "Followers",
                    "Win Rate",
                    "Drawdown",
                    "Avg. PnL",
                    "Avg. Holding Period",
                    "Trading Frequency",
                  ].map((el) => t(el))}
                />
                <Box hiddenFrom="sm">
                  <OptionFilter
                    menuProps={{
                      trigger: "hover",
                    }}
                    label="Trader Types"
                    items={[
                      "PnL%",
                      "Abs. PnL",
                      "Followers",
                      "Win Rate",
                      "Drawdown",
                      "Avg. PnL",
                      "Avg. Holding Period",
                      "Trading Frequency",
                    ].map((el) => ({
                      label: t(el),
                      value: el
                    }))}
                  />
                </Box>
              </Flex>
            </Box>
            <Box mb={30}>
              <SimpleGrid
                py={30}
                cols={{
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 3,
                  xl: 4,
                }}
              >
                {[...Array(100)].map((_, idx) => (
                  <CardTrader key={idx} />
                ))}
              </SimpleGrid>
            </Box>
          </Container>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
