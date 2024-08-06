import useSPETranslation from "@/hooks/useSPETranslation";
import useSPEUserSettings from "@/hooks/useSPEUserSettings";
import { sendVerifyCode } from "@/services/apis";
import logger from "@/services/logger";
import { error } from "@/utils/notifications";
import {
  antiPhishingCodeValidate,
  emailVerificationCodeValidate,
} from "@/utils/validates";
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
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IconInfoCircle } from "@tabler/icons-react";

export function AntiPhishingCodeSettingsForm() {
  const t = useSPETranslation();
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
  const {
    loading,
    submit,
    seconds1,
    setSeconds1,
    interval1,
    SECONDS,
  } = useSPEUserSettings<{
    mfaCode: string;
    verificationCode: string;
  }>("UPDATE_ANTI_PHISHING_CODE");
  const t = useSPETranslation();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      mfaCode: "",
      verificationCode: "",
    },
    // validateInputOnChange: true,

    validate: {
      verificationCode: (value) => {
        try {
          emailVerificationCodeValidate().parse(value);
          return null;
        } catch (error) {
          logger.error(error);
          return t("Invalid verification code");
        }
      },
      mfaCode: (value) => {
        try {
          antiPhishingCodeValidate().parse(value);
          return null;
        } catch (error) {
          logger.error(error);
          return t("Invalid mfa code");
        }
      },
    },
  });

  const startSending = () => {
    setSeconds1(SECONDS);
    sendVerifyCode("UPDATE_ANTI_PHISHING_CODE").then((res) => {
      if (res.data?.result?.success) {
        interval1.start();
      } else {
        error(
          t("Verification Phishing Code Failed"),
          t(
            "There was an error sending the verification code. Please try again or contact support if the issue persists.",
          ),
        );
      }
    });
  };

  return (
    <Center h={"100%"}>
      <Box>
        <form onSubmit={(e) => submit(e, form)}>
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
              key={form.key("mfaCode")}
              {...form.getInputProps("mfaCode")}
            />
            <TextInput
              label={t("Current Email Verification")}
              rightSectionWidth={60}
              rightSection={
                <Flex px={10} w={"100%"}>
                  <Button
                    disabled={interval1.active}
                    p={0}
                    variant="transparent"
                    onClick={startSending}
                  >
                    {!interval1.active && t("Send")}
                    {interval1.active && `${seconds1}s`}
                  </Button>
                </Flex>
              }
              key={form.key("verificationCode")}
              {...form.getInputProps("verificationCode")}
            />
            <Space />
            <Box>
              <Button
                loading={loading}
                disabled={loading}
                size="lg"
                color="gray"
                variant="gradient"
                gradient={{ from: "primary", to: "yellow", deg: 90 }}
                fullWidth
                type="submit"
              >
                {t("Confirm")}
              </Button>
            </Box>
          </SimpleGrid>
        </form>
      </Box>
    </Center>
  );
}
