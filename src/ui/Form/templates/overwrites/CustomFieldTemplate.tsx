import { Text } from "@mantine/core";
import { FieldTemplateProps } from "@rjsf/utils";
import clsx from "clsx";

export function CustomFieldTemplate(props: FieldTemplateProps) {
  const { id, classNames, style, label, help, required, description, errors, children } = props;
  return (
    <div className={clsx(classNames, "rowItem")} style={style}>
      {props.displayLabel && <Text component="label" htmlFor={id} fw={"bold"}>
        {label}
        {required ? "*" : null}
      </Text>}
      {description}
      {children}
      {errors}
      {help}
    </div>
  );
}

