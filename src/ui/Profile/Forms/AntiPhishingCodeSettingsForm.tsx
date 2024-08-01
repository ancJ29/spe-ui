import useSPETranslation from "@/hooks/useSPETranslation";
import { sendVerifyCode, updateUserApi } from "@/services/apis";
import { UserUpdateType } from "@/types";
import { success, error } from "@/utils/notifications";
import { antiPhishingCodeValidate, emailVerificationCodeValidate, passwordSchemaValidate } from "@/utils/validates";
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
import { useInterval } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconInfoCircle } from "@tabler/icons-react";
import { omit } from "lodash";
import { FormEvent, useEffect, useState } from "react";
const SECONDS = 54
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
  const t = useSPETranslation();

  const [loading, setLoading] = useState(false)
  const [seconds, setSeconds] = useState(SECONDS);

  const interval = useInterval(() => setSeconds((s) => {
    if(s == 0) {
      interval.stop()
      return 0
    }
    return s - 1
  }), 1000);


  useEffect(() => {
    return interval.stop;
  }, []);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      mfaCode: '',
      verificationCode: '',
    },
    validateInputOnChange: true,

    validate: {
      verificationCode: (value, values) => {
        try {
          emailVerificationCodeValidate().parse(value);
          return null;
        } catch (error: any) {
          return error.errors[0].message;
        }
      },
      mfaCode: (value) => {
        try {
          antiPhishingCodeValidate().parse(value);
          return null;
        } catch (error: any) {
          return error.errors[0].message;
        }

      },
    },
  });

  const onSubmit = () => {
    // Wrong email verification code
    const formData = omit(form.getValues())
    setLoading(true)
    updateUserApi(UserUpdateType.UPDATE_ANTI_PHISHING_CODE, formData).then(res => {
      if (res.data?.result?.success) {
        success(t("Anti-Phishing Code Setup Successful"), t(`Anti-Phishing Code set up successfully. `));

        form.setValues(form.values)
      } else {
        error(t("Anti-Phishing Code Setup Failed"), t(`We couldn't set up your Anti-Phishing Code. Ensure you have followed the steps correctly and try again.`));
      }

    }).finally(() => {
      setLoading(false)
    })
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (form.isValid() === false) {
      form.validate()
      return false
    }
    onSubmit()
  }

  const startSending = () => {
    setSeconds(SECONDS)
    sendVerifyCode("UPDATE_ANTI_PHISHING_CODE").then(res => {
      if (res.data?.result?.success) {
        interval.start()
      }else {
        error(t("Verification Phishing Code Failed"), t("There was an error sending the verification code. Please try again or contact support if the issue persists."))
      }
    })
  }



  return (
    <Center h={"100%"}>
      <Box>
        <form onSubmit={submit}>
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
              key={form.key('mfaCode')} {...form.getInputProps('mfaCode')}
            />
            <TextInput
              label={t("Current Email Verification")}
              rightSectionWidth={60}
              rightSection={
                <Flex px={10} w={"100%"}>
                  <Button disabled={interval.active} p={0} variant="transparent" onClick={startSending}>
                    {!interval.active && t("Send")}
                    {interval.active && `${seconds}s`}
                  </Button>
                </Flex>
              }
              key={form.key('verificationCode')} {...form.getInputProps('verificationCode')}
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
