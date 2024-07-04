import { REGEX } from "@/utils/regex";
import { Text } from "@mantine/core";
import { FieldErrorProps } from "@rjsf/utils";
import { useMemo } from "react";

const toMsg = (msg: string) => {
  if(msg.includes(REGEX.EMAIL)) {
    return "Email invalid, please try again";
  }else {
    return msg;
  }
  
};
export function FieldErrorTemplate(props: FieldErrorProps) {
  const { errors  } = props;
  const isRoot = useMemo<boolean>(() => {
    return props.idSchema.$id === "root";
  }, [props.idSchema.$id]);
  return (
    <>
      {!isRoot && (
        <Text
          fz={"xs"}
          c={"red"}
          style={{ position: "absolute", top: "100%", left: "0" }}
        >
          {
            errors?.[0] && toMsg(errors?.[0].toLocaleString() as string)
          }
        </Text>
      )}
    </>
  );
}
