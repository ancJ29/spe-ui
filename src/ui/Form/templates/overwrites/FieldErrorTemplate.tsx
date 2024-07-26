import useSPETranslation from "@/hooks/useSPETranslation";
import { Text } from "@mantine/core";
import { FieldErrorProps } from "@rjsf/utils";

// prettier-ignore
// const excludes = [
//   "must match \"then\" schema",
//   "must match \"if\" schema",
//   "must match \"else\" schema",
// ];

function _convert (str: string) {
  if (str.includes("must have required property")) {
    return "Field is required";
  }
  if (str.includes("must match")) {
    return "Invalid value";
  }
  return str;
}
function ErrorMessages({
  errors,
}: {
  errors: FieldErrorProps["errors"];
}) {
  const t = useSPETranslation();
  const errorMessage = errors?.[0] ?? <></>;
  if (typeof errorMessage === "string") {
    // must have required property 'Email'
    errorMessage.includes("Field is required");
    return (
      <Text
        fz={"xs"}
        c={"red"}
        style={{ position: "absolute", top: "100%", left: "0" }}
      >
        {t(_convert(errorMessage))}
      </Text>
    );
  }
  return errorMessage;
}

export function FieldErrorTemplate({
  errors,
  idSchema,
}: FieldErrorProps) {
  // const t = useSPETranslation();
  if (idSchema.$id === "root") {
    return <></>;
  }
  return <ErrorMessages errors={errors} />;
}
