import { Text } from "@mantine/core";
import { FieldErrorProps } from "@rjsf/utils";
import { useMemo } from "react";

export function FieldErrorTemplate(props: FieldErrorProps) {
  const { errors } = props;
  const isRoot = useMemo<boolean>(() => {
    return props.idSchema.$id === "root";
  }, []);
  return (
    <>
      {!isRoot && <Text fz={"xs"} c={"red"} style={{ position: "absolute", top: "100%", left: "0" }}>
        {errors?.[0].toLocaleString()}
      </Text>}
    </>
  );
}

