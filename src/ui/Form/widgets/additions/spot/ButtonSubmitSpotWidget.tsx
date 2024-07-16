import logger from "@/services/logger";
import { useSpotTradeStorage } from "@/services/spotTradeAdapter";
import AppButton from "@/ui/Button/AppButton";
import NumberFormat from "@/ui/NumberFormat";
import { Flex, InputLabel, Space, Text } from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { useMemo } from "react";

export function ButtonSubmitSpotWidget(props: WidgetProps) {
  const {
    formContext: { formData, submit },
  } = props;
  const { quote, base, orderPrice } = useSpotTradeStorage();
  logger.trace("ButtonSubmitSpotWidget", props);
  const isBuy = useMemo(() => {
    return formData?.orderSide === "BUY";
  }, [formData?.orderSide]);

  const info = useMemo(() => {
    const { maxSellingAmount, maxBuyingAmount } = orderPrice(
      formData.orderPrice,
      formData.qty,
      isBuy,
    );
    const title = isBuy
      ? "Max. buying amount"
      : "Max. selling amount";
    const value = isBuy ? maxBuyingAmount : maxSellingAmount;
    const token = isBuy ? base : quote;
    const color = isBuy ? "#23b26b" : "#f0444b";
    const label = isBuy ? "Buy" : "Sell";
    logger.trace("FECTH", formData);
    return {
      title,
      value,
      token,
      labelBtn: `${label} ${base}`,
      color,
    };
  }, [base, formData, isBuy, orderPrice, quote]);

  const onSubmit = async () => {
    submit();
  };

  return (
    <>
      <Flex justify={"space-between"}>
        <InputLabel className="text-label-form">
          {info.title}
        </InputLabel>
        <Text
          fw={"bolder"}
          fz={12}
          styles={{
            root: {
              textAlign: "right",
            },
          }}
        >
          <NumberFormat value={info.value} decimalPlaces={8} />{" "}
          {info.token}
        </Text>
      </Flex>
      <Space my={10} />
      <AppButton
        onClick={onSubmit}
        fullWidth
        bg={info.color}
        styles={{
          label: {
            flexWrap: "wrap",
            textAlign: "center",
          },
        }}
        h={44}
      >
        <Text
          component="span"
          style={{ display: "block", width: "100%" }}
          fw={"bolder"}
          fz={14}
        >
          {info.labelBtn}
        </Text>
        <Text
          component="span"
          style={{
            display: "block",
            width: "100%",
            transform: "translateY(-4px)",
          }}
          fz={10}
        >
          Demo Trading
        </Text>
      </AppButton>
    </>
  );
}
