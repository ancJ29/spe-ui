import { priceDisplay } from "@/common/utils";
import useTranslation from "@/hooks/useTranslation";
import authStore from "@/store/auth";
import {
  AntiPhishingCodeSettingsForm,
  BindPhoneForm,
  EditNickNameForm,
} from "@/ui/Profile";
import {
  Avatar,
  Box,
  Button,
  Container,
  CopyButton,
  Divider,
  Flex,
  Grid,
  Space,
  Text,
} from "@mantine/core";
import {
  IconBrandGoogle,
  IconCheck,
  IconCircleCheckFilled,
  IconCopy,
  IconId,
  IconInfoCircleFilled,
  IconLock,
  IconMail,
  IconPhone,
  IconShieldCheckFilled,
} from "@tabler/icons-react";

export default function Page() {
  const t = useTranslation();
  const { me } = authStore();

  return (
    <>
      <Container>
        <Box py={"xl"}>
          <Flex>
            <Text fz={24} fw={600}>
              {t("Account Information")}
            </Text>
          </Flex>
          <Space my={"xl"} />
          <Divider />
          <Space my={"xl"} />
          <EditNickNameForm />
          <Space my={"xl"} />
          <Flex gap={40}>
            <Box>
              <Text fz={14} c={"dimmed"}>
                {t("UID")}
              </Text>
              <Flex align={"center"} gap={10}>
                <Text fz={20} fw={"bold"}>
                  {me?.depositCode || ""}
                </Text>
                <Flex align={"start"}>
                  <CopyButton value="194260796">
                    {({ copied, copy }) => (
                      <Button
                        h={"auto"}
                        mih={0}
                        p={0}
                        variant="transparent"
                        color={copied ? "teal" : "primary"}
                        onClick={copy}
                      >
                        {copied ? (
                          <IconCheck size={16} />
                        ) : (
                          <IconCopy size={16} />
                        )}
                      </Button>
                    )}
                  </CopyButton>
                </Flex>
              </Flex>
            </Box>
            <Box>
              <Text fz={14} c={"dimmed"}>
                {t("Security Level")}
              </Text>
              <Flex align={"center"} gap={10}>
                <Text fz={20} fw={600} c={priceDisplay("-1").color}>
                  Low
                </Text>
              </Flex>
            </Box>
            <Box>
              <Text fz={14} c={"dimmed"}>
                {t("KYC (ID Verification)")}
              </Text>
              <Flex align={"center"} gap={10}>
                <Text fz={20} fw={600} c={priceDisplay("-1").color}>
                  Unverified
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Space my={"xl"} />
          <Divider />
          <Space my={"xl"} />
          <Box>
            <Grid columns={24}>
              <Grid.Col span={10}>
                <Flex gap={12} align={"center"}>
                  <Avatar size={44}>
                    <IconLock />
                  </Avatar>
                  <Box>
                    <Text fz={16} fw={600}>
                      {t("Login Password")}
                    </Text>
                    <Text fz={14} fw={400} c={"dimmed"}>
                      {t("Use this password for account login.")}
                    </Text>
                  </Box>
                </Flex>
              </Grid.Col>
              <Grid.Col span={8}>
                <Flex align={"center"} gap={5} justify={"end"}>
                  <IconCircleCheckFilled color="green" />
                  <Text fz={14}>Settings</Text>
                </Flex>
              </Grid.Col>
              <Grid.Col span={6}>
                <Flex justify={"end"} align={"center"} h={"100%"}>
                  <Button
                    component="a"
                    href="/user/modify-password"
                    variant="gradient"
                    miw={150}
                    px={"xs"}
                    gradient={{
                      from: "orange",
                      to: "yellow",
                      deg: 90,
                    }}
                  >
                    {t("Change password")}
                  </Button>
                </Flex>
              </Grid.Col>
              <Grid.Col span={24}>
                <Divider />
              </Grid.Col>
              <Grid.Col span={10}>
                {/* KYC  */}
                <Flex gap={12} align={"center"}>
                  <Avatar size={44}>
                    <IconId />
                  </Avatar>
                  <Box>
                    <Text fz={16} fw={600}>
                      {t("KYC (ID Verification)")}
                    </Text>
                    <Text fz={14} fw={400} c={"dimmed"}>
                      {t(
                        "Advanced KYC is required for withdrawal and applying for Master in copy trading.",
                      )}
                    </Text>
                  </Box>
                </Flex>
              </Grid.Col>
              <Grid.Col span={8}>
                <Flex
                  align={"center"}
                  gap={5}
                  justify={"end"}
                  h={"100%"}
                >
                  <IconInfoCircleFilled color="gray" />
                  <Text fz={14}>{t("Not Yet verified")}</Text>
                </Flex>
              </Grid.Col>
              <Grid.Col span={6}>
                <Flex justify={"end"} align={"center"} h={"100%"}>
                  <Button
                    component="a"
                    href="/user/kyc"
                    variant="gradient"
                    miw={150}
                    px={"xs"}
                    gradient={{
                      from: "orange",
                      to: "yellow",
                      deg: 90,
                    }}
                  >
                    {t("Verify now")}
                  </Button>
                </Flex>
              </Grid.Col>
              <Grid.Col span={24}>
                <Divider />
              </Grid.Col>

              <Grid.Col span={10}>
                {/* Email */}
                <Flex gap={12} align={"center"}>
                  <Avatar size={44}>
                    <IconMail />
                  </Avatar>
                  <Box>
                    <Text fz={16} fw={600}>
                      {t("Email Verification)")}
                    </Text>
                    <Text fz={14} fw={400} c={"dimmed"}>
                      {t(
                        "Use this email for login and security verification.",
                      )}
                    </Text>
                  </Box>
                </Flex>
              </Grid.Col>
              <Grid.Col span={8}>
                <Flex
                  align={"center"}
                  gap={5}
                  justify={"end"}
                  h={"100%"}
                >
                  <IconInfoCircleFilled color="gray" />
                  <Text fz={14}>{t("Not Yet verified")}</Text>
                </Flex>
              </Grid.Col>
              <Grid.Col span={6}>
                <Flex justify={"end"} align={"center"} h={"100%"}>
                  <Button
                    variant="gradient"
                    miw={150}
                    px={"xs"}
                    gradient={{
                      from: "orange",
                      to: "yellow",
                      deg: 90,
                    }}
                  >
                    {t("Change email")}
                  </Button>
                </Flex>
              </Grid.Col>
              <Grid.Col span={24}>
                <Divider />
              </Grid.Col>

              <Grid.Col span={10}>
                {/* Phone Verification */}
                <Flex gap={12} align={"center"}>
                  <Avatar size={44}>
                    <IconPhone />
                  </Avatar>
                  <Box>
                    <Text fz={16} fw={600}>
                      {t("Phone Verification")}
                    </Text>
                    <Text fz={14} fw={400} c={"dimmed"}>
                      {t(
                        "Get SMS codes for login and security verification.",
                      )}
                    </Text>
                  </Box>
                </Flex>
              </Grid.Col>
              <Grid.Col span={8}>
                <Flex
                  align={"center"}
                  gap={5}
                  justify={"end"}
                  h={"100%"}
                >
                  <IconInfoCircleFilled color="gray" />
                  <Text fz={14}>{t("Not Yet verified")}</Text>
                </Flex>
              </Grid.Col>
              <Grid.Col span={6}>
                <Flex justify={"end"} align={"center"} h={"100%"}>
                  <BindPhoneForm />
                </Flex>
              </Grid.Col>

              <Grid.Col span={24}>
                <Divider />
              </Grid.Col>

              <Grid.Col span={10}>
                {/* Google Authentication */}
                <Flex gap={12} align={"center"}>
                  <Avatar size={44}>
                    <IconBrandGoogle />
                  </Avatar>
                  <Box>
                    <Text fz={16} fw={600}>
                      {t("Google Authentication")}
                    </Text>
                    <Text fz={14} fw={400} c={"dimmed"}>
                      {t(
                        "Secure your account by enabling 2FA through Google Authenticator.",
                      )}
                    </Text>
                  </Box>
                </Flex>
              </Grid.Col>
              <Grid.Col span={8}>
                <Flex
                  align={"center"}
                  gap={5}
                  justify={"end"}
                  h={"100%"}
                >
                  <IconInfoCircleFilled color="gray" />
                  <Text fz={14}>{t("Not Yet verified")}</Text>
                </Flex>
              </Grid.Col>
              <Grid.Col span={6}>
                <Flex justify={"end"} align={"center"} h={"100%"}>
                  <Button
                    component="a"
                    href="/user/bind-ga"
                    variant="gradient"
                    miw={150}
                    px={"xs"}
                    gradient={{
                      from: "orange",
                      to: "yellow",
                      deg: 90,
                    }}
                  >
                    {t("Bind GA")}
                  </Button>
                </Flex>
              </Grid.Col>

              <Grid.Col span={24}>
                <Divider />
              </Grid.Col>

              <Grid.Col span={10}>
                {/* Anti-Phishing Code */}
                <Flex gap={12} align={"center"}>
                  <Avatar size={44}>
                    <IconShieldCheckFilled />
                  </Avatar>
                  <Box>
                    <Text fz={16} fw={600}>
                      {t("Anti-Phishing Code")}
                    </Text>
                    <Text fz={14} fw={400} c={"dimmed"}>
                      {t(
                        "Protect your account from phishing attempts by ensuring that emails are only from %s",
                        localStorage.__APP_NAME__,
                      )}
                    </Text>
                  </Box>
                </Flex>
              </Grid.Col>
              <Grid.Col span={8}>
                <Flex
                  align={"center"}
                  gap={5}
                  justify={"end"}
                  h={"100%"}
                >
                  <IconInfoCircleFilled color="gray" />
                  <Text fz={14}>{t("Not Yet verified")}</Text>
                </Flex>
              </Grid.Col>
              <Grid.Col span={6}>
                <Flex justify={"end"} align={"center"} h={"100%"}>
                  <AntiPhishingCodeSettingsForm />
                </Flex>
              </Grid.Col>

              <Grid.Col span={24}>
                <Divider />
              </Grid.Col>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
