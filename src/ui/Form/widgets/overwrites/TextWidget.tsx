import { TextInput } from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { useState } from "react";

const CustomTextWidget = function (props: WidgetProps) {
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
          error={Boolean(props.rawErrors?.toLocaleString())} />
      </>
    );
  };

  export default CustomTextWidget
