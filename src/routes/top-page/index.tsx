import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
    useMantineColorScheme,
    ActionIcon,
    useComputedColorScheme,
    Menu,
    lighten,
    darken,
    Container,
    Title,
    Image,
    Flex,
    Grid,
    Input,
    Avatar,
    Tabs,
    Table,
    Card,
    Badge,
    Space,
    rgba,
    alpha,
    Indicator,
    Timeline,
    NumberFormatter,
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useColorScheme, useDisclosure, useToggle } from '@mantine/hooks';
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconWorld,
    IconBrightness,
    IconMoon,
    IconSun,
    IconTrash,
    IconArrowsLeftRight,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconSettings,
    IconCaretDown,
    IconCaretDownFilled,
    IconBrandTelegram,
    IconBrandYoutube,
    IconBrandFacebook,
    IconBrandTwitter,
    IconBabyCarriageFilled,
    IconArrowAutofitLeft,
    IconArrowRight,
    IconGitBranch,
    IconGitCommit,
    IconGitPullRequest,
    IconMessageDots
} from '@tabler/icons-react';
import classes from './index.module.scss';
import { useRef, useState } from 'react';
import cx from 'clsx';
import MarqueeList from '@/ui/Marquee/Marquee';
import Icon from '@/ui/Icon/Icon';
import CarouselPage from '@/ui/Carousel/Carousel';
import AppButton from '@/ui/Button/AppButton';
import AppPill from '@/ui/Pill/AppPill';
import AppTable, { generateItems } from '@/ui/Table/AppTable';
import AppText from '@/ui/Text/AppText';
import AppChart from '@/ui/Chart/Chart';

const mockdata = [
    {
        icon: IconCode,
        title: 'Open source',
        description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconCoin,
        title: 'Free for everyone',
        description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
        icon: IconBook,
        title: 'Documentation',
        description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
        icon: IconFingerprint,
        title: 'Security',
        description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
        icon: IconChartPie3,
        title: 'Analytics',
        description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
        icon: IconNotification,
        title: 'Notifications',
        description: 'Combusken battles with the intensely hot flames it spews',
    },
];

