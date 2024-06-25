import { FieldProps } from "@rjsf/utils";
import { FC } from "react";

export const InlineField: FC<FieldProps<string>> = ({
  children
}) => {
  return (
    <div className="xxxxx555" style={{ display: 'flex', justifyContent: 'space-between', border: "solid 1px red" }}>
      {children}
    </div>
  );
};
