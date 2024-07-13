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
  Divider,
  Drawer,
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
  UnstyledButton,
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
} from "@tabler/icons-react";
import cx from "clsx";
import { Fragment, useMemo, useState } from "react";
import AppButton from "../Button/AppButton";
import classes from "./index.module.scss";
import MenuUserInfo from "./MenuUserInfo";
import SwitchLanguage from "./SwitchLanguage";

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
                  <IconSun color={lighten(theme.colors.dark[7], 1)} />
                )}
                {colorScheme === "dark" && (
                  <IconMoon
                    color={lighten(theme.colors.dark[7], 1)}
                  />
                )}
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