export default function TopPage() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
    const { setColorScheme, clearColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    const [mainTokens, setMainTokens] = useState(generateItems())
    const [gainersTokens] = useState(generateItems())
    const [newListingsTokens] = useState(generateItems())
    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title} variant="transparent">
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="transparent" radius="md">
                    <item.icon style={{ width: rem(22), height: rem(22) }} color={"white"} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500} className={classes.subLinkTitle}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    const linksTools = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title} variant="transparent">
            <Group wrap="nowrap" align="flex-start">
                {/* <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
                </ThemeIcon> */}
                <div>
                    <Text size="sm" fw={500} className={classes.subLinkTitle}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <Group h="100%">
                        {/* <MantineLogo size={30} /> */}
                        <Avatar color="primary" radius="xl">SE</Avatar>
                        {/* <Title order={6} c="white">Simple Exchange</Title> */}
                        <Group h="100%" gap={0} visibleFrom="sm">
                            <a href="#" className={classes.link}>
                                Perpetual Contracts
                            </a>
                            <a href="#" className={classes.link}>
                                Copy Trading
                            </a>
                            <HoverCard width={600} position="bottom-start" radius="md" shadow="md" withinPortal offset={0}>
                                <HoverCard.Target>
                                    <a href="#" className={classes.link}>
                                        <Center inline>
                                            <Box component="span" mr={5}>
                                                Features
                                            </Box>
                                            <IconCaretDownFilled style={{ width: rem(16), height: rem(16) }} color={lighten(theme.colors.dark[7], 1)} className={cx(classes.icon, classes.translate)} />
                                            {/* <IconChevronDown style={{ width: rem(16), height: rem(16) }} color={lighten(theme.colors.dark[7], 1)} className={cx(classes.icon, classes.light)} />
                                                <IconChevronDown style={{ width: rem(16), height: rem(16) }} color={darken(theme.colors.dark[7], 1)} className={cx(classes.icon, classes.dark)} /> */}
                                        </Center>
                                    </a>
                                </HoverCard.Target>

                                <HoverCard.Dropdown style={{ overflow: 'hidden', "border": "none", "borderRadius": 0 }} bg={"black"}>
                                    <Group justify="space-between" px="md">
                                        <Text fw={500} c={"primary"}>Features</Text>
                                        <Anchor href="#" fz="xs">
                                            View all
                                        </Anchor>
                                    </Group>

                                    <Divider my="sm" color={lighten("white", 0.4)} />

                                    <SimpleGrid cols={2} spacing={0}>
                                        {links}
                                    </SimpleGrid>
                                    <Divider my="sm" color={lighten("white", 0.4)} />
                                    <div className={classes.dropdownFooter}>
                                        <Group justify="space-between">
                                            <div>
                                                <Text fw={500} fz="sm" c={"white"}>
                                                    Get started
                                                </Text>
                                                <Text size="xs" c="dimmed">
                                                    Their food sources have decreased, and their numbers
                                                </Text>
                                            </div>
                                            <Button variant="default">Get started</Button>
                                        </Group>
                                    </div>
                                </HoverCard.Dropdown>
                            </HoverCard>
                            <a href="#" className={classes.link}>
                                About OM
                            </a>
                            <Menu variant='transparent' position="bottom-start" shadow="md" width={300} trigger='hover' offset={0}>
                                <Menu.Target>
                                    <a href="#" className={classes.link}>
                                        <Center inline>
                                            <Box component="span" mr={5}>
                                                Tools
                                            </Box>
                                            <IconCaretDownFilled style={{ width: rem(16), height: rem(16) }} color={lighten(theme.colors.dark[7], 1)} className={cx(classes.icon, classes.translate)} />
                                            {/* <IconChevronDown style={{ width: rem(16), height: rem(16) }} color={lighten(theme.colors.dark[7], 1)} className={cx(classes.icon, classes.light)} />
                                                <IconChevronDown style={{ width: rem(16), height: rem(16) }} color={darken(theme.colors.dark[7], 1)} className={cx(classes.icon, classes.dark)} /> */}
                                        </Center>
                                    </a>
                                </Menu.Target>
                                <Menu.Dropdown bg={"black"} variant="transparent" style={{ "border": "none", "borderRadius": 0 }}>
                                    {linksTools}
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Group>

                    <Group visibleFrom="sm" h="100%">
                        <Group h="100%" gap={2}>
                            <AppButton instanceType="Ghost" color="white">Log In</AppButton>
                            <AppButton>Sign up</AppButton>
                        </Group>
                        <Group h="100%" gap={0}>
                            <Menu shadow="none" width={150} trigger='hover' radius={0} offset={0}>
                                <Menu.Target>
                                    <ActionIcon
                                        variant="transparent"
                                        size="xl" h={"100%"}>
                                        <IconWorld color={lighten(theme.colors.dark[7], 1)} />
                                        {/* <IconWorld color={lighten(theme.colors.dark[7], 1)} className={cx(classes.icon, classes.light)} />
                                            <IconWorld color={darken(theme.colors.dark[7], 1)} className={cx(classes.icon, classes.dark)} /> */}
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown bg={"black"} bd={"none"} style={{ "border": "none" }}>
                                    <Menu.Item c={"white"} className={classes.menulan}>
                                        English
                                    </Menu.Item>
                                    <Menu.Item c={"white"} className={classes.menulan}>
                                        日本語
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                            <ActionIcon
                                onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                                variant="transparent"
                                size="xl"
                                aria-label="Toggle color scheme"
                            >
                                <IconSun color={lighten(theme.colors.dark[7], 1)} />
                                {/* <IconSun color={lighten(theme.colors.dark[7], 1)} className={cx(classes.icon, classes.light)} />
                                    <IconMoon color={darken(theme.colors.dark[7], 1)} className={cx(classes.icon, classes.dark)} /> */}
                            </ActionIcon>
                        </Group>
                    </Group>

                    <Burger color='white' opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
                style={{ background: "black" }}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />

                    <a href="#" className={classes.link}>
                        Home
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                Features
                            </Box>
                            <IconChevronDown
                                style={{ width: rem(16), height: rem(16) }}
                                color={theme.colors.blue[6]}
                            />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="#" className={classes.link}>
                        Learn
                    </a>
                    <a href="#" className={classes.link}>
                        Academy
                    </a>

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        <AppButton variant="default">Log in</AppButton>
                        <AppButton>Sign up</AppButton>
                    </Group>
                </ScrollArea>
            </Drawer>
            <Box className={classes.banner} py={40}>
                <Container size="xl">
                    <Flex gap={"xl"} align={"center"}>
                        <Box>
                            <Title pb={10} className={classes.textLight}>Invest Like The Best.</Title>
                            <Title pb={10} className={classes.textPrimary}>
                                Vie for triumph and win up to 25,000 USDT!
                            </Title>
                            <Text pb={10} size="lg" c="white">
                                Trade crypto and win big, just like a pro.Simple. Smart. Secure.
                            </Text>
                            <Grid>
                                <Grid.Col span={6}>
                                    <Input size='xl' variant='default' placeholder='Email or Phone Number' />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <AppButton size='xl'>
                                        Sign Up
                                    </AppButton>
                                </Grid.Col>
                            </Grid>
                        </Box>
                        <Box w={400} onWaiting={() => { }} mx={"auto"}>
                            <Image mx={"auto"} src={"https://static-prod.omtrade.com/w-static/_next/static/media/home-bg.c8f0c5a4.png"} />
                        </Box>
                    </Flex>
                </Container>
            </Box>
            <Box h={52} className={classes.contentmarquee}>
                <Container h="100%" size="xl">
                    <Group align="center" h="100%">
                        <MarqueeList>
                            <Text fw={700} px={10} c="black">
                                Crypto Cup 2024 Pre-Game: Train & Win 50,000 USDT in Football Rewards!
                            </Text>
                            <Text fw={700} px={10} c="black">
                                Crypto Cup 2024 Pre-Game: Train & Win 50,000 USDT in Football Rewards!
                            </Text>
                            <Text fw={700} px={10} c="black">
                                Crypto Cup 2024 Pre-Game: Train & Win 50,000 USDT in Football Rewards!
                            </Text>
                        </MarqueeList>
                    </Group>
                </Container>
            </Box>
            <Space h={50} />

            <Container size="xl">
                <Box>
                    <CarouselPage />
                </Box>
                <Space h={50} />
                <Box style={{ "overflow": "hidden" }}>
                    <Title order={2}>Catch Your Next Trading Opportunity</Title>
                    <Space h={"md"} />
                    <Grid>
                        <Grid.Col span={8}>
                            <Tabs defaultValue="first" bd={1} onChange={(v) => {
                                console.log("CHANGE_TAB", v)
                                setMainTokens(generateItems())
                            }}>
                                <Tabs.List bd={1}>
                                    <Tabs.Tab value="first">
                                        <AppText instanceType="TabTitle">Favorites</AppText>
                                    </Tabs.Tab>
                                    <Tabs.Tab value="second">
                                        <AppText instanceType="TabTitle">Hot Derivatives</AppText>
                                    </Tabs.Tab>
                                    <Tabs.Tab value="third">
                                        <AppText instanceType="TabTitle">Hot Coins</AppText>
                                    </Tabs.Tab>
                                </Tabs.List>
                            </Tabs>
                            <TableBar items={mainTokens}/>
                            <Space h={50} />
                            <AppButton instanceType="WithRightIcon" size="lg">
                                Deposit or Buy Crypto
                            </AppButton>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Box>
                                <Title order={3}>
                                    Top Gainers
                                </Title>
                                <Space h={18} />
                                <Divider size={1} />
                                <Space h={10} />
                                <TableBarTopGainers items={gainersTokens} />
                            </Box>
                            <Space h={50} />
                            <Box>
                                <Title order={3}>
                                    New Listings
                                </Title>
                                <Space h={18} />
                                <Divider size={1} />
                                <Space h={10} />
                                <TableBarNewListing items={newListingsTokens} />
                            </Box>
                        </Grid.Col>
                    </Grid>
                    <TrendingTraders />
                    <Cards />
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
            <footer>
                <Box py={40} className={classes.footer}>
                    <Container size="xl">
                        <Grid>
                            <Grid.Col span={3}>
                                <Group gap={10}>
                                    <Avatar variant='filled' color="primary" radius="xl" size={30}>SE</Avatar>
                                    <Title order={4}>Simple Exchange</Title>
                                </Group>
                                <Flex gap={10} mt={30}>
                                    <a href="#">
                                        <Avatar color="primary" radius="sm">
                                            <IconBrandTelegram />
                                        </Avatar>
                                    </a>
                                    <a href="#">
                                        <Avatar color="primary" radius="sm">
                                            <IconBrandYoutube />
                                        </Avatar>
                                    </a>
                                    <a href="#">
                                        <Avatar color="primary" radius="sm">
                                            <IconBrandFacebook />
                                        </Avatar>
                                    </a>
                                    <a href="#">
                                        <Avatar color="primary" radius="sm">
                                            <IconBrandTwitter />
                                        </Avatar>
                                    </a>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={9}>
                                <Grid>
                                    <Grid.Col offset={3} span={3}>
                                        <Title order={4} mb={14} c="primary">About</Title>
                                        <Group >
                                            <a className={classes.foolink}>
                                                <Text size='sm'>About Echange</Text>
                                            </a>
                                            <a className={classes.foolink}>
                                                <Text size='sm'>Press Room</Text>
                                            </a>
                                            <a className={classes.foolink}>
                                                <Text size='sm'>Communities</Text>
                                            </a>
                                            <a className={classes.foolink}>
                                                <Text size='sm'>Announcements</Text>
                                            </a>
                                        </Group>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Title order={4} mb={14} c="primary">Support</Title>
                                        <Group>
                                            <a className={classes.foolink}>
                                                <Text size='sm'>One-Click Buy</Text>
                                            </a>
                                            <a className={classes.foolink}>
                                                <Text size='sm'>P2P Trading (0 Fees)</Text>
                                            </a>
                                            <a className={classes.foolink}>
                                                <Text size='sm'>Referral Program</Text>
                                            </a>
                                            <a className={classes.foolink}>
                                                <Text size='sm'>Listing Application</Text>
                                            </a>
                                        </Group>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Title order={4} mb={14} c="primary">Services</Title>
                                        <Group >
                                            <a className={classes.foolink}>
                                                <Text size='sm'>Submit a Request</Text>
                                            </a>
                                            <a className={classes.foolink}>
                                                <Text size='sm'>User Feedback</Text>
                                            </a>
                                            <a className={classes.foolink}>
                                                <Text size='sm'>Authenticity Check</Text>
                                            </a>
                                            <a className={classes.foolink}>
                                                <Text size='sm'>P2P FAQ</Text>
                                            </a>
                                        </Group>
                                    </Grid.Col>
                                </Grid>
                            </Grid.Col>

                        </Grid>
                    </Container>
                </Box>
                <Box>
                    <Container size="xl">
                        <Group justify='center'>
                            <Text py={10} fz={"12px"}>
                                © 2018-2024 simple exchange All rights reserved.
                            </Text>
                        </Group>
                    </Container>
                </Box>
            </footer>
        </>
    );
}


