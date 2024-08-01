import useSPETranslation from "@/hooks/useSPETranslation";
import { sendVerifyCode, updateUserApi } from "@/services/apis";
import authStore from "@/store/auth";
import { UserUpdateType } from "@/types";
import phoneCode from "@/ui/Form/widgets/mocks/phone-code.json";
import { error, success } from "@/utils/notifications";
import { extractPhoneNumber, maskEmail } from "@/utils/utility";
import { emailVerificationCodeValidate, requiredFieldeValidate } from "@/utils/validates";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  InputLabel,
  Select,
  SimpleGrid,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useInterval } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { omit } from "lodash";
import { FormEvent, useEffect, useMemo, useState } from "react";

export function BindPhoneForm() {
  const t = useSPETranslation();
  const openModal = () => {
    return modals.open({
      title: t("Bind Phone"),
      children: <BindPhoneModal />,
      centered: true,
      withinPortal: true,
      size: "lg",
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
        {t("Bind Phone")}
      </Button>
    </>
  );
}
const SECONDS = 54
export function BindPhoneModal() {
  const t = useSPETranslation();
  const { me } = authStore();

  const [region, setRegion] = useState("+81 Japan");

  const info = useMemo(() => {
    return phoneCode.find((v) => v.value === region);
  }, [region]);

  extractPhoneNumber({ mobile: "1", phoneLocale: region })
  const [loading, setLoading] = useState(false)
  const [seconds, setSeconds] = useState(SECONDS);
  const [seconds2, setSeconds2] = useState(SECONDS);

  const interval = useInterval(() => setSeconds((s) => {
    if (s == 0) {
      interval.stop()
      return 0
    }
    return s - 1
  }), 1000);

  const intervalMail = useInterval(() => setSeconds2((s) => {
    if (s == 0) {
      intervalMail.stop()
      return 0
    }
    return s - 1
  }), 1000);

  

  useEffect(() => {
    return () => {
      interval.stop()
      intervalMail.stop()
    };
  }, []);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
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
    },
  });

  const onSubmit = () => {
    // Wrong email verification code
    const formData = omit(form.getValues())
    setLoading(true)
    updateUserApi(UserUpdateType.ADD_MOBILE, formData).then(res => {
      if (res.data.result.success) {
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
    sendVerifyCode("MOBILE").then(res => {
      if (res.data?.result?.success) {
        interval.start()
      } else {
        error(t("Verification Phone Code Failed"), t("There was an error sending the verification code."))
      }
    })
  }

  const startSendingMail = () => {
    setSeconds2(SECONDS)
    sendVerifyCode("EMAIL").then(res => {
      if (res.data?.result?.success) {
        intervalMail.start()
      } else {
        error(t("Verification Email Code Failed"), t("There was an error sending the verification code."))
      }
    })
  }
  

  return (
    <Center h={"100%"} w={"100%"}>
      <Box w={"100%"}>
        <form onSubmit={submit}>
          <SimpleGrid
            cols={1}
            styles={{
              container: {
                gap: "10px",
              },
            }}
          >
            <Box>
              <InputLabel size="lg">{t("Phone Number")}</InputLabel>
              <Flex gap={10}>
                <Box>
                  <Box w={200}>
                    <Select
                      defaultValue={region}
                      data={phoneCode}
                      value={region}
                      onChange={(v) => setRegion(v as string)}
                      leftSection={
                        <Image w={20} src={info?.image}></Image>
                      }
                      leftSectionWidth={40}
                      searchable
                      comboboxProps={{
                        withinPortal: true,
                        width: "300px",

                        position: "bottom-start",
                      }}
                      styles={{
                        input: {
                          fontSize: "14px",
                        },
                      }}
                      rightSectionWidth={30}
                      rightSection={<IconChevronDown size={16} />}
                      renderOption={({ option, checked }) => (
                        <Flex
                          h={"100%"}
                          align={"center"}
                          gap={10}
                          w={"100%"}
                        >
                          <Box>
                            <Image w={20} src={option?.image} />
                          </Box>
                          <Text fz={12}>{option.label}</Text>
                          <Flex ml={"auto"} justify={"end"} flex={1}>
                            {checked && (
                              <IconCheck
                                style={{ marginInlineStart: "auto" }}
                              />
                            )}
                          </Flex>
                        </Flex>
                      )}
                      size="lg"
                      allowDeselect={false}
                    />
                  </Box>
                </Box>
                <Box flex={1}>
                  <TextInput placeholder={t("Phone number")} />
                </Box>
              </Flex>
            </Box>
            <TextInput
              label={t("SMS Verification")}
              placeholder={t("Enter code")}
              rightSectionWidth={60}
              rightSection={
                <Flex px={10} w={"100%"}>
                  <Button disabled={interval.active} p={0} variant="transparent" onClick={startSending}>
                    {!interval.active && t("Send")}
                    {interval.active && `${seconds}s`}
                  </Button>
                </Flex>
              }
            />

            <Box>
              <Flex justify={"space-between"} align={"end"}>
                <InputLabel size="lg">{t("Current Email Verification")}</InputLabel>
                <Text c={"dimmed"}>{`${maskEmail(me?.email ?? "")}`}</Text>
              </Flex>
              <TextInput
                rightSectionWidth={60}
                rightSection={
                  <Flex px={10} w={"100%"}>
                    <Button disabled={intervalMail.active} p={0} variant="transparent" onClick={startSendingMail}>
                    {!intervalMail.active && t("Send")}
                    {intervalMail.active && `${seconds2}s`}
                  </Button>
                  </Flex>
                }
                placeholder={t("Enter code")}
              />
            </Box>
            <Space />
            <Box>
              <Button
                size="lg"
                color="gray"
                variant="gradient"
                gradient={{ from: "primary", to: "yellow", deg: 90 }}
                fullWidth
                onClick={() => modals.closeAll()}
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
