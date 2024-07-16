import bigNumber from "@/common/big-number";
import logger from "@/services/logger";
import { useSpotTradeStorage } from "@/services/spotTradeAdapter";
import { InputWithPercent } from "@/ui/InputWithPercent";
import { WidgetProps } from "@rjsf/utils";
import { useEffect, useMemo, useState } from "react";

export function OrderValuePercentSpotWidget(props: WidgetProps) {
  const [_percent, setPercentQty] = useState(0);

  const {
    formContext: { formData, updateField },
  } = props;
  const { orderValue, quote, quoteAvailable } = useSpotTradeStorage();

  const isBuy = useMemo(() => {
    return formData?.orderSide === "BUY";
  }, [formData?.orderSide]);

  const info = useMemo(() => {
    return {
      rightTitle: quote,
    };
  }, [quote]);

  const onChangePercentValue = (percent: string) => {
    if (isNaN(parseFloat(percent))) {
      percent = "0";
    }
    const orderValueFromPercent = bigNumber.div(
      bigNumber.mul(quoteAvailable, percent),
      100,
    );
    const values = orderValue(
      orderValueFromPercent,
      formData.orderPrice,
      isBuy,
    );
    const _orderValue =
      values.orderValue == "0" ? "" : values.orderValue;
    setValues(_orderValue as string);
    updateField("qty", values.qty);
    setPercentQty(parseInt(values.percentQty.toString()));
  };

  const onChangeValue = (_qty: string) => {
    if (isNaN(parseFloat(_qty))) {
      _qty = "0";
    }
    const values = orderValue(_qty, formData?.orderPrice, isBuy);
    logger.trace("onChangePercentQty", values, formData);
    const _orderValue =
      values.orderValue == "0" ? "" : values.orderValue;
    setValues(_orderValue as string);

    updateField("qty", values.qty == "0" ? "" : values.qty);
    setPercentQty(parseInt(values.percentQty as "string" | "number"));
  };

  const setValues = (_orderValue: string) => {
    updateField("orderValue", _orderValue);
    updateField("orderValue", _orderValue);
    updateField("orderValueMarket", _orderValue);
    updateField("orderValueConditionalMarket", _orderValue);
    updateField("orderValueConditionalLimit", _orderValue);
  };

  const reset = () => {
    setPercentQty(0);
  };

  useEffect(() => {
    if (["", undefined, NaN, 0].includes(props.value)) {
      reset();
    }
  }, [props.value]);
  return (
    <>
      <InputWithPercent
        label={props.label ? props.label : "Order by Value"}
        rightTitle={info.rightTitle}
        value={props.value}
        percent={_percent}
        onChangeInput={(v) => onChangeValue(v)}
        onChangePercent={(v) => onChangePercentValue(v)}
      />
    </>
  );
}
