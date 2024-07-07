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
import { convertToForgotPasswordFormData } from "./config";
import classes from "./index.module.scss";

const Page = () => {
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
                  {t("Forgot Password Simple Exchange!")}
                </Title>
                <Space h={30} />
                <AppForm
                  schema={samples.ForgotPassword.schema}
                  uiSchema={samples.ForgotPassword.uiSchema}
                  formData={samples.ForgotPassword.formData}
                  w={"100%"}
                  msgSuccess="You have successfully submitted a password change request."
                  api="/api/password/forgot"
                  formDataConverter={convertToForgotPasswordFormData}
                  messages={{
                    titleSuccess: t(
                      "Account Registration Successful",
                    ),
                    msgSuccess: t(
                      "You have successfully submitted a password change request.",
                    ),
                  }}
                />
              </Card>
              <Group justify="center" my={"lg"}>
                <div>
                  {t("You already registered?")}{" "}
                  <Text component="a" href="/login" fw={"bold"}>
                    {t("Login")}
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

export default Page;
