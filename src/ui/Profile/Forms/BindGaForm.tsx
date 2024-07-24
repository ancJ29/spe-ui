import appStore from "@/assets/Download_on_the_App_Store_Badge.svg.png";
import chPlay from "@/assets/Google_Play_Store_badge_EN.svg.png";
import useTranslation from "@/hooks/useTranslation";
import { generateUri2FA } from "@/utils/utility";

import {
  Box,
  Button,
  Flex,
  Image,
  Space,
  Text,
  TextInput,
  Timeline,
  Title,
} from "@mantine/core";
import QRCode from "qrcode.react";

export function BindGaForm() {
  const t = useTranslation();
  // cspell:disable-next-line
  const secret = "KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD";

  const label =
    "alice@spe.com_" + new Date(Date.now()).toLocaleString();

  // cspell:disable-next-line
  const otpAuth = generateUri2FA("totp", label, secret, "spe", "100");
  return (
    <>
      <Box py={40}>
        <Timeline
          bulletSize={24}
          lineWidth={1}
          styles={{
            itemBullet: {
              background: "light-dark(black, white)",
            },
            itemTitle: {
              transform: "translateY(-3px)",
            },
          }}
        >
          <Timeline.Item
            title={
              <Box mb={20}>
                <Title order={3} mb={"20px"}>
                  {t("Download Google Authenticator App")}
                </Title>
              </Box>
            }
            bullet={
              <Text
                styles={{
                  root: {
                    color: "light-dark(white, black)",
                  },
                }}
                fw={"bold"}
              >
                1
              </Text>
            }
          >
            <Flex gap={10} align={"start"} h={"50px"}>
              <Box h={"100%"}>
                <Image h={"100%"} src={appStore} />
              </Box>
              <Box h={"100%"}>
                <Image h={"100%"} src={chPlay} />
              </Box>
            </Flex>
          </Timeline.Item>
          <Timeline.Item
            styles={{
              itemTitle: {
                marginBottom: "20px",

                lineHeight: "0",
              },
            }}
            title={
              <Box mb={20}>
                <Title order={3}>{t("Setup key")}</Title>
              </Box>
            }
            bullet={
              <Text
                styles={{
                  root: {
                    color: "light-dark(white, black)",
                  },
                }}
                fw={"bold"}
              >
                2
              </Text>
            }
          >
            <Flex gap={50}>
              <Box>
                <QRCode value={otpAuth} size={120} />
              </Box>
              <Box maw={"485px"} w={"100%"}>
                <Text fz={14}>
                  {t(
                    "Launch Google Authenticator app and scan the QR code or enter the key.",
                  )}
                </Text>
                <Text fz={14}>
                  {t("Setup key")}:{" "}
                  <strong
                    style={{
                      borderBottom: "solid 1px",
                    }}
                  >
                    {secret}
                  </strong>
                </Text>
                <Space my={"sm"} />
                <Text c={"primary"} fz={14}>
                  Write down your setup key in somewhere safe so that
                  you can regain access to your authenticator app if
                  you lose or switch your phone.
                </Text>
              </Box>
            </Flex>
          </Timeline.Item>
          <Timeline.Item
            title={
              <Box mb={20}>
                <Title order={3}>{t("Security Verification")}</Title>
              </Box>
            }
            bullet={
              <Text
                styles={{
                  root: {
                    color: "light-dark(white, black)",
                  },
                }}
                fw={"bold"}
              >
                3
              </Text>
            }
          >
            <Flex gap={50}>
              <Box>
                <TextInput
                  label={
                    "Current Email Verification（d********t@gmail.com）"
                  }
                  placeholder={t("Enter the verification code")}
                  rightSectionWidth={60}
                  rightSection={
                    <Flex px={10} w={"100%"}>
                      <Button p={0} variant="transparent">
                        {t("Send")}
                      </Button>
                    </Flex>
                  }
                />
                <Space my={"md"} />
                <TextInput
                  label={t("Google Authenticator Code")}
                  placeholder={t("Enter 6-digit code")}
                />
                <Space my={"md"} />
                <Button
                  fullWidth
                  variant="gradient"
                  gradient={{
                    from: "primary",
                    to: "yellow",
                    deg: 90,
                  }}
                >
                  {t("Confirm")}
                </Button>
              </Box>
            </Flex>
          </Timeline.Item>
        </Timeline>
      </Box>
    </>
  );
}
