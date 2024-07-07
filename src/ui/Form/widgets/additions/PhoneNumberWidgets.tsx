import checkMfa from "@/services/apis/check-mfa";
import { debounceBuilder, extractPhoneNumber } from "@/utils/utility";
import {
  Box,
  Flex,
  Image,
  Loader,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import phoneCode from "../mocks/phone-code.json";

type RenderSelectOptionProps = {
  option: { label: string; image?: string };
  checked: boolean;
};

const onChange = debounceBuilder(
  (
    value: string,
    updateField: (key: string, value: boolean | undefined) => void,
    doCheck2FA: (email: string) => void,
  ) => {
    if (value === "") {
      updateField("mobile.mobile", undefined);
      updateField("mobile.is2fa", false);
    } else {
      doCheck2FA(value);
    }
  },
  800,
);

export function PhoneLocalWidget(props: WidgetProps) {
  return (
    <Select
      placeholder={props.placeholder}
      value={props.value}
      data={phoneCode}
      searchable
      size="lg"
      onChange={(v) => props.onChange(v)}
      rightSection={<IconChevronDown />}
      label={props.label ? props.label : ""}
      renderOption={renderSelectOption}
      comboboxProps={{
        withinPortal: true,
        width: 400,
        position: "bottom-start",
      }}
      {...(props.options?.props as any)} // eslint-disable-line
    />
  );
}

export function PhoneNumberWidget(props: WidgetProps) {
  return (
    <>
      <TextInput
        label={props.label ? props.label : ""}
        value={props.value || ""}
        placeholder={props.uiSchema?.["ui:placeholder"]}
        error={Boolean(props.rawErrors?.toLocaleString())}
        onChange={(v) => {
          props.onChange(v.toString());
        }}
        {...(props.options?.props as any)} // eslint-disable-line
      />
    </>
  );
}

export function PhoneNumber2FAWidget({
  label,
  uiSchema,
  rawErrors,
  options,
  formContext: { formData, updateField, value },
}: WidgetProps) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState<string>(value);

  const doCheck2FA = useCallback(
    (value: number) => {
      const mobile = extractPhoneNumber({
        phoneLocale: formData?.mobile?.phoneLocale,
        mobile: value.toString(),
      });
      setLoading(true);
      checkMfa({ mobile, type: 2 })
        .then(({ hasMfa }) => {
          updateField("mobile.mobile", mobile);
          updateField("mobile.is2fa", hasMfa);
        })
        .catch(() => {
          // console.log(err);
        })
        .finally(() => setLoading(false));
    },
    [updateField, formData],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target?.value || "";
      setText(value);
      onChange(value, updateField, doCheck2FA);
    },
    [doCheck2FA, updateField],
  );

  return (
    <>
      <TextInput
        label={label || ""}
        value={text || ""}
        placeholder={uiSchema?.["ui:placeholder"]}
        error={Boolean(rawErrors?.toLocaleString())}
        onChange={handleChange}
        rightSection={
          <>{loading && <Loader color="primary" size={"xs"} />}</>
        }
        {...(options?.props as any)} // eslint-disable-line
      />
    </>
  );
}

function renderSelectOption({
  option,
  checked,
}: RenderSelectOptionProps) {
  return (
    <Flex align={"center"} gap={10} w={"100%"}>
      <Box>
        <Image w={20} src={option?.image} />
      </Box>
      <Text>{option.label}</Text>
      <Flex ml={"auto"} justify={"end"} flex={1}>
        {checked && (
          <IconCheck style={{ marginInlineStart: "auto" }} />
        )}
      </Flex>
    </Flex>
  );
}
