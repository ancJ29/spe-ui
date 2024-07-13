import defaultAvatar from "@/assets/images/defaultAvatar.png";
import { masking } from "@/common/utils";
import useAuthStore from "@/store/auth";
import {
  ActionIcon,
  Box,
  CopyButton,
  Flex,
  Image,
  Menu,
  rem,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowRight,
  IconCheck,
  IconCopy,
  IconLogout,
} from "@tabler/icons-react";
import GroupLinkAuth from "./GroupLinkAuth";

export default function MenuUserInfo() {
  const { me } = useAuthStore();
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
                <Text fz={14}>
                  {masking(me?.email || me?.mobile || "Anonymous")}
                </Text>
                <Flex align={"center"} gap={0}>
                  <Text fz={12} c={"gray.5"}>
                    UID: {me?.uid || ""}
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
          <Menu.Item fw={"bold"}>Settings</Menu.Item>

          <Menu.Item fw={"bold"} component="a" href="/wallet">
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
              onClick={() => useAuthStore.getState().logout()}
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
