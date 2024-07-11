import defaultAvatar from "@/assets/images/defaultAvatar.png";
import svgLogo from "@/assets/images/logo.svg";
import { Application } from "@/common/types";
import { getHeaderMenu } from "@/domain/Application";
import {
  ActionIcon,
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  CopyButton,
  Divider,
  Drawer,
  Flex,
  Group,
  HoverCard,
  Image,
  Menu,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  Tooltip,
  UnstyledButton,
  lighten,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowRight,
  IconCaretDownFilled,
  IconCheck,
  IconCoin,
  IconCopy,
  IconLogout,
  IconMoon,
  IconSun,
  IconWorld,
} from "@tabler/icons-react";
import cx from "clsx";
import { Fragment, useCallback, useMemo, useState } from "react";
import AppButton from "../Button/AppButton";
import Icon from "../Icon/Icon";
import classes from "./index.module.scss";

const debug = false;

export function Header(props: Partial<{ metadata: Application }>) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const theme = useMantineTheme();
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });

  const menu = useMemo(() => {
    return getHeaderMenu(props.metadata);
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
            <a href="/">
              <Image src={svgLogo} w={100} />
            </a>
            <Group h="100%" gap={0} visibleFrom="sm">
              {menu.map((item, idx) => {
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
                          <a
                            href={item.url || "/#"}
                            className={classes.link}
                          >
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
                          bg={"#16181e"}
                          variant="transparent"
                          style={{ border: "none", borderRadius: 0 }}
                        >
                          {(item.children || []).map((_item, i) => (
                            <UnstyledButton
                              className={classes.subLink}
                              key={i}
                              variant="transparent"
                              styles={{
                                root: {
                                  borderRadius: "3px",
                                },
                              }}
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
                                      "lorem ipsum"}
                                  </Text>
                                </div>
                              </Group>
                            </UnstyledButton>
                          ))}
                        </Menu.Dropdown>
                      </Menu>
                    )}
                    {item.type === "link" && (
                      <a
                        href={item.url || "/#"}
                        className={classes.link}
                      >
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
                          <a
                            href={item.url || "/#"}
                            className={classes.link}
                          >
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
                          bg={"#16181e"}
                        >
                          <Group justify="space-between">
                            <Text fw={500} c={"primary"}>
                              {item?.panelFooter?.title || ""}
                            </Text>
                            <Anchor href={item.url || "/#"} fz="xs">
                              View all
                            </Anchor>
                          </Group>

                          <Divider
                            my="sm"
                            color={lighten("white", 0.4)}
                          />
                          <SimpleGrid cols={2} spacing={0}>
                            {(item?.children || []).map(
                              (_item, i) => (
                                <UnstyledButton
                                  key={i}
                                  className={classes.subLink}
                                  variant="transparent"
                                  styles={{
                                    root: {
                                      borderRadius: "3px",
                                    },
                                  }}
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
                                        className={
                                          classes.subLinkTitle
                                        }
                                      >
                                        {_item?.label}
                                      </Text>
                                      <Text size="xs" c="dimmed">
                                        {/* cspell:disable */}
                                        lorem ipsum dolor sit amet
                                        consectetuer adipiscing elit
                                        {/* cspell:ensable */}
                                      </Text>
                                    </div>
                                  </Group>
                                </UnstyledButton>
                              ),
                            )}
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
                                  {item.panelFooter?.description ||
                                    ""}
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
              <MenuUserInfo />
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
                  bg={"#16181e"}
                  bd={"none"}
                  style={{ border: "none" }}
                >
                  <Menu.Item
                    c={"white"}
                    className={classes.menuLanguage}
                  >
                    English
                  </Menu.Item>
                  <Menu.Item
                    c={"white"}
                    className={classes.menuLanguage}
                  >
                    日本語
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              {!debug && (
                <ActionIcon
                  onClick={() =>
                    setColorScheme(
                      computedColorScheme === "light"
                        ? "dark"
                        : "light",
                    )
                  }
                  size="xl"
                  variant="transparent"
                  aria-label="Toggle color scheme"
                >
                  {colorScheme === "light" && (
                    <IconSun
                      color={lighten(theme.colors.dark[7], 1)}
                    />
                  )}
                  {colorScheme === "dark" && (
                    <IconMoon
                      color={lighten(theme.colors.dark[7], 1)}
                    />
                  )}
                </ActionIcon>
              )}
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
          {menu.map((item, idx) => {
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
                      {(item.children || []).map((_item, i) => (
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
                    href={item.url || "/#"}
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
                      {(item.children || []).map((_item, i) => (
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
                <Menu.Item
                  c={"white"}
                  className={classes.menuLanguage}
                >
                  English
                </Menu.Item>
                <Menu.Item
                  c={"white"}
                  className={classes.menuLanguage}
                >
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

function MenuUserInfo() {
  const logOut = useCallback(() => {
    delete localStorage.__TOKEN__;
    delete sessionStorage.__TOKEN__;
    window.open("/", "_self");
  }, []);

  if (!localStorage.__TOKEN__) {
    return (
      <>
        <GroupLinkAuth />
      </>
    );
  }
  return (
    <>
      <Menu
        shadow="md"
        width={320}
        trigger="hover"
        offset={0}
        closeDelay={100}
      >
        <Menu.Target>
          <ActionIcon variant="transparent" size="xl">
            <Image src={defaultAvatar} w={28} h={28} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown
          styles={{
            dropdown: {
              height: "calc(100vh - 48px)",
              background: "light-dark(#fff, #16181e)",
              display: "flex",
              flexDirection: "column",
              border: "none",
            },
          }}
        >
          <Menu.Item>
            <Flex gap={10}>
              <Box>
                <ActionIcon variant="transparent" size="xl">
                  <Image src={defaultAvatar} w={38} h={38} />
                </ActionIcon>
              </Box>
              <Box>
                <Text fz={14}>duc***@****</Text>
                <Flex align={"center"} gap={0}>
                  <Text fz={12} c={"gray.5"}>
                    UID: 194260796
                  </Text>
                  <CopyButton value="UID: 194260796">
                    {({ copied, copy }) => (
                      <Tooltip
                        label={copied ? "Copied" : "Copy"}
                        withArrow
                        position="right"
                      >
                        <ActionIcon
                          color={copied ? "teal" : "gray"}
                          variant="subtle"
                          onClick={copy}
                        >
                          {copied ? (
                            <IconCheck style={{ width: rem(16) }} />
                          ) : (
                            <IconCopy
                              color="orange"
                              style={{ width: rem(16) }}
                            />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Flex>
              </Box>
            </Flex>
          </Menu.Item>
          <Menu.Item
            c={"orange"}
            fw={"bold"}
            rightSection={
              <IconArrowRight
                color="gray"
                style={{ width: rem(16) }}
              />
            }
          >
            Switch/Create Account
          </Menu.Item>
          {/* <Menu.Item c={"orange"} fw={"bold"}
            rightSection={
              <Text size="xs" c="dimmed">
                ⌘K
              </Text>
            }
          >
            Switch/Create Account
          </Menu.Item> */}
          <Menu.Divider />
          <Menu.Item fw={"bold"}>
            Settings
          </Menu.Item>

          <Menu.Item
            fw={"bold"}
            component="a"
            href="/wallet"
          >
            Assets
          </Menu.Item>
          <Menu.Item
            fw={"bold"}
            component="a"
            href="/user/assets/deposit"
          >
            Deposit
          </Menu.Item>
          <Box
            style={{
              marginTop: "auto",
            }}
          >
            <Menu.Divider />
            <Menu.Item
              onClick={logOut}
              color="red"
              leftSection={
                <IconLogout
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
            >
              Logout
            </Menu.Item>
          </Box>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

function GroupLinkAuth() {
  return (
    <>
      <AppButton
        instancetype="Ghost"
        color="white"
        component="a"
        href="/login"
      >
        Log In
      </AppButton>
      <AppButton component="a" href="/register">
        Sign up
      </AppButton>
    </>
  );
}
