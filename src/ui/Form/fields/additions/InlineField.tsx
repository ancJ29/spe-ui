import { FieldProps } from "@rjsf/utils";
import { FC } from "react";

export const InlineField: FC<FieldProps<string>> = ({
  children
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {children}
    </div>
  );
};
