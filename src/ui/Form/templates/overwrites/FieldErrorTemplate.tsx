import { Text } from "@mantine/core";
import { FieldErrorProps } from "@rjsf/utils";

export function FieldErrorTemplate(props: FieldErrorProps) {
  const { errors } = props;
  return (
    <Text fz={"xs"} c={"red"} style={{ position: "absolute", top: "100%", left: "0" }}>
      {errors?.toLocaleString()}
    </Text>
  );
}