function TableBar(props: {items: any[]}) {
    const fields = [
        {
            name: "token",
            text: "Trading Pairs"
        },
        {
            name: "price",
            text: "Last Traded Price"
        },
        {
            name: "change",
            text: "24H Change"
        },
        {
            name: "Charts",
            text: "Charts"
        },
        {
            name: "Trade",
            text: "Trade"
        },
    ]

    return (
        <AppTable fields={fields} items={props.items} fieldTemplate={renderCell} />
    )
}

function renderCell(field: any, element: any) {
    if (field.name == "token") {
        return (
            <Group align="center" gap={"sm"}>
                <Avatar size={28} src={element.icon}></Avatar>
                <AppText instanceType="WithCellToken">
                    {element.token}
                </AppText>
            </Group>
        )
    }
    if (field.name == "price") {
        return (
            <AppText instanceType="WithCellToken">{element.lastPrice}</AppText>
        )
    }
    if (field.name == "change") {
        return (
            <AppText instanceType="WithCellToken" c={element.change > 0 ? "green" : "red"}>
                {element.change > 0 ? '+' : ''}<NumberFormatter value={element.change} decimalScale={2} />%
            </AppText>
        )
    }
    if (field.name == "Charts") {
        return <AppChart />
    }
    if (field.name == "Trade") {
        return <AppButton instanceType="WithOutlinedColor">Trade</AppButton>
    }
}

