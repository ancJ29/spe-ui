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
    IconBrandTwitter
} from '@tabler/icons-react';
import classes from './index.module.scss';
import { useState } from 'react';
import cx from 'clsx';
import MarqueeList from '@/ui/Marquee/Marquee';

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
    const [isDark, toggle] = useState(false);
    const { setColorScheme, clearColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

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
                                <Menu.Dropdown bg={"black"} variant="transparent" style={{"border": "none", "borderRadius": 0}}>
                                    {linksTools}
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Group>

                    <Group visibleFrom="sm" h="100%">
                        <Group h="100%" gap={2}>
                            <Button variant="transparent" color="white">Log In</Button>
                            <Button color="primary">Sign up</Button>
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
                                <Menu.Dropdown bg={"black"} bd={"none"} style={{"border": "none"}}>
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
                        <Button variant="default">Log in</Button>
                        <Button>Sign up</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
            <Box className={classes.banner} py={40}>
                <Container size="lg">
                    <Center>
                        <Flex gap={"xl"}>
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
                                        <Button size='xl'>
                                            Sign Up
                                        </Button>
                                    </Grid.Col>
                                </Grid>
                            </Box>
                            <Box w={400} onWaiting={() => { }}>
                                <Image src={"https://static-prod.omtrade.com/w-static/_next/static/media/home-bg.c8f0c5a4.png"} />
                            </Box>
                        </Flex>
                    </Center>
                </Container>
            </Box>
            <Box h={52} className={classes.contentmarquee}>
                <Container h="100%" size="lg">
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
            <Box>
                <Container size="lg">

                </Container>
            </Box>
            <Box>
                <Container size="lg">
                    <Center h={"60vh"}>
                        TODO: UI IMPLEMENT
                    </Center>
                </Container>
            </Box>
            <Box py={40} className={classes.footer}>
                <Container size="lg">
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
                <Container size="lg">
                    <Group justify='center'>
                        <Text py={10} fz={"12px"}>
                            © 2018-2024 simple exchange All rights reserved.
                        </Text>
                    </Group>
                </Container>
            </Box>
        </>
    );
}
