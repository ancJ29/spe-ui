import { useSpotTradeStorage } from "@/services/spotTradeAdapter";
import AppText from "@/ui/Text/AppText";
import { Box, NumberInput } from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { useMemo } from "react";

export function VolumeInputSpotWidget(props: WidgetProps) {
  const {
    formContext: { formData, updateField },
  } = props;
  const { base, orderPrice } = useSpotTradeStorage();
  const isBuy = useMemo(() => {
    return formData?.orderSide === "BUY";
  }, [formData?.orderSide]);
  const onChange = (v: number | string) => {
    const values = orderPrice(v, formData.qty, isBuy);
    updateField("orderPrice", values.orderPrice);
    updateField("orderValue", values.orderValue);
    updateField(
      "qty",
      isBuy ? values.percentQtyBuy : values.percentQtySell,
    );
  };
  const token = useMemo(() => {
    return base;
  }, [base]);

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
          onChange={onChange}
          rightSectionWidth={60}
          readOnly={props.readonly}
          disabled={props.readonly}
          size="sm"
          rightSection={
            <AppText fz={12} fw={"bold"}>
              {token}
            </AppText>
          }
        ></NumberInput>
      </Box>
    </>
  );
}
