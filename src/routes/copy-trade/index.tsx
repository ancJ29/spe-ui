/* eslint-disable jsx-a11y/label-has-associated-control */
import alltraderIcon from "@/assets/images/alltrader.svg";
import moneyIcon from "@/assets/images/money.svg";
import topTradeIcon from "@/assets/images/toptrader.svg";
import trade_icon from "@/assets/images/trade_icon.png";
import useMetadata from "@/hooks/useMetadata";
import authStore from "@/store/auth";
import AppButton from "@/ui/Button/AppButton";
import AppCard from "@/ui/Card/AppCard";
import { AppCarousel } from "@/ui/Carousel/Carousel";
import AppChart from "@/ui/Chart/Chart";
import { Header } from "@/ui/Header";
import AppPill from "@/ui/Pill/AppPill";
import AppText from "@/ui/Text/AppText";
import { Carousel } from "@mantine/carousel";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Input,
  Menu,
  MenuDropdownProps,
  MenuProps,
  MenuTargetProps,
  Pagination,
  Popover,
  Space,
  Tabs,
  Text,
  Tooltip,
  lighten,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowRight,
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconChevronDown,
  IconCopy,
  IconInfoCircleFilled,
  IconSearch,
  IconStarFilled,
} from "@tabler/icons-react";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
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

const IndexPage = () => {
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
                          ? "/copy-trade/mine/my-positions?type=1"
                          : "/copy-trade/mine/my-taker?type=1"
                      }
                    >
                      My copy trading
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
                    <Image width={30} src={alltraderIcon} />
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
      {data && <Footer metadata={data} />}
    </>
  );
};

type FilterOption = {
  value: string;
  label: string;
};

