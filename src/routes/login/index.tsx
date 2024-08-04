import useSPETranslation from "@/hooks/useSPETranslation";
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
import { useMediaQuery } from "usehooks-ts";
import LoginForm from "./form";
import classes from "./login.module.scss";

const Login = () => {
  const t = useSPETranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Header />
      <Box className={classes.bgGray}>
        <Center h={"100%"} w={"100%"}>
          <Container size={"lg"}>
            <Box w={"100%"}>
              <Card radius={"lg"} p={"xl"} maw={500}>
                <Title
                  fz={isMobile ? "lg" : undefined}
                  order={3}
                  style={{ textAlign: "center" }}
                >
                  {t(
                    "You're enjoy to %s!",
                    localStorage.__APP_NAME__,
                  )}
                </Title>
                <Space h={30} />
                <Box w={isMobile ? "80vw" : undefined}>
                  <LoginForm onSuccess={_authenticated} />
                </Box>
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
