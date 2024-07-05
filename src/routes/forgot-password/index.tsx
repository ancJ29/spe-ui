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
import classes from "./index.module.scss";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import { convertToForgotPasswordFormData } from "../login/config";

const Page = () => {
  const t = useTranslation();
  const {  formRef } = useAuthenticate();

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
                  ref={formRef}
                  schema={samples.ForgotPassword.schema}
                  uiSchema={samples.ForgotPassword.uiSchema}
                  formData={samples.ForgotPassword.formData}
                  w={"100%"}
                  msgSuccess="You have successfully submitted a password change request."
                  api="/api/password/forgot"
                  converterFormData={convertToForgotPasswordFormData}
                  messages={{
                    titleSuccess: "Account Registration Successful",
                    msgSuccess: "You have successfully submitted a password change request."
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