function TableBarTopGainers(props: {items: any[]}) {
    const fields = [
        {
            name: "token",
            text: "Trading Pairs"
        },
        {
            name: "price",
            text: "Last Traded Price"
        },
        {
            name: "change",
            text: "24H Change"
        },

    ]
    return (
        <AppTable fields={fields} items={props.items} fieldTemplate={renderCell} hideHeader />
    )
}
function TableBarNewListing(props: {items: any[]}) {
    const fields = [
        {
            name: "token",
            text: "Trading Pairs"
        },
        {
            name: "price",
            text: "Last Traded Price"
        },
        {
            name: "change",
            text: "24H Change"
        },

    ]
    return (
        <AppTable fields={fields} items={props.items} fieldTemplate={renderCell} hideHeader />
    )
}


function TrendingTraders() {
    const items = [...Array(20)]
    return (
        <div>
            <Title order={2}>
                Trending traders
            </Title>
            <Title order={5}>
                Find your favorite master. Invest along the best. It's simple - when they profit, you do too.
            </Title>
            <Space h={"xl"} />
            <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 10 }}>
                <Grid.Col span={3}>
                    <Card padding="lg" radius="md" bg={alpha("gray", 0.03)} h={"100%"}>
                        <Center h={"100%"}>
                            <Box>
                                <Title order={3}>Copy Trading</Title>
                                <Title order={5} c={"gray"} fw={"normal"}>Let top traders work for you</Title>
                                <Space h={"md"} />
                                <Flex justify={"space-between"}>
                                    <Box>
                                        <Title order={3}>106K+</Title>
                                        <Title order={5} c={"gray"} fw={"normal"}>Master Traders</Title>
                                    </Box>
                                    <Box>
                                        <Title order={3}>832K+</Title>
                                        <Title order={5} c={"gray"} fw={"normal"}>Followers</Title>
                                    </Box>
                                </Flex>
                                <Space h={"xl"} />
                                <AppButton instanceType='WithRightIcon' size='md'>
                                    View All Masters
                                </AppButton>

                            </Box>
                        </Center>
                    </Card>
                </Grid.Col>
                <Grid.Col span={9}>
                    <MarqueeList speed={100}>
                        {
                            items.map((_, _k) => (
                                <Card key={_k} padding="lg" radius="md" mx={"md"} bg={alpha("gray", 0.03)}>
                                    <Flex gap={"md"} align={"center"}>
                                        <Box>
                                            <Avatar size={44} src={"https://www.bybit.com/bycsi-root/fop/copytrade/d4b50bbb-a63f-4675-808a-5b60ae5cdf22.jpg?quality=50&format=avif&resize=width/44"} />
                                        </Box>
                                        <Box>
                                            <Title order={5}>
                                                GlimmerGrace
                                            </Title>
                                            <Text c={"gray"}>
                                                24 Followers
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Space h={"md"} />
                                    <Box>
                                        <Box>
                                            <Title order={6} fw={"normal"} c={"gray"}>7D ROI</Title>
                                            <Title order={4} fw={"bold"}>394.80%</Title>
                                        </Box>
                                        <Space h={"sm"} />
                                        <Box>
                                            <Title order={6} fw={"normal"} c={"gray"}>7D followers' Pnl</Title>
                                            <Title order={4} fw={"bold"}>1,9444.23</Title>
                                        </Box>
                                    </Box>
                                    <Space h={"md"} />
                                    <AppButton instanceType='GhostWithRightIcon' size='lg'>
                                        Copy
                                    </AppButton>
                                    <AppPill />
                                </Card>
                            ))
                        }
                    </MarqueeList>
                </Grid.Col>
            </Grid>


        </div>
    )
}

