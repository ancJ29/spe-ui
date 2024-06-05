import useTranslation from "@/hooks/useTranslation";
import AppForm from "@/ui/Form/Form";
import { samples } from "@/ui/Form/Sample";
import {
  Box,
  Card,
  Center,
  Container,
  Group,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { Header } from "../top-page";
import classes from "./login.module.scss";

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
                <Title order={3} style={{ textAlign: "center" }}>
                  You're enjoy to Simple Exchange!
                </Title>
                <Space h={30} />
                <AppForm
                  schema={samples.SignIn.schema}
                  uiSchema={samples.SignIn.uiSchema}
                  formData={samples.SignIn.formData}
                  w={"100%"}
                  _onSubmit={() => {
                    localStorage.setItem("__USER__", "true");
                    window.open("/", "_self");
                  }}
                  api="/api/login"
                />
              </Card>
              <Group justify="center" my={"lg"}>
                <div>
                  <Text component="a" href="/forgot-password">
                    Forgot Password?
                  </Text>
                </div>
                <div>
                  Not a member?{" "}
                  <Text component="a" href="/register" fw={"bold"}>
                    Sign Up
                  </Text>
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
