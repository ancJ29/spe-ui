import useTranslation from "@/hooks/useTranslation";
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
  return str;
}
function ErrorMessages({
  errors,
}: {
  errors: FieldErrorProps["errors"];
}) {
  const t = useTranslation();
  const errorMessage = errors?.[0] ?? <></>;
  if (typeof errorMessage === "string") {
    // must have required property 'Email'

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
  // const t = useTranslation();
  if (idSchema.$id === "root") {
    return <></>;
  }
  return <ErrorMessages errors={errors} />;
}
