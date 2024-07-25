// cspell: disable
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Application,
  ApplicationFooter,
  getFooter,
} from "@/domain/Application";
import useMetadata from "@/hooks/useMetadata";
import AppButton from "@/ui/Button/AppButton";
import { Header } from "@/ui/Header";
import { AppLogo } from "@/ui/Logo/Logo";
import MarqueeList from "@/ui/Marquee/Marquee";
import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Group,
  Highlight,
  Image,
  SimpleGrid,
  Space,
  Text,
  Timeline,
  Title,
} from "@mantine/core";
import {
  IconChevronsRight,
  IconCurrencyBitcoin,
} from "@tabler/icons-react";
import { useMemo } from "react";

import undraw_business_deal_re_up4u from "@/assets/images/undraw_business_deal_re_up4u.svg";
import undraw_done_re_oak4 from "@/assets/images/undraw_done_re_oak4.svg";
import undraw_product_iteration_kjok from "@/assets/images/undraw_product_iteration_kjok.svg";
import useTranslation from "@/hooks/useTranslation";
import classes from "./index.module.scss";

import journey_detailed from "@/assets/images/journey/detailed.jpg";
import journey_expertly from "@/assets/images/journey/expertly.jpg";
import journey_total from "@/assets/images/journey/total.jpg";
import journey_unlimited from "@/assets/images/journey/unlimited.jpg";

import partner_BloombergBlack from "@/assets/images/partners/Bloomberg-black.png";
import partner_Incuba from "@/assets/images/partners/Incuba.png";
import partner_KSK from "@/assets/images/partners/KSK.png";
import partner_LayerBlack from "@/assets/images/partners/Layer-black.png";
import partner_Meteorite from "@/assets/images/partners/Meteorite.png";
import partner_Vector from "@/assets/images/partners/Vector.png";

import { priceDisplay } from "@/common/utils";
import { CardTrader } from "@/ui/CardCopyTrades";
import NumberFormat from "@/ui/NumberFormat";
import { Link, useNavigate } from "react-router-dom";

export default function TopPage() {
  const { data } = useMetadata();

  return (
    <>
      <Header metadata={data} />
      <Banner />
      <SliderNotice />

      <Box
        className={classes.bgtopage}
        style={{ overflow: "hidden" }}
      >
        <Space my={"md"} />
        <Container>
          <CardsIntro />
        </Container>
        <Space h={50} />
        <Box>
          <SliderCoins />
          <TrendingTraders />
        </Box>
        <Space h={50} />
        <Container>
          <WhyCopyTradingSection />
        </Container>
        <Space h={50} />
        <Container>
          <JourneySection />
        </Container>
        <Space h={50} />
        <Container>
          <QuickStart />
        </Container>
        <Space h={50} />
        <Container fluid>
          <PartnerSection />
        </Container>
        <Space h={50} />
      </Box>
      <Footer metadata={data} />
    </>
  );
}

function Banner() {
  const t = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Box className="banner" py={40}>
        <Container>
          <Flex
            gap={"xl"}
            align={"center"}
            className="banner--box"
            justify={"space-between"}
          >
            <Box maw={"50%"} w={"100%"}>
              <Box>
                <Text fz={"55px"} pb={10} c={"white"} fw={"bolder"}>
                  {t("Invest Like The Best.")}
                </Text>
              </Box>
              <Title pb={10} className={classes.textPrimary}>
                {t(`Trade crypto and win big, just like a pro.Simple.
                Smart. Secure.`)}
              </Title>
              <Space my={"md"} />
              <Grid w={"fit-content"} gutter={0}>
                <Grid.Col span={6}>
                  <AppButton
                    size="xl"
                    radius={"xl"}
                    onClick={() =>
                      navigate("/trade/futures/BTC/USDT")
                    }
                  >
                    {t("Trade Now")}
                  </AppButton>
                </Grid.Col>
                <Grid.Col span={6}>
                  <AppButton
                    size="xl"
                    radius={"xl"}
                    variant="outline"
                    onClick={() => navigate("/copy-trading")}
                  >
                    {t("Copy Traders")}
                  </AppButton>
                </Grid.Col>
              </Grid>
            </Box>
            <Box>
              <Box
                maw={400}
                w={"100%"}
                onWaiting={() => {
                  // TODO
                }}
                mx={"auto"}
              >
                <Image
                  mx={"auto"}
                  maw={"100%"}
                  src={
                    "https://static-prod.omtrade.com/w-static/_next/static/media/home-bg.c8f0c5a4.png"
                  }
                />
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
}

