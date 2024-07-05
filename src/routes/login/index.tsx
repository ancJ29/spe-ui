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
import { useAuthenticate } from "@/hooks/useAuthenticate";
import { convertToLoginFormData } from "./config";

const Login = () => {
  const t = useTranslation();
  const { formRef } = useAuthenticate();
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
                  ref={formRef}
                  showJsonOutput={true}
                  schema={samples.SignIn.schema}
                  uiSchema={samples.SignIn.uiSchema}
                  formData={samples.SignIn.formData}
                  w={"100%"}
                  api="/api/login"
                  converterFormData={(formData) => {
                    return convertToLoginFormData(formData)
                  }}
                  messages={{
                    titleError: "Login Failed",
                    msgSuccess: "Welcome back! You have successfully logged in to your account.",
                    titleSuccess: "Login Successful"
                  }}
                  _onSubmit={(res: any) => {
                    localStorage.setItem("__USER__", "true");
                    localStorage.setItem("token", res?.data?.result?.token);
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
