import AppText from "@/ui/Text/AppText";
import {
  Box,
  InputLabel,
  SegmentedControl,
  SimpleGrid,
} from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { useState } from "react";

export function TradeLongShortSwitchTPLimitWidget(
  props: WidgetProps,
) {
  const [value, setValue] = useState<"Long" | "Short">(props.value);
  return (
    <>
      <Box className="space-y-20">
        <SimpleGrid cols={3}>
          <Box>
            <InputLabel className="text-label-form">
              Order Price
            </InputLabel>
            <AppText className="text-price-modal">0.4907</AppText>
          </Box>
          <Box>
            <InputLabel className="text-label-form">Qty</InputLabel>
            <AppText className="text-price-modal">87,589</AppText>
          </Box>
          <Box>
            <InputLabel
              className="text-label-form"
              styles={{
                label: {
                  textAlign: "right",
                  display: "block",
                },
              }}
            >
              Last Traded Price
            </InputLabel>
            <AppText
              className="text-price-modal"
              styles={{
                root: {
                  textAlign: "right",
                },
              }}
            >
              0.4893
            </AppText>
          </Box>
        </SimpleGrid>
        <SegmentedControl
          fullWidth
          data={["Long", "Short"]}
          onChange={() => {
            setValue(value === "Long" ? "Short" : "Long");
            props.onChange(value === "Long" ? "Short" : "Long");
          }}
          defaultValue="Long"
          value={value}
          classNames={{
            indicator: value === "Long" ? "btnlong" : "btnshort",
          }}
          styles={{
            indicator: {
              background: value === "Long" ? "#23b26b" : "#f0444b",
            },
            label: {
              fontWeight: "bolder",
            },
          }}
        />
      </Box>
    </>
  );
}
