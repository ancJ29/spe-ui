import useTranslation from "@/hooks/useTranslation";
import AppForm from "@/ui/Form/Form";
import { samples } from "@/ui/Form/Sample";
import { Header } from "@/ui/Header";
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
import { convertToLoginFormData } from "./config";
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
                  {t("You're enjoy to Simple Exchange!")}
                </Title>
                <Space h={30} />
                <AppForm
                  showJsonOutput={true}
                  schema={samples.SignIn.schema}
                  uiSchema={samples.SignIn.uiSchema}
                  formData={samples.SignIn.formData}
                  w={"100%"}
                  api="/api/login"
                  formDataConverter={convertToLoginFormData}
                  messages={{
                    titleError: t("Login Failed"),
                    msgSuccess: t(
                      "Welcome back! You have successfully logged in to your account.",
                    ),
                    titleSuccess: t("Login Success"),
                  }}
                  onSuccess={(res: { token: string }) => {
                    const token = res?.token || "";
                    if (token) {
                      localStorage.__USER__ = true;
                      localStorage.__TOKEN__ = token;
                      localStorage.token = token;
                    }
                    window.open("/", "_self");
                  }}
                />
              </Card>
              <Group justify="center" my={"lg"}>
                <div>
                  <Text component="a" href="/forgot-password">
                    {t("Forgot Password?")}
                  </Text>
                </div>
                <div>
                  {t("Not a member?")}{" "}
                  <Text component="a" href="/register" fw={"bold"}>
                    {t("Sign Up")}
                  </Text>
                </div>
              </Group>
            </Box>
          </Container>
        </Center>
      </Box>
    </>
  );
};

export default Login;