function QuickStart() {
    return (
        <>
            <Grid>
                <Grid.Col span={6}>
                    <Center h={"100%"}>
                        <Box>
                            <Title order={1}>Get Started in Minutes</Title>
                            <Space h={30} />
                            <Group justify='center'>
                                <AppButton size="xl" loaderProps={{ type: "bars" }} instanceType="WithRightIcon">Start Now</AppButton>
                            </Group>
                        </Box>
                    </Center>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Timeline bulletSize={40} active={3}>
                        <Timeline.Item bullet={<Title order={3}>1</Title>} title={
                            <Title order={3} lineClamp={10}>Create a free OMTrade Account. </Title>
                        }>
                            <Text>Create a free OMTrade Account.</Text>
                        </Timeline.Item>

                        <Timeline.Item bullet={<Title order={3}>2</Title>} title={
                            <Title order={3} lineClamp={10}>Find master traders that best serve your financial goals.</Title>
                        }>
                            <Text>Create a free OMTrade Account.</Text>
                        </Timeline.Item>
                        <Timeline.Item bullet={<Title order={3}>3</Title>} title={
                            <Title order={3} lineClamp={10}>Start copy trading and watch your portfolio grow!</Title>
                        }>
                            <Text>Create a free OMTrade Account.</Text>
                        </Timeline.Item>
                    </Timeline>
                </Grid.Col>
            </Grid>


        </>
    )
}

