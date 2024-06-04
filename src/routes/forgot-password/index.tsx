import useTranslation from "@/hooks/useTranslation";
import AppForm from "@/ui/Form/Form";
import { Box, Card, Center, Container, Group, Space, Text, Title, } from "@mantine/core";
import classes from "./index.module.scss"
import { samples } from "@/ui/Form/Sample";
import { Header } from "../top-page";

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
                <AppForm schema={samples.ForgotPassword.schema}
                  uiSchema={samples.ForgotPassword.uiSchema}
                  formData={samples.ForgotPassword.formData}
                  w={"100%"} />
              </Card>
              <Group justify="center" my={"lg"}>
                <div>
                  You already registered? <Text component="a" href="/login" fw={"bold"}>Login</Text>
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

export default Page;
