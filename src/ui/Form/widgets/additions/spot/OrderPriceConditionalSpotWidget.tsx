import { useSpotTradeStorage } from "@/services/spotTradeAdapter";
import { Box, NumberInput } from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { useEffect } from "react";

export function OrderPriceConditionalSpotWidget({
  onChange,
  label,
  value,
  readonly,
}: WidgetProps) {
  const { lastPrices } = useSpotTradeStorage();
  useEffect(() => {
    onChange(lastPrices.spot);
  }, [lastPrices.spot, onChange]);
  return (
    <>
      <Box className="space-y-10">
        <NumberInput
          thousandSeparator=","
          decimalSeparator="."
          classNames={{
            label: "text-label-form",
          }}
          label={label || "Order by Value"}
          value={value}
          onChange={(_value) => onChange(_value.toString())}
          rightSectionWidth={60}
          readOnly={readonly}
          disabled={readonly}
          size="sm"
          hideControls
        ></NumberInput>
      </Box>
    </>
  );
}
