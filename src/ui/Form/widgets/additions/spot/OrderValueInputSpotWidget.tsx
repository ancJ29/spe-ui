import { useSpotTradeStorage } from "@/services/spotTradeAdapter";
import AppText from "@/ui/Text/AppText";
import {
  Box,
  Flex,
  InputLabel,
  NumberFormatter,
  NumberInput,
} from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { useMemo } from "react";

export function OrderValueInputSpotWidget(props: WidgetProps) {
  const {
    formContext: { formData, updateField },
  } = props;
  const { orderValue, pairToken } = useSpotTradeStorage();
  const isBuy = useMemo(() => {
    return formData?.orderSide === "BUY";
  }, [formData?.orderSide]);
  const onChange = (v: number | string) => {
    if (isNaN(parseFloat(v.toString()))) {
      v = "0";
    }
    const values = orderValue(v, formData.orderPrice, isBuy);
    updateField("orderValue", values.orderValue);
    updateField("qty", values.qty);
  };
  return (
    <>
      <Box className="space-y-10">
        <NumberInput
          thousandSeparator=","
          decimalSeparator="."
          classNames={{
            label: "text-label-form",
          }}
          label={props.label ? props.label : "Order by Value"}
          value={props.value}
          onChange={(_value) => {
            onChange(_value);
          }}
          rightSectionWidth={60}
          rightSection={
            <AppText fz={12} fw={"bold"}>
              {pairToken}
            </AppText>
          }
          size="sm"
        ></NumberInput>
        <Flex justify={"end"}>
          <InputLabel className="text-label-form">
            ~
            <NumberFormatter
              value={props.value}
              thousandSeparator
            />{" "}
            USD
          </InputLabel>
        </Flex>
      </Box>
    </>
  );
}
