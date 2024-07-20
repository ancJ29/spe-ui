import AppText from "@/ui/Text/AppText";
import { Flex, NumberFormatter } from "@mantine/core";

export function SPETableDoubleNumbers({
  values,
  color,
  maw,
}: {
  maw?: number;
  values: [string | number, string | number];
  color?: string;
}) {
  return (
    <Flex maw={maw} align={"center"} justify={"end"}>
      <AppText instancetype="WithCellToken" fz={12} c={color}>
        {values[0] ? (
          <NumberFormatter thousandSeparator value={values[0]} />
        ) : (
          "---"
        )}
        {" / "}
        {values[1] ? (
          <NumberFormatter thousandSeparator value={values[1]} />
        ) : (
          "---"
        )}
      </AppText>
    </Flex>
  );
}