function SliderNotice({ display = false }: { display?: boolean }) {
  const t = useTranslation();

  if (!display) {
    return <></>;
  }
  return (
    <>
      <Box h={52} className={classes.contentmarquee}>
        <Container h="100%">
          <Group align="center" h="100%">
            <MarqueeList>
              <Text fw={700} px={10} c="black">
                {t("Yahoo Finance: %s Announces Seed Round Funding")}
              </Text>
              {/* <Text fw={700} px={10} c="black">
                {t(
                  "Important Notice: Migration from OM Trade to CryptoCopyInvest",
                )}
              </Text> */}
            </MarqueeList>
          </Group>
        </Container>
      </Box>
    </>
  );
}

const getPercent = () => Math.random() * (145 - -35) + -35;
const sliderCoinsData = [
  ["SOL/USDT", 172.156, getPercent()],
  ["DOGE/USDT", 0.12902, getPercent()],
  ["AAVE/USDT", 92.39, getPercent()],
  ["ATOM/USDT", 6.116, getPercent()],
  ["MATIC/USDT", 0.5219, getPercent()],
  ["TRX/USDT", 0.13289, getPercent()],
  ["BTC/USDT", 65878.56, getPercent()],
  ["ETH/USDT", 3411.23, getPercent()],
];

function SliderCoins({ display = false }: { display?: boolean }) {
  return !display ? (
    <></>
  ) : (
    <Box h={52} bg={"dark"} c={"white"}>
      <Group align="center" h="100%">
        {/* DOGE/USDT 0.12902 (-7.57%) */}
        <MarqueeList>
          {sliderCoinsData.map(([i, price, p], index) => (
            <Text key={index} fw={700} px={10} c={"white"}>
              {i}{" "}
              <Text component="span" c={priceDisplay(price).color}>
                {price}
              </Text>
              (
              <Text component="span" c={priceDisplay(p).color}>
                <NumberFormat
                  prefix={priceDisplay(p).sub}
                  suffix="%"
                  value={p}
                />
              </Text>
              )
            </Text>
          ))}
        </MarqueeList>
      </Group>
    </Box>
  );
}

