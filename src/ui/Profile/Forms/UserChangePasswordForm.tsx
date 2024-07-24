import useTranslation from "@/hooks/useTranslation";
import {
  Alert,
  Box,
  Button,
  Card,
  Center,
  SimpleGrid,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export function UserChangePasswordForm() {
  const t = useTranslation();
  return (
    <>
      <Center h={"100%"}>
        <Card
          maw={"480px"}
          w={"100%"}
          p={"24px"}
          shadow="0 0 24px 0 rgba(18,18,20,.1)"
          padding="lg"
          radius="25px"
          mx={"auto"}
        >
          <SimpleGrid
            cols={1}
            styles={{
              container: {

                gap: "10px",
              },
            }}
          >
            <Title>{t("Reset Password")}</Title>

            <Alert
              variant="light"
              color="primary"
              icon={<IconInfoCircle />}
            >
              {t(
                "The withdrawal function will be disabled for 24 hours after you change your login password.",
              )}

            </Alert>
            <TextInput label={t("Current Password")} />
            <TextInput label={t("New Password")} />
            <TextInput label={t("Confirm New Password")} />
            <Space />
            <Box>
              <Button
                size="lg"
                color="gray"
                variant="gradient"
                gradient={{ from: "primary", to: "yellow", deg: 90 }}
                fullWidth
                onClick={() => alert("OK")}

              >
                {t("Confirm")}
              </Button>

            </Box>
          </SimpleGrid>
        </Card>
      </Center>
    </>
  );
}
