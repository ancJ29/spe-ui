import AppText from "@/ui/Text/AppText";
import { Flex, NumberFormatter } from "@mantine/core";
import React from "react";

export function SPETableDoubleNumbers({
  values,
  color,
  separator = "/",
  maw,
}: {
  maw?: number;
  separator?: string | React.ReactNode;
  values: [string | number, string | number];
  color?: string;
}) {
  return (
    <Flex maw={maw} align={"center"} justify={"start"}>
      <AppText instancetype="WithCellToken" fz={12} c={color}>
        {values[0] ? (
          <NumberFormatter thousandSeparator value={values[0]} />
        ) : (
          "---"
        )}
        {separator}
        {values[1] ? (
          <NumberFormatter thousandSeparator value={values[1]} />
        ) : (
          "---"
        )}
      </AppText>
    </Flex>
  );
}
