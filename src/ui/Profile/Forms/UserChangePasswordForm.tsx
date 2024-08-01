import useSPETranslation from "@/hooks/useSPETranslation";
import { updateUserApi } from "@/services/apis";
import { UserUpdateType } from "@/types";
import {
  Alert,
  Box,
  Button,
  Card,
  Center,
  PasswordInput,
  SimpleGrid,
  Space,
  Title,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import { omit } from "lodash";
import { FormEvent, useState } from "react";
import { error, success } from "@/utils/notifications";
import { passwordSchemaValidate } from "@/utils/validates";


export function UserChangePasswordForm() {
  const t = useSPETranslation();
  const [loading, setLoading] = useState(false)
  

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      currentPassword: '',
      password: '',
      newPassword: "",
    },
    validateInputOnChange: true,

    validate: {
      currentPassword: (value, values) => (value.length <= 0 ? t(`Please Enter Current Password`) : null),
      password: (value) => {
        try {
          passwordSchemaValidate().parse(value);
          return null; 
        } catch (error: any) {
          return error.errors[0].message; 
        }

      },
      newPassword: (value, values) => value !== values.password ? `${t(`The two passwords are inconsistent. Please try again.`)}` : null,
    },
  });

  const updatePassword = () => {
    const formData = omit(form.getValues(), ["newPassword"])
    setLoading(true)
    updateUserApi(UserUpdateType.UPDATE_PASSWORD, formData).then(res => {
      if (res.data.result.success) {
        success(t("Password Successfully Changed"), t(`
          Your password has been successfully changed. You can now use your new password to log in.`));
        
        form.setValues(form.values)
      } else {
        error(t("Password Change Failed"), t("Password modification failed. Please make sure all fields are filled out correctly and that your current password is accurate. If the problem persists, contact support."));
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
    updatePassword()
  }

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
          <form onSubmit={submit}>
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
              <PasswordInput label={t("Current Password")} key={form.key('currentPassword')} {...form.getInputProps('currentPassword')} />
              <PasswordInput label={t("New Password")} key={form.key('password')} {...form.getInputProps('password')} />
              <PasswordInput label={t("Confirm New Password")} key={form.key('newPassword')} {...form.getInputProps('newPassword')} />
              <Space />
              <Box>
                <Button loading={loading} disabled={loading}
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
        </Card>
      </Center>
    </>
  );
}
