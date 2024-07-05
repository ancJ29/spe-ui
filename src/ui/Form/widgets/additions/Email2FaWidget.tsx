import axios from "@/services/apis/api";
import { Loader, TextInput } from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
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
        {...(props.options?.props as any)}
      />
    </>
  );
};

export function TextEmail2FaWidget(props: WidgetProps) {
  const [text, setText] = useState<string>(props.value);
  const [loading, setLoading] = useState<boolean>(false)  
  const { formContext: { updateFormData, formData, updateField } } = props;
  const doCheck2FA = (_email: string) => {
    try {
      let email = z.string().email().parse(_email)
      const params = {
        email,
        type: 1
      }
      setLoading(true)
      axios.post("/api/check", params).then(res => {
        const hasMfa = Boolean(res.data?.result?.hasMfa);
        updateField("email.email", email)
        updateField("email.is2fa", hasMfa)
      }).catch(err => {
      }).finally(() => setLoading(false))
    } catch (e: any) {
      console.log(e.message)
    }
  }
  const debouncedOnChange = useCallback(
    debounce((value) => {
      if (value === "") {
        updateField("email.email", undefined)
        updateField("email.is2fa", false)
      } else {
        doCheck2FA(value)
      }
    }, 800),
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setText(value);
    debouncedOnChange(value);
  };

  return (
    <>
      <TextInput
        value={text}
        onChange={handleChange}
        label={props.label ? props.label : ""}
        placeholder={props.uiSchema?.["ui:placeholder"]}
        error={Boolean(props.rawErrors?.toLocaleString())}
        {...(props.options?.props as any)}
        rightSection={
          <>
            {loading && <Loader color="primary" size={"xs"} />}
          </>
        }
      />
    </>
  );
}
