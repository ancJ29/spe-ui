import { FieldProps } from "@rjsf/utils";
import { FC, useState } from "react";
import { TextInput } from "@mantine/core";


export const PhoneNumberField: FC<FieldProps<string>> = ({ onChange, title, name, required, formData, rawErrors }) => {
  const [text, setText] = useState<string>(formData || "");
  const [_title] = useState<string>(title ? required ? title + "*" : title : "");
  return (
    <div>
      <div>
        {/* {JSON.stringify(rawErrors)} */}
      </div>
      <TextInput
        label={_title}
        value={text}
        onChange={({ target: { value } }) => {
          onChange(value);
          setText(value);
        }}
        error={rawErrors?.toLocaleString()}
      />
    </div>
  );
};