export function OptionFilter(
  props: Partial<{
    label: string;
    value?: string;
    items: FilterOption[];
    icon: ReactNode;
    menuProps: MenuProps;
    menuTargetProps: MenuTargetProps;
    menuDropdownProps: MenuDropdownProps;
  }>,
) {
  const [values, setValues] = useState<string>(
    props.label ?? (props?.items?.[0].value as string),
  );
  return (
    <>
      <Menu
        position="bottom-start"
        shadow="md"
        width={200}
        withinPortal
        transitionProps={{ transition: "fade-down", duration: 150 }}
        {...props.menuProps}
      >
        <Menu.Target {...props.menuTargetProps}>
          <AppButton p={0} variant="transparent" color="dark">
            <Flex align={"center"} gap={5}>
              {values ?? props.label ?? "_menu"}
              {props.icon ? (
                props.icon
              ) : (
                <IconChevronDown size={18} color="gray" />
              )}
            </Flex>
          </AppButton>
        </Menu.Target>

        <Menu.Dropdown {...props.menuDropdownProps}>
          {props.items?.map((item, i) => (
            <Menu.Item
              key={i}
              onClick={() => setValues(item.value)}
              fw={"bold"}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

export function OptionFilterAsCheckbox(
  props: Partial<{
    label: string;
    items: FilterOption[];
    icon: ReactNode;
  }>,
) {
  const [values, setValues] = useState<{ [k in string]: boolean }>(
    {},
  );
  const [confirmed, setConfirm] = useState<boolean>(false);
  const setValue = useCallback(
    (val: string) => {
      const _values = { ...values };
      if (val in _values) {
        _values[val] = !_values[val];
      } else {
        _values[val] = true;
      }
      setValues((pr) => {
        return {
          ...pr,
          ..._values,
        };
      });
    },
    [values],
  );
  const checked = useMemo(() => {
    return Object.keys(values)
      .map((i) => Boolean(values[i]))
      .filter((i) => i === true);
  }, [values]);
  return (
    <>
      <Menu
        returnFocus
        closeOnItemClick={false}
        position="bottom-start"
        shadow="md"
        width={300}
        transitionProps={{ transition: "fade-down", duration: 150 }}
      >
        <Menu.Target>
          <Button color="dark" p={0} variant="transparent">
            <Flex align={"center"} gap={5}>
              {props.label ?? "_menu"}
              {confirmed && checked.length > 0 && (
                <Badge size="xs" color="primary.4">
                  {checked.length}
                </Badge>
              )}
              {props.icon ? (
                props.icon
              ) : (
                <IconChevronDown size={18} color="gray" />
              )}
            </Flex>
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{props.label ?? "label"}</Menu.Label>
          {props.items?.map((item, i) => (
            <Menu.Item key={i} style={{ position: "relative" }}>
              <Checkbox
                w={"100%"}
                h={"100%"}
                fw={"bold"}
                id={`md_${item.value}_mn`}
                defaultChecked
                iconColor="dark.8"
                size="sm"
                label={item.label}
                value={item.value}
                checked={values[item.value] === true}
                onChange={() => setValue(item.value)}
              />
              <label
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                }}
                htmlFor={`md_${item.value}_mn`}
              />
            </Menu.Item>
          ))}

          <Menu.Divider />
          <Menu.Item>
            <Grid>
              <Grid.Col span={6}>
                <AppButton
                  onClick={() => {
                    setConfirm(false);
                    setValues({});
                  }}
                  disabled={checked.length === 0}
                  variant="default"
                  w={"100%"}
                >
                  Reset
                </AppButton>
              </Grid.Col>
              <Grid.Col span={6}>
                <AppButton
                  onClick={() => setConfirm(true)}
                  w={"100%"}
                >
                  Confirm
                </AppButton>
              </Grid.Col>
            </Grid>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

function GridMasterTraders() {
  const _items = [...Array(10)];
  return (
    <>
      <Box className="table-grid" w={"100%"}>
        <div
          className="table-grid-row header-click"
          style={{ border: "solid 1px" }}
        >
          <Box className="table-grid-cell">
            <AppText instancetype="withTheadSmall">Nickname</AppText>
          </Box>
          <Box className="table-grid-cell">
            <Flex align={"center"} gap={5}>
              <AppText instancetype="withTheadSmall">
                {"7d Master's PnL"}
              </AppText>
              <IconSortUpDown />
            </Flex>
          </Box>
          <Box className="table-grid-cell">
            <Flex align={"center"} gap={5}>
              <AppText instancetype="withTheadSmall">7d ROI</AppText>
              <IconSortUpDown />
            </Flex>
          </Box>
          <Box className="table-grid-cell">
            <Flex align={"center"} gap={5}>
              <AppText instancetype="withTheadSmall">
                {"7d Followers' PnL"}
              </AppText>
              <IconSortUpDown />
            </Flex>
          </Box>
          <Box className="table-grid-cell">
            <Flex align={"center"} gap={5}>
              <AppText instancetype="withTheadSmall">
                7d Win Rate
              </AppText>
              <IconSortUpDown />
            </Flex>
          </Box>
          <Box className="table-grid-cell">
            <Flex align={"center"} gap={5}>
              <AppText instancetype="withTheadSmall">
                Stability Index
              </AppText>
              <IconSortUpDown />
            </Flex>
          </Box>
          <Box className="table-grid-cell">
            <Flex align={"center"} gap={5}>
              <AppText instancetype="withTheadSmall">
                Follower(s)
              </AppText>
              <IconSortUpDown />
            </Flex>
          </Box>
          <Box className="table-grid-cell">
            <AppText instancetype="withTheadSmall">Action</AppText>
          </Box>
        </div>
        {_items.map((_i, i) => (
          <div key={i} className="table-grid-row">
            <Box className="table-grid-cell">
              <Flex w={"100%"} gap={10}>
                <Avatar
                  size={48}
                  src={
                    "/images/6f03645d-a21a-40d1-97e2-90cbfef6ce98.jpg6"
                  }
                />
                <Box maw={280}>
                  <AppText instancetype="WithCellToken">
                    Pino89 {/* cspell:disable-line */}
                  </AppText>
                  <Flex gap={10}>
                    <AppPill instancetype="WithTagSmall">
                      Stable
                    </AppPill>
                    <AppPill instancetype="WithTagSmall">
                      Trading Bots
                    </AppPill>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Box className="table-grid-cell">
              <AppText instancetype="WidthPriceNormal">
                +3.92%
              </AppText>
            </Box>
            <Box className="table-grid-cell">
              <AppText instancetype="WidthPriceNormal">
                +43,160.26
              </AppText>
            </Box>
            <Box className="table-grid-cell">
              <AppText instancetype="WidthPriceNormal">
                +21,477.87
              </AppText>
            </Box>
            <Box className="table-grid-cell">
              <AppText instancetype="WidthPriceNormal">
                +66.97%
              </AppText>
            </Box>
            <Box className="table-grid-cell">
              <AppText instancetype="WidthPriceNormal">
                5.0/5.0
              </AppText>
            </Box>
            <Box className="table-grid-cell">
              <AppText instancetype="WidthPriceNormal">256</AppText>
            </Box>
            <Box className="table-grid-cell">
              <AppButton
                variant="gradient"
                fullWidth
                size="sm"
                c={"dark"}
                gradient={{ from: "primary", to: "yellow", deg: 90 }}
              >
                Copy
              </AppButton>
            </Box>
          </div>
        ))}
      </Box>
      <Space my={30} />
      <Flex justify={"center"} w={"100%"}>
        <Pagination total={10} />
      </Flex>
    </>
  );
}

export function IconSortUpDown({
  pos = 0,
  text,
}: Partial<{ pos: 1 | 2 | 0; text: string | React.ReactNode }>) {
  // "up" | "down" | "default"
  const [_status, setStatus] = useState<1 | 2 | 0>(pos);
  const onChangeStatus = useCallback(() => {
    switch (_status) {
      case 2:
        setStatus(0);
        break;
      case 1:
        setStatus(2);
        break;
      default:
        setStatus(1);
        break;
    }
  }, [_status]);

  return (
    <>
      <Flex
        align={"center"}
        gap={5}
        style={{ cursor: "pointer" }}
        onClick={onChangeStatus}
      >
        {text && text}
        <Box
          pos={"relative"}
          h={20}
          w={20}
          style={{ cursor: "pointer" }}
        >
          <Box
            style={{
              top: "calc(50% - 1px)",
              transform: "translateY(-50%)",
            }}
            pos={"absolute"}
          >
            <IconCaretUpFilled
              size={12}
              color={_status === 1 ? "#f29525" : "#81858c"}
            />
          </Box>
          <Box
            style={{
              top: "calc(50% + 4px)",
              transform: "translateY(-50%)",
            }}
            pos={"absolute"}
          >
            <IconCaretDownFilled
              size={12}
              color={_status === 2 ? "#f29525" : "#81858c"}
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
}
export function CardTraderTop1(
  props: Partial<{ avatar: string; userName: string; top: number }>,
) {
  const images = [
    "https://s1.bycsi.com/bybit/deadpool/704be805648811ed890b8e79ed0a92f0.png",
    "https://s1.bycsi.com/bybit/deadpool/84f87add648811ed890b8e79ed0a92f0.png",
    "https://s1.bycsi.com/bybit/deadpool/90f1e2cf648811ed890b8e79ed0a92f0.png",
    "https://s1.bycsi.com/bybit/deadpool/9c17a00e648811ed890b8e79ed0a92f0.png",
    "https://s1.bycsi.com/bybit/deadpool/9c17a00e648811ed890b8e79ed0a92f0.png",
  ];
  const colors = [
    "rgba(194,137,0,.3)",
    "#d2daea",
    "#e6c29d",
    "#d5dae0",
    "#d5dae0",
  ];

  return (
    <>
      <Card
        className={classes.card}
        radius={8}
        w={320}
        p={20}
        pos={"relative"}
        component="a"
        href={`/copy-trading/${uuidv4()}`}
      >
        {/* <Box component="a" href={`/copy-trading/${uuidv4()}`} pos={"absolute"} top={0} left={0}></Box> */}
        <Box pos={"absolute"} top={0} left={0} style={{ zIndex: 2 }}>
          <Image src={images[(props.top as number) - 1]} />
        </Box>
        <Box
          pos={"absolute"}
          top={36}
          left={19}
          style={{ zIndex: 1, border: "solid 1px red" }}
        >
          <Avatar size={80} src={props.avatar} />
        </Box>
        <Box
          pos={"absolute"}
          top={0}
          w={88}
          h={40}
          right={0}
          style={{
            borderRadius: "0 8px 0 24px",
            background: colors[(props.top as number) - 1],
            zIndex: 3,
          }}
        >
          <AppText
            fz={20}
            fw={600}
            lh={"40px"}
            c={"white"}
            style={{ textAlign: "center" }}
          >
            No.0 {props.top as number}
          </AppText>
        </Box>
        <Box pos={"relative"} style={{ zIndex: 3 }}>
          <Box style={{}} mt={24}>
            <Group>
              <Avatar
                opacity={0}
                size={80}
                src={
                  "/images/bybit/6b7252dd-fe34-4ce0-a5f0-837474103818.png"
                }
              />
              <Box>
                <Flex align={"center"} gap={5}>
                  <AppText fz={20} fw={"bolder"}>
                    {" "}
                    {props.userName}{" "}
                  </AppText>
                  <Image w={20} src={trade_icon} />
                </Flex>
                <Space my={5} />
                <Flex gap={10}>
                  <AppText instancetype="withTheadSmall" c={"dark"}>
                    85 Follower(s)
                  </AppText>
                  <Flex align={"center"}>
                    <IconCaretUpFilled color="#20b26c" size={16} />
                    <AppText instancetype="withTheadSmall" c={"dark"}>
                      400.00%
                    </AppText>
                  </Flex>
                </Flex>
              </Box>
            </Group>
          </Box>
          <Flex align={"center"} justify={"space-between"}>
            <Box>
              <Tooltip
                multiline
                w={220}
                withArrow
                c={"dark"}
                bg={"gray.4"}
                p={20}
                transitionProps={{ duration: 200 }}
                label="Expressed as a percentage and calculated by dividing an investment's net profit (or loss) by its initial cost. ROI is a performance measure used to evaluate the efficiency or profitability of an investment."
              >
                <AppButton
                  variant="transparent"
                  p={0}
                  m={0}
                  h={"auto"}
                >
                  <AppText instancetype="withTheadSmall">
                    ROI{" "}
                    <span
                      style={{
                        border: "solid 1px #adb1b8",
                        borderRadius: "4px",
                        zoom: "0.83",
                        padding: "0 4.2px",
                      }}
                    >
                      7d
                    </span>
                  </AppText>
                </AppButton>
              </Tooltip>
              <AppText instancetype="WithPriceCardTrader" c={"green"}>
                +422.55%
              </AppText>
            </Box>
            <AppChart
              instancetype="Areapercent" // cspell:disable-line
              chartSeries={[
                {
                  name: "series1",
                  data: [31, 40, 28, 51, 42, 109, 100],
                },
              ]}
            />
          </Flex>
          <Flex justify={"space-between"}>
            <Tooltip
              multiline
              w={220}
              withArrow
              c={"dark"}
              bg={"gray.4"}
              p={20}
              transitionProps={{ duration: 200 }}
              label="Expressed as a percentage and calculated by dividing an investment's net profit (or loss) by its initial cost. ROI is a performance measure used to evaluate the efficiency or profitability of an investment."
            >
              <AppButton variant="transparent" p={0} m={0} h={"auto"}>
                <AppText instancetype="withTheadSmall">
                  ROI{" "}
                  <span
                    style={{
                      border: "solid 1px #adb1b8",
                      borderRadius: "4px",
                      zoom: "0.83",
                      padding: "0 4.2px",
                    }}
                  >
                    90d
                  </span>
                </AppText>
              </AppButton>
            </Tooltip>
            <AppText instancetype="withPriceCardTrade">
              +20.99%
            </AppText>
          </Flex>
          <Flex justify={"space-between"}>
            <Tooltip
              multiline
              w={220}
              withArrow
              c={"dark"}
              bg={"gray.4"}
              p={20}
              transitionProps={{ duration: 200 }}
              label="The maximum observed loss for the Master Trader in the last 30 days. A low maximum drawdown indicates that the loss incurred by the Master Trader's trades is relatively small."
            >
              <AppButton variant="transparent" p={0} m={0} h={"auto"}>
                <AppText instancetype="withTheadSmall">
                  Drawdown{" "}
                  <span
                    style={{
                      border: "solid 1px #adb1b8",
                      borderRadius: "4px",
                      zoom: "0.83",
                      padding: "0 4.2px",
                    }}
                  >
                    30d
                  </span>
                </AppText>
              </AppButton>
            </Tooltip>
            <AppText instancetype="withPriceCardTrade" c={"green"}>
              21.29%
            </AppText>
          </Flex>
          <Flex justify={"space-between"}>
            <Tooltip
              multiline
              w={220}
              withArrow
              c={"dark"}
              bg={"gray.4"}
              p={20}
              transitionProps={{ duration: 200 }}
              label="Assets Under Management (AUM) is the total amount of investments from followers, managed by the Master Trader."
            >
              <AppButton variant="transparent" p={0} m={0} h={"auto"}>
                <AppText instancetype="withTheadSmall">AUM</AppText>
              </AppButton>
            </Tooltip>
            <AppText instancetype="withPriceCardTrade">
              25,478.00
            </AppText>
          </Flex>
          <Space h={20} />
          <AppButton
            variant="gradient"
            fullWidth
            gradient={{ from: "primary", to: "yellow", deg: 90 }}
          >
            Copy
          </AppButton>
        </Box>
      </Card>
    </>
  );
}

export function CardTrader() {
  return (
    <>
      <Card
        className={classes.card}
        styles={{
          root: {
            // width: "fix"
          },
        }}
        p={20}
        radius={8}
        component="a"
        href={`/copy-trading/${uuidv4()}`}
      >
        <Box>
          <Box>
            <Group>
              <Avatar
                size={60}
                src={
                  "/images/bybit/6b7252dd-fe34-4ce0-a5f0-837474103818.png"
                }
              />
              <Box>
                <Flex align={"center"} gap={5}>
                  <AppText fz={20} fw={"bolder"}>
                    {" "}
                    DreamyCoin
                  </AppText>
                  <Image w={20} src={trade_icon} />
                </Flex>
                <Space my={5} />
                <Flex gap={10}>
                  <AppText instancetype="withTheadSmall">
                    85 Follower(s)
                  </AppText>
                  <Flex align={"center"}>
                    <IconCaretUpFilled color="#20b26c" size={16} />
                    <AppText instancetype="withTheadSmall">
                      400.00%
                    </AppText>
                  </Flex>
                </Flex>
              </Box>
            </Group>
          </Box>
          <Flex align={"center"} justify={"space-between"}>
            <Box>
              <Tooltip
                multiline
                w={220}
                withArrow
                c={"dark"}
                bg={"gray.4"}
                p={20}
                transitionProps={{ duration: 200 }}
                label="Expressed as a percentage and calculated by dividing an investment's net profit (or loss) by its initial cost. ROI is a performance measure used to evaluate the efficiency or profitability of an investment."
              >
                <AppButton
                  variant="transparent"
                  p={0}
                  m={0}
                  h={"auto"}
                >
                  <AppText instancetype="withTheadSmall">
                    ROI{" "}
                    <span
                      style={{
                        border: "solid 1px #adb1b8",
                        borderRadius: "4px",
                        zoom: "0.83",
                        padding: "0 4.2px",
                      }}
                    >
                      7d
                    </span>
                  </AppText>
                </AppButton>
              </Tooltip>
              <AppText instancetype="WithPriceCardTrader" c={"green"}>
                +422.55%
              </AppText>
            </Box>
            <AppChart
              instancetype="Areapercent" // cspell:disable-line
              chartSeries={[
                {
                  name: "series1",
                  data: [31, 40, 28, 51, 42, 109, 100],
                },
              ]}
            />
          </Flex>
          <Flex justify={"space-between"}>
            <Tooltip
              multiline
              w={220}
              withArrow
              c={"dark"}
              bg={"gray.4"}
              p={20}
              transitionProps={{ duration: 200 }}
              label="Expressed as a percentage and calculated by dividing an investment's net profit (or loss) by its initial cost. ROI is a performance measure used to evaluate the efficiency or profitability of an investment."
            >
              <AppButton variant="transparent" p={0} m={0} h={"auto"}>
                <AppText instancetype="withTheadSmall">
                  ROI{" "}
                  <span
                    style={{
                      border: "solid 1px #adb1b8",
                      borderRadius: "4px",
                      zoom: "0.83",
                      padding: "0 4.2px",
                    }}
                  >
                    90d
                  </span>
                </AppText>
              </AppButton>
            </Tooltip>
            <AppText instancetype="withPriceCardTrade">
              +20.99%
            </AppText>
          </Flex>
          <Flex justify={"space-between"}>
            <Tooltip
              multiline
              w={220}
              withArrow
              c={"dark"}
              bg={"gray.4"}
              p={20}
              transitionProps={{ duration: 200 }}
              label="The maximum observed loss for the Master Trader in the last 30 days. A low maximum drawdown indicates that the loss incurred by the Master Trader's trades is relatively small."
            >
              <AppButton variant="transparent" p={0} m={0} h={"auto"}>
                <AppText instancetype="withTheadSmall">
                  Drawdown{" "}
                  <span
                    style={{
                      border: "solid 1px #adb1b8",
                      borderRadius: "4px",
                      zoom: "0.83",
                      padding: "0 4.2px",
                    }}
                  >
                    30d
                  </span>
                </AppText>
              </AppButton>
            </Tooltip>
            <AppText instancetype="withPriceCardTrade" c={"green"}>
              21.29%
            </AppText>
          </Flex>
          <Flex justify={"space-between"}>
            <Tooltip
              multiline
              w={220}
              withArrow
              c={"dark"}
              bg={"gray.4"}
              p={20}
              transitionProps={{ duration: 200 }}
              label="Assets Under Management (AUM) is the total amount of investments from followers, managed by the Master Trader."
            >
              <AppButton variant="transparent" p={0} m={0} h={"auto"}>
                <AppText instancetype="withTheadSmall">AUM</AppText>
              </AppButton>
            </Tooltip>
            <AppText instancetype="withPriceCardTrade">
              25,478.00
            </AppText>
          </Flex>
          <Space h={20} />
          <AppButton
            variant="gradient"
            fullWidth
            gradient={{ from: "primary", to: "yellow", deg: 90 }}
          >
            Copy
          </AppButton>
        </Box>
      </Card>
    </>
  );
}

export function CardTraderBonus() {
  return (
    <>
      <Card
        className={classes.card}
        styles={{
          root: {
            // width: "fix"
            overflow: "visible",
          },
        }}
        p={20}
        radius={8}
        pos={"relative"}
        component="a"
        href={`/copy-trading/${uuidv4()}`}
      >
        <Box pos={"absolute"} top={-12} right={0}>
          <Badge
            rightSection={<IconStarFilled size={15} />}
            size="lg"
            variant="gradient"
            gradient={{ from: "orange", to: "yellow", deg: 90 }}
          >
            +10% Bonus
          </Badge>
        </Box>
        <Box>
          <Box>
            <Group>
              <Avatar
                size={60}
                src={
                  "/images/bybit/6b7252dd-fe34-4ce0-a5f0-837474103818.png"
                }
              />
              <Box>
                <Flex align={"center"} gap={5}>
                  <AppText fz={20} fw={"bolder"}>
                    {" "}
                    DreamyCoin
                  </AppText>
                  <Image w={20} src={trade_icon} />
                </Flex>
                <Space my={5} />
                <Flex gap={10}>
                  <AppText instancetype="withTheadSmall">
                    85 Follower(s)
                  </AppText>
                  <Flex align={"center"}>
                    <IconCaretUpFilled color="#20b26c" size={16} />
                    <AppText instancetype="withTheadSmall">
                      400.00%
                    </AppText>
                  </Flex>
                </Flex>
              </Box>
            </Group>
          </Box>
          <Flex align={"center"} justify={"space-between"}>
            <Box>
              <Tooltip
                multiline
                w={220}
                withArrow
                c={"dark"}
                bg={"gray.4"}
                p={20}
                transitionProps={{ duration: 200 }}
                label="Expressed as a percentage and calculated by dividing an investment's net profit (or loss) by its initial cost. ROI is a performance measure used to evaluate the efficiency or profitability of an investment."
              >
                <AppButton
                  variant="transparent"
                  p={0}
                  m={0}
                  h={"auto"}
                >
                  <AppText instancetype="withTheadSmall">
                    ROI{" "}
                    <span
                      style={{
                        border: "solid 1px #adb1b8",
                        borderRadius: "4px",
                        zoom: "0.83",
                        padding: "0 4.2px",
                      }}
                    >
                      7d
                    </span>
                  </AppText>
                </AppButton>
              </Tooltip>
              <AppText instancetype="WithPriceCardTrader" c={"green"}>
                +422.55%
              </AppText>
            </Box>
            <AppChart
              instancetype="Areapercent" // cspell:disable-line
              chartSeries={[
                {
                  name: "series1",
                  data: [31, 40, 28, 51, 42, 109, 100],
                },
              ]}
            />
          </Flex>
          <Flex justify={"space-between"}>
            <Tooltip
              multiline
              w={220}
              withArrow
              c={"dark"}
              bg={"gray.4"}
              p={20}
              transitionProps={{ duration: 200 }}
              label="Expressed as a percentage and calculated by dividing an investment's net profit (or loss) by its initial cost. ROI is a performance measure used to evaluate the efficiency or profitability of an investment."
            >
              <AppButton variant="transparent" p={0} m={0} h={"auto"}>
                <AppText instancetype="withTheadSmall">
                  ROI{" "}
                  <span
                    style={{
                      border: "solid 1px #adb1b8",
                      borderRadius: "4px",
                      zoom: "0.83",
                      padding: "0 4.2px",
                    }}
                  >
                    90d
                  </span>
                </AppText>
              </AppButton>
            </Tooltip>
            <AppText instancetype="withPriceCardTrade">
              +20.99%
            </AppText>
          </Flex>
          <Flex justify={"space-between"}>
            <Tooltip
              multiline
              w={220}
              withArrow
              c={"dark"}
              bg={"gray.4"}
              p={20}
              transitionProps={{ duration: 200 }}
              label="The maximum observed loss for the Master Trader in the last 30 days. A low maximum drawdown indicates that the loss incurred by the Master Trader's trades is relatively small."
            >
              <AppButton variant="transparent" p={0} m={0} h={"auto"}>
                <AppText instancetype="withTheadSmall">
                  Drawdown{" "}
                  <span
                    style={{
                      border: "solid 1px #adb1b8",
                      borderRadius: "4px",
                      zoom: "0.83",
                      padding: "0 4.2px",
                    }}
                  >
                    30d
                  </span>
                </AppText>
              </AppButton>
            </Tooltip>
            <AppText instancetype="withPriceCardTrade" c={"green"}>
              21.29%
            </AppText>
          </Flex>
          <Flex justify={"space-between"}>
            <Tooltip
              multiline
              w={220}
              withArrow
              c={"dark"}
              bg={"gray.4"}
              p={20}
              transitionProps={{ duration: 200 }}
              label="Assets Under Management (AUM) is the total amount of investments from followers, managed by the Master Trader."
            >
              <AppButton variant="transparent" p={0} m={0} h={"auto"}>
                <AppText instancetype="withTheadSmall">AUM</AppText>
              </AppButton>
            </Tooltip>
            <AppText instancetype="withPriceCardTrade">
              25,478.00
            </AppText>
          </Flex>
          <Space h={20} />
          <AppButton
            variant="gradient"
            fullWidth
            gradient={{ from: "primary", to: "yellow", deg: 90 }}
          >
            Copy
          </AppButton>
        </Box>
      </Card>
    </>
  );
}

export default IndexPage;
