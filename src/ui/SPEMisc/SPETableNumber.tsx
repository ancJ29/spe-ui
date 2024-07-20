import NumberFormat from "@/ui/NumberFormat";
import AppText from "@/ui/Text/AppText";
import { Flex } from "@mantine/core";

export function SPETableNumber({
  value,
  color,
  maw,
  decimalPlaces = 4,
}: {
  decimalPlaces?: number;
  maw?: number;
  value?: string | number;
  color?: string;
}) {
  return (
    <Flex maw={maw} align={"center"} justify={"start"}>
      <AppText instancetype="WithCellToken" fz={12} c={color}>
        {!value ? (
          "---"
        ) : (
          <NumberFormat
            value={value || 0}
            decimalPlaces={decimalPlaces}
          />
        )}
      </AppText>
    </Flex>
  );
}
