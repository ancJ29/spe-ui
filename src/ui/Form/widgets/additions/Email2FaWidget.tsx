import checkMfa from "@/services/apis/check-mfa";
import { debounceBuilder } from "@/utils/utility";
import { Loader, TextInput } from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { useCallback, useState } from "react";
import { z } from "zod";

export const TextEmailWidget = function (props: WidgetProps) {
  const [text, setText] = useState<string>(props.value);
  return (
    <>
      <TextInput
        value={text}
        onChange={({ target: { value } }) => {
          if (value === "") {
            props.onChange(undefined);
          } else {
            props.onChange(value);
          }
          setText(value);
        }}
        label={props.label ? props.label : ""}
        placeholder={props.uiSchema?.["ui:placeholder"]}
        error={Boolean(props.rawErrors?.toLocaleString())}
        {...(props.options?.props as any)} // eslint-disable-line
      />
    </>
  );
};

const onChange = debounceBuilder(
  (
    value: string,
    updateField: (key: string, value: boolean | undefined) => void,
    doCheck2FA: (email: string) => void,
  ) => {
    if (value === "") {
      updateField("email.email", undefined);
      updateField("email.is2fa", false);
    } else {
      doCheck2FA(value);
    }
  },
  800,
);

export function TextEmail2FaWidget({
  label,
  uiSchema,
  rawErrors,
  options,
  formContext: { updateField, value },
}: WidgetProps) {
  const [text, setText] = useState<string>(value);
  const [loading, setLoading] = useState<boolean>(false);
  const doCheck2FA = useCallback(
    (_email: string) => {
      try {
        const email = z.string().email().parse(_email);
        setLoading(true);
        checkMfa({ email, type: 1 })
          .then(({ hasMfa }) => {
            updateField("email.email", email);
            updateField("email.is2fa", hasMfa);
          })
          .catch(() => {
            // console.log(err);
          })
          .finally(() => setLoading(false));
      } catch (e: unknown) {
        // console.log(e.message);
      }
    },
    [updateField],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setText(value);
      onChange(value, updateField, doCheck2FA);
    },
    [doCheck2FA, updateField],
  );

  return (
    <>
      <TextInput
        value={text}
        onChange={handleChange}
        label={label || ""}
        placeholder={uiSchema?.["ui:placeholder"]}
        error={Boolean(rawErrors?.toLocaleString())}
        {...(options?.props as any)} // eslint-disable-line
        rightSection={
          <>{loading && <Loader color="primary" size={"xs"} />}</>
        }
      />
    </>
  );
}
