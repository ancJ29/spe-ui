import { PasswordInput, TextInput } from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { useState } from "react";

export const CustomPasswordWidget = function (props: WidgetProps) {
  const [text, setText] = useState<string>(props.value as string ?? '');
  const [_title] = useState<string>(props.value);
  const { onChange } = props;
  return (
    <>
      <PasswordInput
        value={text}
        onChange={({ target: { value } }) => {
          onChange(value);
          setText(value);
        }}
        type="password"
        placeholder={props.uiSchema?.["ui:placeholder"]}
        error={Boolean(props.rawErrors?.toLocaleString())}
      />
    </>
  );
};

