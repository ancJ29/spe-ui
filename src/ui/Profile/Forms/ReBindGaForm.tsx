import appStore from "@/assets/Download_on_the_App_Store_Badge.svg.png";
import chPlay from "@/assets/Google_Play_Store_badge_EN.svg.png";
import useSPETranslation from "@/hooks/useSPETranslation";
import { sendVerifyCode, updateUserApi } from "@/services/apis";
import authStore from "@/store/auth";
import { UserUpdateType } from "@/types";
import { error, success } from "@/utils/notifications";
import { generateUri2FA, maskEmail } from "@/utils/utility";
import { antiPhishingCodeValidate, emailVerificationCodeValidate, requiredFieldeValidate } from "@/utils/validates";

import {
  Box,
  Button,
  Flex,
  Image,
  Space,
  Text,
  TextInput,
  Timeline,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useInterval } from "@mantine/hooks";
import { omit } from "lodash";
import QRCode from "qrcode.react";
import { FormEvent, useEffect, useMemo, useState } from "react";
const SECONDS = 54

export function ReBindGaForm() {
  const t = useSPETranslation();
  const { me } = authStore();
  const otpAuth = useMemo(() => {
    const secret = "KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD";
    const label = "alice@spe.com_" + new Date(Date.now()).toLocaleString();
    return {
      value: generateUri2FA("totp", label, secret, "spe", "100"),
      secret,
      label
    }
  }, []);

  const [loading, setLoading] = useState(false)
  const [seconds, setSeconds] = useState(SECONDS);

  const interval = useInterval(() => setSeconds((s) => {
    if (s == 0) {
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
      oldMfaCode: '',
      mfaCode: '',
      mfaSecret: '',
    },
    validateInputOnChange: true,

    validate: {
      oldMfaCode: (value, values) => {
        try {
          emailVerificationCodeValidate().parse(value);
          return null;
        } catch (error: any) {
          return error.errors[0].message;
        }
      },
      mfaCode: (value, values) => {
        try {
          emailVerificationCodeValidate().parse(value);
          return null;
        } catch (error: any) {
          return error.errors[0].message;
        }
      },
      mfaSecret: (value) => {
        try {
          requiredFieldeValidate().parse(value)
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
    updateUserApi(UserUpdateType.UPDATE_MFA, formData).then(res => {
      if (res.data?.result?.success) {
        success(t("Google Authenticator Setup Successful"), t(`Google Authenticator setup is complete. Please use the app to generate codes and enter them during login for added security.`));

        form.setValues(form.values)
      } else {
        error(t("Google Authenticator Binding Failed"), t(`An error occurred while trying to bind Google Authenticator. Please verify the setup instructions and try again.`));
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
    sendVerifyCode("EMAIL").then(res => {
      if (res.data?.result?.success) {
        interval.start()
      } else {
        error(t("Verification Email Code Failed"), t("There was an error sending the verification code."))
      }
    })
  }

  return (
    <>
      <Box py={40}>
        <Title order={2}>
          {t("Change Google Authenticator")}
        </Title>
        <Text c={"primary"} fz={14}>
          {t("The withdrawal function will be disabled for 24 hours after you change your Google Authenticator.")}
        </Text>
        <Space my={"xl"} />
        <Timeline
          bulletSize={24}
          lineWidth={1}
          styles={{
            itemBullet: {
              background: "light-dark(black, white)",
            },
            itemTitle: {
              transform: "translateY(-3px)",
            },
          }}
        >
          <Timeline.Item
            styles={{
              itemTitle: {
                marginBottom: "20px",

                lineHeight: "0",
              },
            }}
            title={
              <Box mb={20}>
                <Title order={3}>{t("Set Up New Google Authenticator")}</Title>

              </Box>
            }
            bullet={
              <Text
                styles={{
                  root: {
                    color: "light-dark(white, black)",
                  },
                }}
                fw={"bold"}
              >
                1
              </Text>
            }
          >
            <Flex gap={50}>
              <Box>
                <QRCode value={otpAuth.value} size={120} />
              </Box>
              <Box maw={"485px"} w={"100%"}>
                <Text fz={14}>
                  {t(
                    "Launch Google Authenticator app and scan the QR code or enter the key.",
                  )}
                </Text>
                <Text fz={14}>
                  {t("Setup key")}:{" "}
                  <strong
                    style={{
                      borderBottom: "solid 1px",
                    }}
                  >
                    {otpAuth.secret}
                  </strong>
                </Text>
                <Space my={"sm"} />
                <Text c={"primary"} fz={14}>
                  {t(`Write down your setup key in somewhere safe so that
                  you can regain access to your authenticator app if
                  you lose or switch your phone.`)}
                </Text>
              </Box>
            </Flex>
          </Timeline.Item>
          <Timeline.Item
            title={
              <Box mb={20}>
                <Title order={3} mb={"20px"}>
                  {t("検証")}
                </Title>
              </Box>
            }
            bullet={
              <Text
                styles={{
                  root: {
                    color: "light-dark(white, black)",
                  },
                }}
                fw={"bold"}
              >
                2
              </Text>
            }
          >
            <Box style={{
              maxWidth: "500px",
              width: "100%"
            }}>
              <TextInput
                label={t("New Google Authenticator Code")}
                placeholder={t("Enter 6-digit code")}
                key={form.key('oldMfaCode')} {...form.getInputProps('oldMfaCode')}
              />
            </Box>
          </Timeline.Item>
          <Timeline.Item
            title={
              <Box mb={20}>
                <Title order={3}>{t("Security Verification")}</Title>
              </Box>
            }
            bullet={
              <Text
                styles={{
                  root: {
                    color: "light-dark(white, black)",
                  },
                }}
                fw={"bold"}
              >
                3
              </Text>
            }
          >
            <Box style={{
              maxWidth: "500px",
              width: "100%"
            }}>
              <form onSubmit={submit}>
                <Box>
                  <Space my={"md"} />
                  <TextInput
                    label={
                      `Current Email Verification（${maskEmail(me?.email ?? "")}）`
                    }
                    placeholder={t("Enter the verification code")}
                    rightSectionWidth={60}
                    rightSection={
                      <Flex px={10} w={"100%"}>
                        <Button disabled={interval.active} p={0} variant="transparent" onClick={startSending}>
                          {!interval.active && t("Send")}
                          {interval.active && `${seconds}s`}
                        </Button>
                      </Flex>
                    }
                    key={form.key('mfaCode')} {...form.getInputProps('mfaCode')}
                  />
                  <Space my={"md"} />
                  <TextInput
                    label={t("Old Google Authentication Code")}
                    placeholder={t("Enter code")}
                    key={form.key('mfaSecret')} {...form.getInputProps('mfaSecret')}
                  />
                  <Space my={"md"} />
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    fullWidth
                    variant="gradient"
                    gradient={{
                      from: "primary",
                      to: "yellow",
                      deg: 90,
                    }}
                  >
                    {t("Confirm")}
                  </Button>
                </Box>
              </form>
            </Box>
          </Timeline.Item>
        </Timeline>
      </Box>
    </>
  );
}
