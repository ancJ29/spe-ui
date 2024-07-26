import defaultAvatar from "@/assets/images/defaultAvatar.png";
import svgLogo from "@/assets/images/logo.svg";
import { Application } from "@/common/types";
import { getHeaderMenu } from "@/domain/Application";
import { MODAL_STYLES } from "@/domain/config";
import useSPETranslation from "@/hooks/useSPETranslation";
import { default as authStore } from "@/store/auth";
import {
  ActionIcon,
  Anchor,
  Avatar,
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
  lighten,
  Menu,
  rem,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  Tooltip,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import {
  IconCaretDownFilled,
  IconCheck,
  IconCoin,
  IconCopy,
  IconLogout,
  IconSun,
} from "@tabler/icons-react";
import cx from "clsx";
import { Fragment, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppButton from "../Button/AppButton";
import { SwitchDarkLightMode } from "../SwitchDarkLight";
import SwitchLanguage from "../SwitchLanguage/SwitchLanguage";
import { DepositForm } from "../Wallet";
import classes from "./index.module.scss";

export function Header(props: Partial<{ metadata: Application }>) {
  const t = useSPETranslation();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const theme = useMantineTheme();
  const { setColorScheme } = useMantineColorScheme();
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
            <Box component={Link} to={"/"}>
              <Image src={svgLogo} w={100} />
            </Box>
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
                          <Box
                            component={Link}
                            to={item.url || "/#"}
                            className={classes.link}
                          >
                            <Center inline>
                              <Box component="span" mr={5}>
                                {t(item.label)}
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
                          </Box>
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
                      <Box
                        component={Link}
                        to={item.url || "/#"}
                        className={classes.link}
                      >
                        {t(item.label)}
                      </Box>
                    )}
                    {item.type === "panel" && (
                      <HoverCard
                        width={600}
                        openDelay={200}
                        position="bottom-start"
                        radius="md"
                        shadow="md"
                        withinPortal
                        offset={0}
                      >
                        <HoverCard.Target>
                          <Box
                            component={Link}
                            to={item.url || "/#"}
                            className={classes.link}
                          >
                            <Center inline>
                              <Box component="span" mr={5}>
                                {t(item.label)}
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
                          </Box>
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
                                      <IconCoin
                                        color="white"
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
              <SwitchLanguage />
              <SwitchDarkLightMode />
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
                          {t(item.label)}
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
                  <Box
                    component={Link}
                    to={item.url || "/#"}
                    className={cx(classes.link, classes.colorDefault)}
                  >
                    {t(item.label)}
                  </Box>
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
                          {t(item.label)}
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
            <AppButton>{t("Sign up")}</AppButton>
          </Group>
          <Group h="100%" gap={0}>
            <SwitchLanguage />
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
  const { avatar, me, displayName } = authStore();
  const t = useSPETranslation();

  if (!me?.id) {
    return <GroupLinkAuth />;
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
            <Avatar size={28} src={avatar || defaultAvatar} />
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
                  <Avatar
                    src={avatar || defaultAvatar}
                    w={38}
                    h={38}
                  />
                </ActionIcon>
              </Box>
              <Box>
                <Text fz={14}>{displayName || ""}</Text>
                <Flex align={"center"} gap={0}>
                  <Text fz={12} c={"gray.5"}>
                    UID: {me.depositCode || ""}
                  </Text>
                  <CopyButton value={`UID: ${me.uid || ""}`}>
                    {({ copied, copy }) => (
                      <Tooltip
                        label={t(copied ? "Copied" : "Copy")}
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
          {/* <Menu.Item
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
          </Menu.Item> */}
          <Menu.Divider />

          <Menu.Item fw={"bold"} component="a" href="/user">
            Settings
          </Menu.Item>
          <Menu.Item fw={"bold"} component="a" href="/wallet">
            {t("Assets")}
          </Menu.Item>
          <Menu.Item
            fw={"bold"}
            onClick={() => {
              modals.open({
                ...MODAL_STYLES,
                styles: {
                  ...MODAL_STYLES.styles,
                  content: {
                    background: "none",
                    boxShadow: "none",
                  },
                },
                withCloseButton: false,
                shadow: "none",
                children: (
                  <DepositForm
                    coin="USDT"
                    onClose={() => modals.closeAll()}
                  />
                ),
              });
            }}
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
              onClick={authStore.getState().logout}
              color="red"
              fz={16}
              fw={700}
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
  const t = useSPETranslation();

  return (
    <>
      <AppButton
        instancetype="Ghost"
        color="white"
        component={Link}
        to="/login"
      >
        {t("Log In")}
      </AppButton>
      <AppButton component={Link} to="/register">
        {t("Sign up")}
      </AppButton>
    </>
  );
}
