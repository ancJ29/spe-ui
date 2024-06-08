// cspell: disable
/* eslint-disable jsx-a11y/anchor-is-valid */
import svgLogo from "@/assets/images/logo.svg";
import {
  Metadata,
  footerInfo,
  getFooter,
  getHeaderMenu,
} from "@/domain/MetaData";
import useMetadata from "@/hooks/useMetadata";
import AppButton from "@/ui/Button/AppButton";
import CarouselPage from "@/ui/Carousel/Carousel";
import AppChart, { randomizeArraySparkline } from "@/ui/Chart/Chart";
import Icon from "@/ui/Icon/Icon";
import { AppLogo } from "@/ui/Logo/Logo";
import MarqueeList from "@/ui/Marquee/Marquee";
import AppPill from "@/ui/Pill/AppPill";
import AppTable, { generateItems } from "@/ui/Table/AppTable";
import AppText from "@/ui/Text/AppText";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Burger,
  Button,
  Card,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Flex,
  Grid,
  Group,
  HoverCard,
  Image,
  Input,
  Menu,
  NumberFormatter,
  ScrollArea,
  SimpleGrid,
  Space,
  Tabs,
  Text,
  ThemeIcon,
  Timeline,
  Title,
  UnstyledButton,
  alpha,
  darken,
  lighten,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCaretDownFilled,
  IconCoin,
  IconMoon,
  IconSun,
  IconWorld,
} from "@tabler/icons-react";
import cx from "clsx";
import { Fragment, useMemo, useState } from "react";
import classes from "./index.module.scss";

type Gainer = {
  id: string;
  token: string;
  lastPrice: number;
  change: number;
  icon: string;
};

export default function TopPage() {
  const [mainTokens, setMainTokens] = useState(generateItems(6));
  const [gainersTokens] = useState(generateItems(3));
  const [newListingsTokens] = useState(generateItems(3));
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
        <Space h={50} />
        <Container size="xl">
          <Box>
            <CarouselPage />
          </Box>
          <Space h={30} />
          <Box>
            <Group justify="space-between">
              <Title order={2}>
                Catch Your Next Trading Opportunity
              </Title>
              <AppButton
                instanceType="WithRightIcon"
                size="lg"
                color="primary"
                variant="light"
              >
                See more
              </AppButton>
            </Group>
            <Space h={"md"} />
            <Grid gutter={"lg"}>
              <Grid.Col span={8}>
                <Card radius={"lg"} h={"100%"}>
                  <Tabs
                    defaultValue="first"
                    bd={1}
                    onChange={() => {
                      setMainTokens(generateItems(6));
                    }}
                  >
                    <Tabs.List bd={1}>
                      <Tabs.Tab value="first">
                        <AppText instanceType="TabTitle">
                          Favorites
                        </AppText>
                      </Tabs.Tab>
                      <Tabs.Tab value="second">
                        <AppText instanceType="TabTitle">
                          Hot Derivatives
                        </AppText>
                      </Tabs.Tab>
                      <Tabs.Tab value="third">
                        <AppText instanceType="TabTitle">
                          Hot Coins
                        </AppText>
                      </Tabs.Tab>
                    </Tabs.List>
                  </Tabs>
                  <Space h={5} />
                  <TableBar items={mainTokens} />
                </Card>
              </Grid.Col>
              <Grid.Col span={4}>
                <Card radius={"lg"} h={"100%"}>
                  <Box>
                    <Title order={4}>Top Gainers</Title>
                    <Space h={18} />
                    <Divider size={1} />
                    <Space h={10} />
                    <TableBarTopGainers items={gainersTokens} />
                  </Box>
                  <Space h={20} />
                  <Box>
                    <Title order={4}>New Listings</Title>
                    <Space h={18} />
                    <Divider size={1} />
                    <Space h={10} />
                    <TableBarNewListing items={newListingsTokens} />
                  </Box>
                </Card>
              </Grid.Col>
              <Grid.Col span={8}>
                <AppButton instanceType="WithRightIcon" size="lg">
                  Deposit or Buy Crypto
                </AppButton>
              </Grid.Col>
            </Grid>
            <Space h={50} />
            <TrendingTraders />
          </Box>
          {/* <Box>
                        <Icon iconProps={{ style: { width: rem(16), height: rem(16) } }} icon={IconBabyCarriageFilled} color={theme.colors.dark[7]} />
                    </Box> */}
        </Container>
        <Space h={50} />
        <Container size="xl">
          <QuickStart />
        </Container>
        <Space h={50} />
        <Container size="xl">
          <PartnerSection />
        </Container>
        <Space h={50} />
      </Box>
      {data && <Footer metadata={data} />}
    </>
  );
}

