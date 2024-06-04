import { TextInput } from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { useState } from "react";

const CustomPasswordWidget = function (props: WidgetProps) {
    const [text, setText] = useState<string>(props.value);
    const [_title] = useState<string>(props.value)
    const { onChange } = props
    return (
      <>
        <TextInput
          value={text}
          onChange={({ target: { value } }) => {
            onChange(value)
            setText(value)
          }}
          type="password"
          error={props.rawErrors?.toLocaleString()} />
      </>
    );
  };

  export default CustomPasswordWidget
