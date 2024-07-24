import { schema } from "@/domain/schema";
import useTranslation from "@/hooks/useTranslation";
import AppForm from "@/ui/Form/Form";
import { svgLogo } from "@/ui/Logo/Logo";
import { SwitchDarkLightMode } from "@/ui/SwitchDarkLight";
import SwitchLanguage from "@/ui/SwitchLanguage/SwitchLanguage";
import {
  Alert,
  Box,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  NumberFormatter,
  Space,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconCoinBitcoin,
  IconInfoCircleFilled,
  IconPhoneCalling,
  IconTruckLoading,
} from "@tabler/icons-react";
import { useMemo } from "react";
import { convertToSignUpFormData } from "./config";
import classes from "./index.module.scss";

const links = [
  {
    title: "24/7 Support | 100k TPS Matching Engine",
    icon: IconPhoneCalling,
  },
  {
    title:
      "Industry-leading trading products with best-in-class liquidity through our Unified Trading Account",
    description: "Perpetuals, Futures, Options, Margin Trading, Spot",
    icon: IconCoinBitcoin,
  },
  {
    title: "Trade like a Pro with our easy-to-use Trading Tools",
    description: "Earn, Copy Trading, and Trading Bots",
    icon: IconInfoCircleFilled,
  },
  {
    title: "Expand your crypto journey with Web3 and crypto payments",
    description: "Bybit NFT, Bybit Wallet, Bybit Card",
    icon: IconTruckLoading,
  },
];

const checkIcon = (
  <IconInfoCircleFilled style={{ width: rem(20), height: rem(20) }} />
);

const SignUp = () => {
  const t = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const isDark = useMemo(() => {
    return colorScheme === "dark";
  }, [colorScheme]);
  return (
    <>
      <Box className={classes.bggray}>
        <Box className="sticky-top" px={20} bg={"black"}>
          <Group justify="space-between">
            <a href="/top-page">
              <Image src={svgLogo} w={140} />
            </a>
            <Group>
              <SwitchLanguage />
              <SwitchDarkLightMode />
            </Group>
          </Group>
        </Box>
        <Container size={"lg"}>
          <Grid py={10}>
            <Grid.Col span={12}>
              <Alert
                variant="filled"
                color={isDark ? "dark" : "black"}
                bg={isDark ? "dark" : "rgba(0, 0, 0, 0.3)"}
                icon={checkIcon}
              >
                {t(
                  "Referral code is invalid within this link, please check the invitation information or continue to sign up.",
                )}
              </Alert>
            </Grid.Col>
            <Grid.Col span={7}>
              <Card radius={"lg"} p={"xl"}>
                <Title order={3}>
                  {t("Never Miss a Beat, With Simple Exchange")}
                </Title>
                <Space h={30} />
                <Card
                  styles={{
                    root: {
                      // lighten("white", 0.2)
                      background:
                        "light-dark(rgba(0, 0, 0, 0.1), rgba(255,255,255, 0.2))",
                    },
                  }}
                  p={"xl"}
                  radius={"lg"}
                >
                  <Flex direction={"column"} gap={"md"}>
                    <Box>
                      <Title c={"primary"}>
                        <NumberFormatter
                          thousandSeparator
                          value={17841568922}
                        />
                      </Title>
                      <Text>24H Trading Volume (USD)</Text>
                    </Box>
                    <Group gap={20}>
                      <Box>
                        <Title c={"primary"}>31M+</Title>
                        <Text>Registered Users</Text>
                      </Box>
                      <Divider orientation="vertical" />
                      <Box>
                        <Title c={"primary"}>160</Title>
                        <Text>Supported Countries</Text>
                      </Box>
                      <Divider orientation="vertical" />
                      <Box>
                        <Title c={"primary"}>1252</Title>
                        <Text>Token Listed</Text>
                      </Box>
                    </Group>
                  </Flex>
                </Card>
                <Space h={30} />
                <Flex direction={"column"} gap={20}>
                  {[...links].map((_item, i) => (
                    <UnstyledButton key={i} variant="transparent">
                      <Group wrap="nowrap" align="flex-start">
                        <ThemeIcon
                          size={34}
                          variant="transparent"
                          radius="md"
                        >
                          {_item.icon && <_item.icon size={100} />}
                        </ThemeIcon>
                        <div>
                          <Text size="lg" fw={500}>
                            {_item?.title ?? ""}
                          </Text>
                          <Text size="md" c="dimmed">
                            {_item.description}
                          </Text>
                        </div>
                      </Group>
                    </UnstyledButton>
                  ))}
                </Flex>
              </Card>
            </Grid.Col>
            <Grid.Col span={5}>
              <Box w={"100%"}>
                <Card radius={"lg"} p={"xl"}>
                  <Title order={3}>
                    {t("You're invited to Simple Exchange!")}
                  </Title>
                  <Space h={30} />
                  <AppForm
                    schema={schema.SignUp.schema}
                    uiSchema={schema.SignUp.uiSchema}
                    formData={schema.SignUp.formData}
                    w={"100%"}
                    api="/api/register"
                    formDataConverter={convertToSignUpFormData}
                    messages={{
                      titleError: t("Account Registration Failed"),
                      titleSuccess: t(
                        "Account Registration Successful",
                      ),
                      msgSuccess: t(
                        "Congratulations! Your account has been successfully created. Welcome to our community. Please check your email for a verification link to complete your registration.",
                      ),
                    }}
                    onSuccess={() => {
                      window.open("/login", "_self");
                    }}
                  />
                </Card>
                <Group justify="center" my={"lg"}>
                  <div>
                    {t("You already registered?")}{" "}
                    <Text component="a" href="/login" fw={"bold"}>
                      {t("Log In")}
                    </Text>
                  </div>
                </Group>
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SignUp;