export function Header(props: Partial<{ metadata: Metadata }>) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const theme = useMantineTheme();
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });


  const menus = useMemo(() => {
    const _items = getHeaderMenu(props.metadata);
    return _items;
  }, [props.metadata]);

  const [opened, setOpened] = useState<Record<string, unknown>>({});

  const toggle = (id: string, _opened: boolean) => {
    setOpened((pr: Record<string, unknown>) => {
      return { ...pr, [id]: _opened };
    });
  };

  return (
    <>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group h="100%">
            {/* <Avatar color="primary" radius="xl" src={svgLogo}>SE</Avatar> */}
            <a href="/top-page">
              <Image src={svgLogo} w={100} />
            </a>
            <Group h="100%" gap={0} visibleFrom="sm">
              {menus.map((item, idx) => {
                return (
                  <Fragment key={idx}>
                    {item.type === "group" && (
                      <Menu
                        variant="transparent"
                        position="bottom-start"
                        shadow="md"
                        width={300}
                        trigger="hover"
                        offset={0}
                      >
                        <Menu.Target>
                          <a href="#" className={classes.link}>
                            <Center inline>
                              <Box component="span" mr={5}>
                                {item.label}
                              </Box>
                              <IconCaretDownFilled
                                style={{
                                  width: rem(16),
                                  height: rem(16),
                                }}
                                color={lighten(
                                  theme.colors.dark[7],
                                  1,
                                )}
                                className={cx(
                                  classes.icon,
                                  classes.translate,
                                )}
                              />
                            </Center>
                          </a>
                        </Menu.Target>
                        <Menu.Dropdown
                          bg={"black"}
                          variant="transparent"
                          style={{ border: "none", borderRadius: 0 }}
                        >
                          {(item.children || []).map((_item, i) => (
                            <UnstyledButton
                              className={classes.subLink}
                              key={i}
                              variant="transparent"
                            >
                              <Group wrap="nowrap" align="flex-start">
                                <div>
                                  <Text
                                    size="sm"
                                    fw={500}
                                    className={classes.subLinkTitle}
                                  >
                                    {_item?.label}
                                  </Text>
                                  <Text size="xs" c="dimmed">
                                    {_item?.description ??
                                      "lorem ispum"}
                                  </Text>
                                </div>
                              </Group>
                            </UnstyledButton>
                          ))}
                        </Menu.Dropdown>
                      </Menu>
                    )}
                    {item.type === "link" && (
                      <a href="#" className={classes.link}>
                        {item.label}
                      </a>
                    )}
                    {item.type === "panel" && (
                      <HoverCard
                        width={600}
                        position="bottom-start"
                        radius="md"
                        shadow="md"
                        withinPortal
                        offset={0}
                      >
                        <HoverCard.Target>
                          <a href="#" className={classes.link}>
                            <Center inline>
                              <Box component="span" mr={5}>
                                {item.label}
                              </Box>
                              <IconCaretDownFilled
                                style={{
                                  width: rem(16),
                                  height: rem(16),
                                }}
                                color={lighten(
                                  theme.colors.dark[7],
                                  1,
                                )}
                                className={cx(
                                  classes.icon,
                                  classes.translate,
                                )}
                              />
                            </Center>
                          </a>
                        </HoverCard.Target>

                        <HoverCard.Dropdown
                          style={{
                            overflow: "hidden",
                            border: "none",
                            borderRadius: 0,
                          }}
                          bg={"black"}
                        >
                          <Group justify="space-between" px="md">
                            <Text fw={500} c={"primary"}>
                              {item.panelFooter.title}
                            </Text>
                            <Anchor href="#" fz="xs">
                              View all
                            </Anchor>
                          </Group>

                          <Divider
                            my="sm"
                            color={lighten("white", 0.4)}
                          />
                          <SimpleGrid cols={2} spacing={0}>
                            {item.children.map((_item, i) => (
                              <UnstyledButton
                                key={i}
                                className={classes.subLink}
                                variant="transparent"
                              >
                                <Group
                                  wrap="nowrap"
                                  align="flex-start"
                                >
                                  <ThemeIcon
                                    size={34}
                                    variant="transparent"
                                    radius="md"
                                  >
                                    {/* <item.icon style={{ width: rem(22), height: rem(22) }} color={"white"} /> */}
                                    {/* <IconCode style={{ width: rem(22), height: rem(22) }} color={"white"} /> */}
                                    {/* IconCoin */}
                                    <Icon
                                      instanceIcon="IconCoin"
                                      style={{
                                        width: rem(22),
                                        height: rem(22),
                                      }}
                                    />
                                  </ThemeIcon>
                                  <div>
                                    <Text
                                      size="sm"
                                      fw={500}
                                      className={classes.subLinkTitle}
                                    >
                                      {_item?.label}
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                      Lorem ipsum dolor sit amet
                                      consectetur adipisicing elit.
                                    </Text>
                                  </div>
                                </Group>
                              </UnstyledButton>
                            ))}
                          </SimpleGrid>
                          <Divider
                            my="sm"
                            color={lighten("white", 0.4)}
                          />
                          <div className={classes.dropdownFooter}>
                            <Group justify="space-between">
                              <div>
                                <Text fw={500} fz="sm" c={"white"}>
                                  Get started
                                </Text>
                                <Text size="xs" c="dimmed">
                                  {item.panelFooter.description}
                                </Text>
                              </div>
                              <Button>Get started</Button>
                            </Group>
                          </div>
                        </HoverCard.Dropdown>
                      </HoverCard>
                    )}
                  </Fragment>
                );
              })}
            </Group>
          </Group>

          <Group visibleFrom="sm" h="100%">
            <Group h="100%" gap={2}>
              <AppButton
                instanceType="Ghost"
                color="white"
                component="a"
                href="/login"
              >
                Log In
              </AppButton>
              <AppButton component="a" href="/register">
                Sign up
              </AppButton>
            </Group>
            <Group h="100%" gap={0}>
              <Menu
                shadow="none"
                width={150}
                trigger="hover"
                radius={0}
                offset={0}
              >
                <Menu.Target>
                  <ActionIcon
                    variant="transparent"
                    size="xl"
                    h={"100%"}
                  >
                    <IconWorld
                      color={lighten(theme.colors.dark[7], 1)}
                    />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown
                  bg={"black"}
                  bd={"none"}
                  style={{ border: "none" }}
                >
                  <Menu.Item c={"white"} className={classes.menulan}>
                    English
                  </Menu.Item>
                  <Menu.Item c={"white"} className={classes.menulan}>
                    日本語
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <ActionIcon
                onClick={() =>
                  setColorScheme(
                    computedColorScheme === "light"
                      ? "dark"
                      : "light",
                  )
                }
                variant="transparent"
                size="xl"
                aria-label="Toggle color scheme"
              >
                {colorScheme === "light" && <IconSun color={lighten(theme.colors.dark[7], 1)} />}
                {colorScheme === "dark" && <IconMoon color={lighten(theme.colors.dark[7], 1)} />}

              </ActionIcon>
            </Group>
          </Group>

          <Burger
            color="white"
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="75%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider />
          {menus.map((item, idx) => {
            return (
              <Fragment key={idx}>
                {item.type === "group" && (
                  <>
                    <UnstyledButton
                      className={cx(
                        classes.link,
                        classes.colorDefault,
                      )}
                      onClick={() =>
                        toggle(
                          `${item.label}${item.type}`,
                          !opened[`${item.label}${item.type}`],
                        )
                      }
                    >
                      <Group justify="space-between" w={"100%"}>
                        <Box component="span" mr={5}>
                          {item.label}
                        </Box>
                        <IconCaretDownFilled
                          style={{ width: rem(16), height: rem(16) }}
                          className={cx(
                            classes.icon,
                            classes.translate,
                          )}
                        />
                      </Group>
                    </UnstyledButton>
                    <Collapse
                      in={
                        Boolean(
                          opened[`${item.label}${item.type}`],
                        ) === true
                      }
                    >
                      {item.children.map((_item, i) => (
                        <UnstyledButton
                          key={i}
                          className={classes.subLink}
                          variant="transparent"
                        >
                          <Group wrap="nowrap" align="flex-start">
                            <ThemeIcon
                              size={34}
                              variant="transparent"
                              radius="md"
                            >
                              {/* <Icon instanceicon="IconCoin" style={{ width: rem(22), height: rem(22) }} /> */}
                              <IconCoin />
                            </ThemeIcon>
                            <div>
                              <Text
                                size="sm"
                                fw={500}
                                className={cx(
                                  classes.subLinkTitle,
                                  classes.defaultColor,
                                )}
                              >
                                {_item?.label}
                              </Text>
                              <Text size="xs" c="dimmed">
                                Lorem ipsum dolor sit, amet
                                consectetur adipisicing elit.
                              </Text>
                            </div>
                          </Group>
                        </UnstyledButton>
                      ))}
                    </Collapse>
                  </>
                )}
                {item.type === "link" && (
                  <a
                    href="#"
                    className={cx(classes.link, classes.colorDefault)}
                  >
                    {item.label}
                  </a>
                )}
                {item.type === "panel" && (
                  <>
                    <UnstyledButton
                      className={cx(
                        classes.link,
                        classes.colorDefault,
                      )}
                      onClick={() =>
                        toggle(
                          `${item.label}${item.type}`,
                          !opened[`${item.label}${item.type}`],
                        )
                      }
                    >
                      <Group justify="space-between" w={"100%"}>
                        <Box component="span" mr={5}>
                          {item.label}
                        </Box>
                        <IconCaretDownFilled
                          style={{ width: rem(16), height: rem(16) }}
                          className={cx(
                            classes.icon,
                            classes.translate,
                          )}
                        />
                      </Group>
                    </UnstyledButton>
                    <Collapse
                      in={
                        Boolean(
                          opened[`${item.label}${item.type}`],
                        ) === true
                      }
                    >
                      {item.children.map((_item, i) => (
                        <UnstyledButton
                          key={i}
                          className={classes.subLink}
                          variant="transparent"
                        >
                          <Group wrap="nowrap" align="flex-start">
                            <ThemeIcon
                              size={34}
                              variant="transparent"
                              radius="md"
                            >
                              {/* <Icon instanceicon="IconCoin" style={{ width: rem(22), height: rem(22) }} /> */}
                              <IconCoin />
                            </ThemeIcon>
                            <div>
                              <Text
                                size="sm"
                                fw={500}
                                className={cx(
                                  classes.subLinkTitle,
                                  classes.defaultColor,
                                )}
                              >
                                {_item?.label}
                              </Text>
                              <Text size="xs" c="dimmed">
                                Lorem ipsum dolor sit, amet
                                consectetur adipisicing elit.
                              </Text>
                            </div>
                          </Group>
                        </UnstyledButton>
                      ))}
                    </Collapse>
                  </>
                )}
              </Fragment>
            );
          })}
          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <AppButton variant="default">Log in</AppButton>
            <AppButton>Sign up</AppButton>
          </Group>
          <Group h="100%" gap={0}>
            <Menu
              shadow="none"
              width={150}
              trigger="hover"
              radius={0}
              offset={0}
            >
              <Menu.Target>
                <ActionIcon
                  variant="transparent"
                  size="xl"
                  h={"100%"}
                >
                  <IconWorld />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown
                bg={"black"}
                bd={"none"}
                style={{ border: "none" }}
              >
                <Menu.Item c={"white"} className={classes.menulan}>
                  English
                </Menu.Item>
                <Menu.Item c={"white"} className={classes.menulan}>
                  日本語
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <ActionIcon
              onClick={() =>
                setColorScheme(
                  computedColorScheme === "light" ? "dark" : "light",
                )
              }
              variant="transparent"
              size="xl"
              aria-label="Toggle color scheme"
            >
              <IconSun />
            </ActionIcon>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
}

