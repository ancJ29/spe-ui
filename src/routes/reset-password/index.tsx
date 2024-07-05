import { useAuthenticate } from "@/hooks/useAuthenticate";
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
import { Header } from "@/ui/Header";
import { convertToResetPasswordFormData } from "./config";
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
                  {t("Reset Password to Simple Exchange!")}
                </Title>
                <Space h={30} />
                <AppForm
                  showJsonOutput={false}
                  schema={samples.ResetPassword.schema}
                  uiSchema={samples.ResetPassword.uiSchema}
                  formData={samples.ResetPassword.formData}
                  w={"100%"}
                  msgSuccess={t("Password reset has been done")}
                  api="/api/password/reset"
                  formDataConverter={convertToResetPasswordFormData}
                  messages={{
                    titleSuccess: t("Password Reset Successful"),
                    msgSuccess: t(
                      "Your password has been successfully reset. You can now log in with your new password. If you did not request this change, please contact our support team immediately.",
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
