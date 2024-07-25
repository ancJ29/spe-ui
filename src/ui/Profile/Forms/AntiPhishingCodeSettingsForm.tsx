import useTranslation from "@/hooks/useTranslation";
import {
  Alert,
  Box,
  Button,
  Center,
  Flex,
  SimpleGrid,
  Space,
  TextInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconInfoCircle } from "@tabler/icons-react";

export function AntiPhishingCodeSettingsForm() {
  const t = useTranslation();
  const openModal = () => {
    return modals.open({
      title: t("Anti-Phishing Code Settings"),

      children: <AntiPhishingCodeSettingsModal />,
      centered: true,
    });
  };
  return (
    <>
      <Button
        onClick={openModal}
        variant="gradient"
        miw={150}
        px={"xs"}
        gradient={{ from: "orange", to: "yellow", deg: 90 }}
      >
        {t("Settings")}
      </Button>
    </>
  );
}

export function AntiPhishingCodeSettingsModal() {
  const t = useTranslation();
  return (
    <Center h={"100%"}>
      <Box>
        <SimpleGrid
          cols={1}
          styles={{
            container: {
              gap: "10px",
            },
          }}
        >
          <Alert
            variant="light"
            color="primary"
            icon={<IconInfoCircle />}
          >
            {t(
              "Your unique Anti-Phishing Code will be displayed on all %s emails.",
              localStorage.__APP_NAME__,
            )}
          </Alert>
          <TextInput
            label={t("Anti-Phishing Code")}
            description={t(
              "Enter numbers and letters only. 20 characters max.",
            )}
          />
          <TextInput
            label={t("Current Email Verification")}
            rightSectionWidth={60}
            rightSection={
              <Flex px={10} w={"100%"}>
                <Button p={0} variant="transparent">
                  {t("Send")}
                </Button>
              </Flex>
            }
          />
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
      </Box>
    </Center>
  );
}