function Banner() {
  return (
    <>
      <Box className={classes.banner} py={40}>
        <Container size="xl">
          <Flex gap={"xl"} align={"center"}>
            <Box>
              <Title pb={10} className={classes.textLight}>
                Invest Like The Best.
              </Title>
              <Title pb={10} className={classes.textPrimary}>
                Vie for triumph and win up to 25,000 USDT!
              </Title>
              <Text pb={10} size="lg" c="white">
                Trade crypto and win big, just like a pro.Simple.
                Smart. Secure.
              </Text>
              <Grid>
                <Grid.Col span={6}>
                  <Input
                    size="xl"
                    variant="default"
                    placeholder="Email or Phone Number"
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <AppButton size="xl">Sign Up</AppButton>
                </Grid.Col>
              </Grid>
            </Box>
            <Box
              w={400}
              onWaiting={() => {
                // TODO
              }}
              mx={"auto"}
            >
              <Image
                mx={"auto"}
                src={
                  "https://static-prod.omtrade.com/w-static/_next/static/media/home-bg.c8f0c5a4.png"
                }
              />
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
}

function SliderNotice() {
  return (
    <>
      <Box h={52} className={classes.contentmarquee}>
        <Container h="100%" size="xl">
          <Group align="center" h="100%">
            <MarqueeList>
              <Text fw={700} px={10} c="black">
                Crypto Cup 2024 Pre-Game: Train & Win 50,000 USDT in
                Football Rewards!
              </Text>
              <Text fw={700} px={10} c="black">
                Crypto Cup 2024 Pre-Game: Train & Win 50,000 USDT in
                Football Rewards!
              </Text>
              <Text fw={700} px={10} c="black">
                Crypto Cup 2024 Pre-Game: Train & Win 50,000 USDT in
                Football Rewards!
              </Text>
            </MarqueeList>
          </Group>
        </Container>
      </Box>
    </>
  );
}

function TableBar(props: { items: Gainer[] }) {
  const fields = [
    {
      name: "token",
      text: "Trading Pairs",
    },
    {
      name: "price",
      text: "Last Traded Price",
    },
    {
      name: "change",
      text: "24H Change",
    },
    {
      name: "Charts",
      text: "Charts",
    },
    {
      name: "Trade",
      text: "Trade",
    },
  ];

  return (
    <AppTable
      fields={fields}
      items={props.items}
      fieldTemplate={renderCell}
    />
  );
}

function renderCell(
  field: {
    name: string;
    text: string;
  },
  element: Gainer,
) {
  if (field.name == "token") {
    return (
      <Group align="center" gap={"sm"}>
        <Avatar size={28} src={element.icon}></Avatar>
        <AppText instanceType="WithCellToken">
          {element.token}
        </AppText>
      </Group>
    );
  }
  if (field.name == "price") {
    return (
      <AppText instanceType="WithCellToken">
        {element.lastPrice}
      </AppText>
    );
  }
  if (field.name == "change") {
    return (
      <AppText
        instanceType="WithCellToken"
        c={element.change > 0 ? "green" : "red"}
      >
        {element.change > 0 ? "+" : ""}
        <NumberFormatter value={element.change} decimalScale={2} />%
      </AppText>
    );
  }
  if (field.name == "Charts") {
    let chartOptions = {
      colors: ["#ff0000"],
      fill: {
        opacity: 0.4,
        colors: ["#ff0000"], // Set màu nền cho phần fill của biểu đồ
      },
    };
    if (element.change > 0) {
      chartOptions = {
        colors: ["#00E396"],
        fill: {
          opacity: 0.4,
          colors: ["#00E396"], // Set màu nền cho phần fill của biểu đồ
        },
      };
    }
    return (
      <div>
        <AppChart
          instanceType="Sparkline"
          chartSeries={randomizeArraySparkline()}
          chartOptions={chartOptions}
        />
      </div>
    );
  }
  if (field.name == "Trade") {
    return (
      <AppButton instanceType="WithOutlinedColor">Trade</AppButton>
    );
  }
}

function TableBarTopGainers(props: { items: Gainer[] }) {
  const fields = [
    {
      name: "token",
      text: "Trading Pairs",
    },
    {
      name: "price",
      text: "Last Traded Price",
    },
    {
      name: "change",
      text: "24H Change",
    },
  ];
  return (
    <AppTable
      fields={fields}
      items={props.items}
      fieldTemplate={renderCell}
      hideHeader
    />
  );
}

function TableBarNewListing(props: { items: Gainer[] }) {
  const fields = [
    {
      name: "token",
      text: "Trading Pairs",
    },
    {
      name: "price",
      text: "Last Traded Price",
    },
    {
      name: "change",
      text: "24H Change",
    },
  ];
  return (
    <AppTable
      fields={fields}
      items={props.items}
      fieldTemplate={renderCell}
      hideHeader
    />
  );
}

function TrendingTraders() {
  const items = [...Array(20)];
  return (
    <div>
      <Title order={2}>Trending traders</Title>
      <Title order={5}>
        {
          "Find your favorite master. Invest along the best. It's simple"
        }
        - when they profit, you do too.
      </Title>
      <Space h={"md"} />
      <Card radius={"lg"} py={60}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 10 }}>
          <Grid.Col span={3}>
            <Card radius="md" h={"100%"}>
              <Center h={"100%"}>
                <Box>
                  <Title order={3}>Copy Trading</Title>
                  <Title order={5} c={"gray"} fw={"normal"}>
                    Let top traders work for you
                  </Title>
                  <Space h={"md"} />
                  <Flex justify={"space-between"}>
                    <Box>
                      <Title order={3}>106K+</Title>
                      <Title order={5} c={"gray"} fw={"normal"}>
                        Master Traders
                      </Title>
                    </Box>
                    <Box>
                      <Title order={3}>832K+</Title>
                      <Title order={5} c={"gray"} fw={"normal"}>
                        Followers
                      </Title>
                    </Box>
                  </Flex>
                  <Space h={"xl"} />
                  <AppButton instanceType="WithRightIcon" size="md">
                    View All Masters
                  </AppButton>
                </Box>
              </Center>
            </Card>
          </Grid.Col>
          <Grid.Col span={9}>
            <Card>
              <MarqueeList speed={100}>
                {items.map((_, _k) => (
                  <Card
                    key={_k}
                    padding="lg"
                    radius="md"
                    mx={5}
                    bg={alpha("gray", 0.03)}
                    withBorder
                  >
                    <Flex gap={"md"} align={"center"}>
                      <Box>
                        <Avatar
                          size={44}
                          src={
                            "https://www.bybit.com/bycsi-root/fop/copytrade/d4b50bbb-a63f-4675-808a-5b60ae5cdf22.jpg?quality=50&format=avif&resize=width/44"
                          }
                        />
                      </Box>
                      <Box>
                        <Title order={5}>GlimmerGrace</Title>
                        <Text c={"gray"}>24 Followers</Text>
                      </Box>
                    </Flex>
                    <Space h={"md"} />
                    <Box>
                      <Box>
                        <Title order={6} fw={"normal"} c={"gray"}>
                          7D ROI
                        </Title>
                        <Title order={4} fw={"bold"}>
                          394.80%
                        </Title>
                      </Box>
                      <Space h={"sm"} />
                      <Box>
                        <Title order={6} fw={"normal"} c={"gray"}>
                          {"7D followers' Pnl"}
                        </Title>
                        <Title order={4} fw={"bold"}>
                          1,9444.23
                        </Title>
                      </Box>
                    </Box>
                    <Space h={"md"} />
                    <AppButton
                      instanceType="GhostWithRightIcon"
                      size="lg"
                    >
                      Copy
                    </AppButton>
                    <AppPill />
                  </Card>
                ))}
              </MarqueeList>
            </Card>
          </Grid.Col>
        </Grid>
      </Card>
    </div>
  );
}