function PartnerSection() {
    const items = [
        "https://www.omtrade.com/_next/image?url=https%3A%2F%2Fstatic-prod.omtrade.com%2Fw-static%2F_next%2Fstatic%2Fmedia%2FIncuba.ad4be468.png&w=256&q=100",
        "https://www.omtrade.com/_next/image?url=https%3A%2F%2Fstatic-prod.omtrade.com%2Fw-static%2F_next%2Fstatic%2Fmedia%2FMeteorite.82d8b227.png&w=384&q=100",
        "https://www.omtrade.com/_next/image?url=https%3A%2F%2Fstatic-prod.omtrade.com%2Fw-static%2F_next%2Fstatic%2Fmedia%2FKSK.9a4c96b2.png&w=384&q=100",
        "https://www.omtrade.com/_next/image?url=https%3A%2F%2Fstatic-prod.omtrade.com%2Fw-static%2F_next%2Fstatic%2Fmedia%2FBloomberg-black.c7228817.png&w=384&q=100",
        "https://www.omtrade.com/_next/image?url=https%3A%2F%2Fstatic-prod.omtrade.com%2Fw-static%2F_next%2Fstatic%2Fmedia%2FVector.5f71abbb.png&w=256&q=100",
        "https://www.omtrade.com/_next/image?url=https%3A%2F%2Fstatic-prod.omtrade.com%2Fw-static%2F_next%2Fstatic%2Fmedia%2FLayer-black.058d4ea8.png&w=384&q=100"
    ]
    return (
        <>
            <Box style={{ "overflow": "hidden" }} w={"100%"}>
                <MarqueeList speed={90} loop={1000} pauseOnHover={false}>
                    {items.map((img, _k) => (
                        <Box opacity={0.4} mx={"xl"} key={_k}>
                            <Image src={img} />
                        </Box>
                    ))}
                </MarqueeList>
            </Box>
        </>
    )
}

function Cards() {
    return (
        <>
            <Grid>
                <Grid.Col span={12}>

                </Grid.Col>
            </Grid>
        </>
    )
}
