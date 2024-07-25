import { schema } from "@/domain/schema";
import useTranslation from "@/hooks/useTranslation";
import AppForm from "@/ui/Form/Form";
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
                  {t("You're enjoy %s!", localStorage.__APP_NAME__)}
                </Title>
                <Space h={30} />
                <AppForm
                  showJsonOutput={true}
                  schema={schema.Login.schema}
                  uiSchema={schema.Login.uiSchema}
                  formData={schema.Login.formData}
                  w={"100%"}
                  api="/api/login"
                  formDataConverter={convertToLoginFormData}
                  onSuccess={_authenticated}
                  messages={{
                    titleError: t("Login Failed"),
                    msgSuccess: t(
                      "Welcome back! You have successfully logged in to your account.",
                    ),
                    titleSuccess: t("Login Success"),
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

function _authenticated(res: { token: string }) {
  const query = new URLSearchParams(window.location.search);
  const redirectPath = query.get("redirect") || "/";
  const token = res?.token || "";
  if (token) {
    localStorage.__TOKEN__ = token;
    window.location.href = redirectPath;
  }
}
