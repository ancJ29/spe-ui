import { TextInput } from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { useState } from "react";

export const TextEmailWidget = function (props: WidgetProps) {
  const [text, setText] = useState<string>(props.value);
  const { onChange } = props;
  return (
    <>
      <TextInput
        value={text}
        onChange={({ target: { value } }) => {
          onChange(value);
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

export const TextWidget = function (props: WidgetProps) {
  const [text, setText] = useState<string>(props.value);
  const { onChange } = props;
  return (
    <>
      <TextInput
        value={text}
        onChange={({ target: { value } }) => {
          onChange(value);
          setText(value);
        }}
        placeholder={props.uiSchema?.["ui:placeholder"]}
        error={Boolean(props.rawErrors?.toLocaleString())}
        label={props.label ? props.label : ""}
        {...(props.options?.props as any)}
      />
    </>
  );
};

