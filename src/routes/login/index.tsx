import useTranslation from "@/hooks/useTranslation";
import AppForm from "@/ui/Form/Form";
import { Affix, Alert, Box, Button, Card, Center, Container, Divider, Flex, Grid, Group, Image, Notification, NumberFormatter, SimpleGrid, Space, Text, ThemeIcon, Title, Transition, UnstyledButton, darken, lighten, rem, useComputedColorScheme, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import classes from "./login.module.scss"
import { samples } from "@/ui/Form/Sample";
import { IconArrowUp, IconCheck, IconCoinBitcoin, IconInfoCircle, IconInfoCircleFilled, IconPhoneCalling, IconTruckLoading } from "@tabler/icons-react";
import { useEffect } from "react";
import { AppLogo } from "@/ui/Logo/Logo";
import SwitchLanguage from "@/ui/SwitchLanguage/SwitchLanguage";
import { Header } from "../top-page";

const Login = () => {
  const t = useTranslation();
  
  return (
    <>
      <Header />
      <Box className={classes.bggray}>
        <Center h={"100%"} w={"100%"}>
          <Container size={"lg"}>
            <Box w={"100%"}>
              <Card radius={"lg"} p={"xl"} w={500}>
                <Title order={3} style={{ textAlign: "center" }}>You're enjoy to Simple Exchange!</Title>
                <Space h={30} />
                <AppForm schema={samples.SignIn.schema}
                  uiSchema={samples.SignIn.uiSchema}
                  formData={samples.SignIn.formData}
                  w={"100%"} />
              </Card>
              <Group justify="center" my={"lg"}>
                <div>
                  <Text component="a" href="/forgot-password">Forgot Password?</Text>
                </div>
                <div>
                  Not a member? <Text component="a" href="/signup" fw={"bold"}>Sign Up</Text>
                </div>
              </Group>
            </Box>

            {/* <Center style={{ minHeight: "100vh" }}>
        <Button
          onClick={() => {
            localStorage.setItem("__USER__", "true");
            window.open("/", "_self");
          }}
        >
          {t("Login")}
        </Button>
      </Center> */}
          </Container>
        </Center>
      </Box>
    </>

  );
};

export default Login;
