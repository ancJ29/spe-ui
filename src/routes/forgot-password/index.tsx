import { schema } from "@/domain/schema";
import useSPETranslation from "@/hooks/useSPETranslation";
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
import { useNavigate } from "react-router-dom";
import { convertToForgotPasswordFormData } from "./config";
import classes from "./index.module.scss";

const Page = () => {
  const t = useSPETranslation();
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Box className={classes.bgGray}>
        <Center h={"100%"} w={"100%"}>
          <Container size={"lg"}>
            <Box w={"100%"}>
              <Card radius={"lg"} p={"xl"} w={500}>
                <Title order={3} style={{ textAlign: "center" }}>
                  {t("Send my password reset code")}
                </Title>
                <Space h={30} />
                <AppForm
                  schema={schema.ForgotPassword.schema}
                  uiSchema={schema.ForgotPassword.uiSchema}
                  formData={schema.ForgotPassword.formData}
                  w={"100%"}
                  msgSuccess="You have successfully submitted a password change request."
                  api="/api/password/forgot"
                  formDataConverter={convertToForgotPasswordFormData}
                  onSubmit={() => {
                    navigate("/reset-password");
                  }}
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
                    {t("Log In")}
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