function CardsIntro() {
  const t = useTranslation();
  return (
    <>
      <Space my={"xl"} />
      <Title order={1} ta={"center"}>
        {t("Discover More Opportunities")}
      </Title>
      <Space my={"xl"} />
      <SimpleGrid
        cols={3}
        styles={{
          root: {
            gap: "40px",
          },
        }}
      >
        <Card radius="md">
          <Flex direction={"column"} h={"100%"}>
            <Highlight
              ta="left"
              highlight={["40% commission"]}
              highlightStyles={{
                backgroundImage:
                  "linear-gradient(45deg, var(--mantine-color-primary-5), var(--mantine-color-yellow-5))",
                fontWeight: 700,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              component={Title}
              order={4}
            >
              {t(
                "Invite friends and earn up to 40% commission for every trade they make in %s",
                localStorage.__APP_NAME__,
              )}
            </Highlight>
            <Space my={"md"} />
            <Box mt={"auto"}>
              <Button
                variant="gradient"
                gradient={{ from: "primary", to: "yellow", deg: 90 }}
              >
                {t("Start Inviting")}
                <IconChevronsRight size={18} />
              </Button>
            </Box>
          </Flex>
        </Card>
        <Card radius="md">
          <Flex direction={"column"} h={"100%"}>
            <Highlight
              ta="left"
              highlight={["10% profit sharing"]}
              highlightStyles={{
                backgroundImage:
                  "linear-gradient(45deg, var(--mantine-color-primary-5), var(--mantine-color-yellow-5))",
                fontWeight: 700,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              component={Title}
              order={4}
            >
              {t(
                "Earn up to 10% profit sharing effortlessly with the Promoter referral link",
              )}
            </Highlight>
            <Space my={"md"} />
            <Box mt={"auto"}>
              <Button
                variant="gradient"
                gradient={{ from: "primary", to: "yellow", deg: 90 }}
              >
                {t("Find Out More")}
                <IconChevronsRight size={18} />
              </Button>
            </Box>
          </Flex>
        </Card>
        <Card radius="md">
          <Flex direction={"column"} h={"100%"}>
            <Highlight
              ta="left"
              highlight={["COPY TRADING"]}
              highlightStyles={{
                backgroundImage:
                  "linear-gradient(45deg, var(--mantine-color-primary-5), var(--mantine-color-yellow-5))",
                fontWeight: 700,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              component={Title}
              order={4}
            >
              {t(
                "Seamlessly follow expert strategies! Maximize your profit with our COPY TRADING feature",
              )}
            </Highlight>
            <Space my={"md"} />
            <Box mt={"auto"} component={Link} to={"/copy-trading"}>
              <Button
                variant="gradient"
                gradient={{ from: "primary", to: "yellow", deg: 90 }}
              >
                {t("Copy Now")}
                <IconChevronsRight size={18} />
              </Button>
            </Box>
          </Flex>
        </Card>
      </SimpleGrid>
    </>
  );
}

function QuickStart() {
  const t = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Card radius={"lg"} py={60}>
        <Grid>
          <Grid.Col span={6}>
            <Center h={"100%"}>
              <Box>
                <Title order={1}>{t("Get Started in Minutes")}</Title>
                <Space h={30} />
                <Group justify="center">
                  <AppButton
                    size="xl"
                    loaderProps={{ type: "bars" }}
                    instancetype="WithRightIcon"
                    onClick={() => navigate("/register")}
                  >
                    {t("Start Now")}
                  </AppButton>
                </Group>
              </Box>
            </Center>
          </Grid.Col>
          <Grid.Col span={6}>
            <Timeline bulletSize={40} active={3}>
              <Timeline.Item
                bullet={<Title order={3}>1</Title>}
                title={
                  <Title order={3} lineClamp={10}>
                    {t(
                      "Create a free %s Account.",
                      localStorage.__APP_NAME__,
                    )}{" "}
                  </Title>
                }
              >
                <Text>
                  {t(
                    "Create a free %s Account.",
                    localStorage.__APP_NAME__,
                  )}
                </Text>
              </Timeline.Item>

              <Timeline.Item
                bullet={<Title order={3}>2</Title>}
                title={
                  <Title order={3} lineClamp={10}>
                    {t(
                      "Find master traders that best serve your financial goals.",
                    )}
                  </Title>
                }
              >
                <Text>
                  {t(
                    "Create a free %s Account.",
                    localStorage.__APP_NAME__,
                  )}
                </Text>
              </Timeline.Item>
              <Timeline.Item
                bullet={<Title order={3}>3</Title>}
                title={
                  <Title order={3} lineClamp={10}>
                    {t(
                      "Start copy trading and watch your portfolio grow!",
                    )}
                  </Title>
                }
              >
                <Text>
                  {t(
                    "Create a free %s Account.",
                    localStorage.__APP_NAME__,
                  )}
                </Text>
              </Timeline.Item>
            </Timeline>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
}

function WhyCopyTradingSection() {
  const t = useTranslation();
  return (
    <>
      <Card radius={"lg"} py={60}>
        <Title order={1} ta={"center"}>
          {t("Why Copy Trading?")}
        </Title>
        <Space my={"md"} />
        <SimpleGrid cols={3}>
          <Box ta={"center"}>
            <Flex align={"center"} h={200}>
              <Image
                mx={"auto"}
                w={200}
                src={undraw_product_iteration_kjok}
              />
            </Flex>
            <Space my={"md"} />
            <Title order={2}>{t("Simple")}</Title>
            <Space my={"md"} />
            <Text>
              {t(
                "Identify pro traders aligned with your goals effortlessly and automatically copy their moves.",
              )}
            </Text>
          </Box>
          <Box ta={"center"}>
            <Flex align={"center"} h={200}>
              <Image mx={"auto"} w={200} src={undraw_done_re_oak4} />
            </Flex>
            <Space my={"md"} />
            <Title order={2}>{t("Success")}</Title>
            <Space my={"md"} />
            <Text>
              {t(
                "Make smarter trades with insights from industry pros, giving you an edge in the market.",
              )}
            </Text>
          </Box>
          <Box ta={"center"}>
            <Flex align={"center"} h={200}>
              <Image
                mx={"auto"}
                w={200}
                src={undraw_business_deal_re_up4u}
              />
            </Flex>
            <Space my={"md"} />
            <Title order={2}>{t("Secure")}</Title>
            <Space my={"md"} />
            <Text>
              {t(
                "Learn from the best, observe their strategies, and dive into the community with confidence.",
              )}
            </Text>
          </Box>
        </SimpleGrid>
      </Card>
    </>
  );
}

function JourneySection() {
  const t = useTranslation();
  return (
    <>
      <Card radius={"lg"} py={60}>
        <Title order={1} ta={"center"}>
          {t("Elevate your crypto journey")}
        </Title>
        <Space my={"md"} />
        <Timeline active={4} bulletSize={40} lineWidth={2}>
          <Timeline.Item
            bullet={<IconCurrencyBitcoin size={20} />}
            title={
              <Title order={2}>{t("Unlimited Opportunities")}</Title>
            }
          >
            <Text c="dimmed" size="sm">
              {t(
                "Dream big and score fast wins with a day-trader? Or grow your portfolio steadily with a long-term investment fund? No problem, %s welcomes users of any approach, any level, and any budget.",
              )}
            </Text>
            <Box>
              <Image maw={300} mx={"auto"} src={journey_unlimited} />
            </Box>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconCurrencyBitcoin size={20} />}
            title={
              <Title order={2}>{t("Expertly Managed Funds")}</Title>
            }
          >
            <Text c="dimmed" size="sm">
              {t(`%s revolutionized copy trading: you can now pool money with other investors into a fund directly managed by a skilled trader of your choice.
The trader receives a percentage of the profits they earn based on monthly high watermarks, incentivizing patient investments that benefit everyone.`)}
            </Text>
            <Box>
              <Image maw={300} mx={"auto"} src={journey_expertly} />
            </Box>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconCurrencyBitcoin size={20} />}
            title={<Title order={2}>{t("Detailed Analytics")}</Title>}
          >
            <Text c="dimmed" size="sm">
              {t(
                "Dive into %s's powerful copy trading dashboard. Discover, explore, and evaluate the best traders in the industry. Use key metrics to compare traders side-by-side to find your perfect match.",
              )}
            </Text>
            <Box>
              <Image maw={300} mx={"auto"} src={journey_detailed} />
            </Box>
          </Timeline.Item>
          <Timeline.Item
            bullet={<IconCurrencyBitcoin size={20} />}
            title={<Title order={2}>{t("Total Transparency")}</Title>}
          >
            <Text c="dimmed" size="sm">
              {t(
                "No hidden fees, no tricky fine print, and no complicated liquidation windows. %s makes copy trading straightforward and transparent. Access easily available trader information, clear rules, and a suite of tools for informed, data-driven decisions.",
              )}
            </Text>
            <Box>
              <Image maw={300} mx={"auto"} src={journey_total} />
            </Box>
          </Timeline.Item>
        </Timeline>
      </Card>
    </>
  );
}

function TrendingTraders() {
  const t = useTranslation();
  const items = [...Array(20)];
  return (
    <div>
      <Card radius={"lg"} py={60}>
        <Title order={1} ta={"center"}>
          {t("Trending traders")}
        </Title>
        <Title order={5} ta={"center"}>
          {t(
            "Find your favorite master. Invest along the best. It's simple - when they profit, you do too.",
          )}
        </Title>

        <Card>
          <MarqueeList speed={100}>
            {items.map((_, _k) => (
              <Box key={_k} py={30} px={15}>
                <CardTrader />
              </Box>
            ))}
          </MarqueeList>
        </Card>
        <Flex justify={"center"}>
          <AppButton
            instancetype="WithRightIcon"
            size="md"
            variant="gradient"
            gradient={{ from: "primary", to: "yellow", deg: 90 }}
          >
            {t("View All Masters")}
          </AppButton>
        </Flex>
      </Card>
    </div>
  );
}

function PartnerSection() {
  const items = [
    partner_Incuba,
    partner_Meteorite,
    partner_BloombergBlack,
    partner_KSK,
    partner_LayerBlack,
    partner_Vector,
  ];
  return (
    <>
      <Box style={{ overflow: "hidden" }} w={"100%"}>
        <MarqueeList speed={90} loop={1000} pauseOnHover={false}>
          {items.map((img, _k) => (
            <Box opacity={0.4} mx={"xl"} key={_k}>
              <Image src={img} />
            </Box>
          ))}
        </MarqueeList>
      </Box>
    </>
  );
}

export function Footer(props: Partial<{ metadata?: Application }>) {
  const t = useTranslation();
  const footer = useMemo<ApplicationFooter>(() => {
    return getFooter(props.metadata);
  }, [props.metadata]);
  if (!props.metadata) {
    return <></>;
  }
  return (
    <footer>
      <Box py={40} className="footer">
        <Container>
          <Grid>
            <Grid.Col
              span={{
                md: 3,
              }}
            >
              <Group gap={10}>
                <AppLogo />
              </Group>
              <Flex gap={10} mt={30}>
                {footer.socials?.map((s, i) => (
                  <a
                    href={s.url ?? "/#"}
                    key={i}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Avatar
                      color="primary"
                      radius="sm"
                      src={s.icon}
                    />
                  </a>
                ))}
              </Flex>
            </Grid.Col>
            <Grid.Col
              span={{
                md: 9,
              }}
            >
              <Grid justify={"end"}>
                {footer.groups?.map((group, i) => (
                  <Grid.Col
                    span={{
                      xs: 6,
                      sm: 4,
                      md: 3,
                    }}
                    key={i}
                  >
                    <Title order={4} mb={14} c="primary">
                      {t(group.name)}
                    </Title>
                    <Group>
                      {group.links.map((link, i) => (
                        <a
                          className="foolink"
                          key={i}
                          href={link.url || "/#"}
                        >
                          <Text size="sm">{t(link.label)}</Text>
                        </a>
                      ))}
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
      <Box>
        <Container>
          <Group justify="center" py={10}>
            <Text fz={"12px"}>{footer.copyRight}</Text>
            <Text
              className="hoverlink"
              fz={"12px"}
              component="a"
              href={footer.termOfService.url}
            >
              {t(footer.termOfService.label)}
            </Text>
            <Text
              className={"hoverlink"}
              fz={"12px"}
              component="a"
              href={footer.privacyTerms.url}
              target="_blank"
            >
              {t(footer.privacyTerms.label)}
            </Text>
          </Group>
        </Container>
      </Box>
    </footer>
  );
}