function QuickStart() {
  return (
    <>
      <Card radius={"lg"} py={60}>
        <Grid>
          <Grid.Col span={6}>
            <Center h={"100%"}>
              <Box>
                <Title order={1}>Get Started in Minutes</Title>
                <Space h={30} />
                <Group justify="center">
                  <AppButton
                    size="xl"
                    loaderProps={{ type: "bars" }}
                    instanceType="WithRightIcon"
                  >
                    Start Now
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
                    Create a free OMTrade Account.{" "}
                  </Title>
                }
              >
                <Text>Create a free OMTrade Account.</Text>
              </Timeline.Item>

              <Timeline.Item
                bullet={<Title order={3}>2</Title>}
                title={
                  <Title order={3} lineClamp={10}>
                    Find master traders that best serve your financial
                    goals.
                  </Title>
                }
              >
                <Text>Create a free OMTrade Account.</Text>
              </Timeline.Item>
              <Timeline.Item
                bullet={<Title order={3}>3</Title>}
                title={
                  <Title order={3} lineClamp={10}>
                    Start copy trading and watch your portfolio grow!
                  </Title>
                }
              >
                <Text>Create a free OMTrade Account.</Text>
              </Timeline.Item>
            </Timeline>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
}

function PartnerSection() {
  const items = [
    "https://www.omtrade.com/_next/image?url=https%3A%2F%2Fstatic-prod.omtrade.com%2Fw-static%2F_next%2Fstatic%2Fmedia%2FIncuba.ad4be468.png&w=256&q=100",
    "https://www.omtrade.com/_next/image?url=https%3A%2F%2Fstatic-prod.omtrade.com%2Fw-static%2F_next%2Fstatic%2Fmedia%2FMeteorite.82d8b227.png&w=384&q=100",
    "https://www.omtrade.com/_next/image?url=https%3A%2F%2Fstatic-prod.omtrade.com%2Fw-static%2F_next%2Fstatic%2Fmedia%2FKSK.9a4c96b2.png&w=384&q=100",
    "https://www.omtrade.com/_next/image?url=https%3A%2F%2Fstatic-prod.omtrade.com%2Fw-static%2F_next%2Fstatic%2Fmedia%2FBloomberg-black.c7228817.png&w=384&q=100",
    "https://www.omtrade.com/_next/image?url=https%3A%2F%2Fstatic-prod.omtrade.com%2Fw-static%2F_next%2Fstatic%2Fmedia%2FVector.5f71abbb.png&w=256&q=100",
    "https://www.omtrade.com/_next/image?url=https%3A%2F%2Fstatic-prod.omtrade.com%2Fw-static%2F_next%2Fstatic%2Fmedia%2FLayer-black.058d4ea8.png&w=384&q=100",
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

export function Footer(props: Partial<{ metadata: Metadata }>) {
  const footer = useMemo<footerInfo>(() => {
    return getFooter(props.metadata);
  }, [props.metadata]);
  return (
    <footer>
      <Box py={40} className={classes.footer}>
        <Container size="xl">
          <Grid>
            <Grid.Col span={3}>
              <Group gap={10}>
                {/* <Avatar variant='filled' color="primary" radius="xl" size={30}>SE</Avatar> */}
                {/* <Image src={svgLogoLight} w={150} /> */}
                {/* <Title order={4}>Simple Exchange</Title> */}
                <AppLogo />
              </Group>
              <Flex gap={10} mt={30}>
                {footer.socials.map((s, i) => (
                  <a
                    href={s.url ?? "#"}
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
            <Grid.Col span={9}>
              <Grid justify="flex-end">
                {footer.groups.map((group, i) => (
                  <Grid.Col span={3} key={i}>
                    <Title order={4} mb={14} c="primary">
                      {group.name}
                    </Title>
                    <Group>
                      {group.links.map((link, i) => (
                        <a
                          className={classes.foolink}
                          key={i}
                          href={link.url}
                        >
                          <Text size="sm">{link.label}</Text>
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
        <Container size="xl">
          <Group justify="center" py={10}>
            <Text fz={"12px"}>{footer.copyRight}</Text>
            <Text
              className={classes.hoverlink}
              fz={"12px"}
              component="a"
              href={footer.termOfService.url}
            >
              {footer.termOfService.name}
            </Text>
            <Text
              className={classes.hoverlink}
              fz={"12px"}
              component="a"
              href={footer.privacyTerms.url}
              target="_blank"
            >
              {footer.privacyTerms.name}
            </Text>
          </Group>
        </Container>
      </Box>
    </footer>
  );
}
