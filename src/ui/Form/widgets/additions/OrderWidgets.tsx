import BN from "@/common/big-number";
import { OrderSide } from "@/common/enums";
import { maxVolume } from "@/common/logic";
import { freeAmount } from "@/common/utils";
import useTranslation from "@/hooks/useTranslation";
import logger from "@/services/logger";
import { assetStore } from "@/store/assets";
import tradeStore from "@/store/trade";
import AppButton from "@/ui/Button/AppButton";
import NumberFormat from "@/ui/NumberFormat";
import { AppPopover } from "@/ui/Popover/AppPopover";
import AppText from "@/ui/Text/AppText";
import {
  Box,
  Checkbox,
  Flex,
  HoverCard,
  InputLabel,
  NumberInput,
  SegmentedControl,
  Select,
  Slider,
  Text,
} from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";

const BUY_AND_SELL = ["BUY", "SELL"];
const LONG_SHORT = ["LONG", "SHORT"];

export function OrderTypeWidget({
  name,
  formContext: { updateFields },
  ...props
}: WidgetProps) {
  return (
    <>
      <SegmentedControl
        onChange={(value) =>
          updateFields({
            [name]: value,
          })
        }
        className="control-segment-percent"
        data={props.schema.enum as string[]}
        size="xs"
        styles={{
          root: {
            gap: "20px",
            padding: "0px",
            background: "none",
          },
          label: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "14px",
            padding: "0px",
          },
          indicator: {
            display: "none",
          },
        }}
        withItemsBorders={false}
      />
    </>
  );
}

function _orderSideLabel(side: OrderSide, isFuture: boolean) {
  if (isFuture) {
    switch (side) {
      case OrderSide.BUY:
        return "LONG";
      case OrderSide.SELL:
        return "SHORT";
    }
  }
  return side;
}
export function OrderSideWidget({
  name,
  value,
  formContext: { formData, updateFields },
}: WidgetProps) {
  const t = useTranslation();
  return (
    <SegmentedControl
      fullWidth
      value={_orderSideLabel(value, formData.isFuture)}
      data={
        formData.isFuture ? LONG_SHORT.map(t) : BUY_AND_SELL.map(t)
      }
      onChange={(side: string) => {
        const sideMap: Record<string, OrderSide> = {
          BUY: OrderSide.BUY,
          SELL: OrderSide.SELL,
          LONG: OrderSide.BUY,
          SHORT: OrderSide.SELL,
        };
        logger.trace("side", side);
        updateFields({ [name]: sideMap[side] });
      }}
      classNames={{
        indicator: _isBuy(value) ? "btn-long" : "btn-short",
      }}
      styles={{
        root: {
          padding: "0px",
        },
        indicator: {
          background: _isBuy(value) ? "#23b26b" : "#f0444b",
        },
        label: {
          fontWeight: "bolder",
        },
      }}
    />
  );
}

export function OrderPriceInputFieldWidget({
  value,
  onChange,
  formContext: { formData },
}: WidgetProps) {
  const changeByLast = useCallback(() => {
    const lastPrice =
      tradeStore.getState().marketPrices?.[formData.symbol] || 0;
    onChange(Number(lastPrice));
  }, [formData.symbol, onChange]);
  return (
    <>
      <NumberInput
        label="Order Price"
        classNames={{ label: "text-label-form" }}
        thousandSeparator=","
        decimalSeparator="."
        rightSectionWidth={50}
        value={value || ""}
        onChange={(value) => onChange(Number(value))}
        size="sm"
        rightSection={
          <AppText
            onClick={changeByLast}
            style={{
              cursor: "pointer",
            }}
            fz={12}
            c={"primary"}
            fw={"bold"}
          >
            Last
          </AppText>
        }
      />
    </>
  );
}

export function VolumeInputFieldWidget({
  value,
  onChange,
  formContext: { formData },
}: WidgetProps) {
  const t = useTranslation();
  const [percent, setPercent] = useState(0);
  const { marketPrices, symbolMap } = tradeStore();
  const { tradingBalances } = assetStore();
  const { max, config } = useMemo(() => {
    const coin = _isBuy(formData.orderSide)
      ? formData.quote
      : formData.base;
    const balance = tradingBalances.find((el) => el.coin === coin);
    if (!balance) {
      return { max: 0, precision: 0 };
    }
    const free = Number(freeAmount(balance));
    const { max } = maxVolume(
      free,
      Number(formData.orderPrice) || marketPrices[formData.symbol],
      formData.orderSide,
    );
    return { max, config: symbolMap[formData.symbol] };
  }, [
    formData.base,
    formData.orderPrice,
    formData.orderSide,
    formData.quote,
    formData.symbol,
    marketPrices,
    symbolMap,
    tradingBalances,
  ]);

  return (
    <Box className="space-y-10">
      <NumberInput
        thousandSeparator=","
        decimalSeparator="."
        classNames={{ label: "text-label-form" }}
        label={t("Volume")}
        step={Number(config?.volumeStepSize) || 1}
        value={value || 0}
        min={Number(config?.minVolume) || 0.001}
        onChange={(value) => {
          setPercent(
            Math.min(
              Number(BN.div(100 * Number(value), max, 2)),
              100,
            ),
          );
          onChange(Number(value));
        }}
        rightSectionWidth={60}
        size="sm"
        rightSection={
          <AppText fz={12} fw={"bold"}>
            {formData.base}
          </AppText>
        }
      />
      <Flex px={2} gap={2} align={"center"} justify={"end"}>
        <Text size="xs" c="gray">
          {t("Max Volume")}:
        </Text>
        <Text size="xs" c="gray">
          <NumberFormat decimalPlaces={3} value={max} />
        </Text>
      </Flex>
      <Box py={20}>
        <Slider
          onChange={(percent) => {
            setPercent(percent);
            onChange(Number(BN.div(BN.mul(max, percent), 100, 3)));
          }}
          value={percent}
          color="primary"
          size="sm"
          max={100}
          marks={[
            { value: 0, label: "0%" },
            { value: 25, label: "20%" },
            { value: 50, label: "50%" },
            { value: 75, label: "75%" },
            { value: 100, label: "100%" },
          ]}
          styles={{
            label: {
              fontSize: "10px",
            },
            markLabel: {
              fontSize: "10px",
            },
          }}
        />
      </Box>
    </Box>
  );
}

export function UiBalanceWidget({
  formContext: { formData },
}: WidgetProps) {
  const { tradingBalances } = assetStore();
  const t = useTranslation();
  const { coin, availableBalance } = useMemo(() => {
    const isBuy = _isBuy(formData?.orderSide || "BUY");
    const coin = isBuy ? formData.quote : formData.base;
    return {
      isBuy,
      coin,
      availableBalance:
        tradingBalances.find((el) => {
          return el.coin === coin;
        })?.availableMargin || 0,
    };
  }, [
    formData.base,
    formData?.orderSide,
    formData.quote,
    tradingBalances,
  ]);

  return (
    <Flex justify={"space-between"} align={"center"} pt={10}>
      <HoverCard
        width={280}
        shadow="md"
        position="top"
        withArrow
        arrowSize={12}
      >
        <HoverCard.Target>
          <InputLabel
            className="text-label-form"
            styles={{
              label: {
                cursor: "pointer",
                borderBottom:
                  "dashed 1px light-dark(rgba(0, 0, 0, 0.4), gray)",
              },
            }}
          >
            {t("Available Balance")}
          </InputLabel>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
            {t(
              "Bonuses are not reflected in the Available Balance for Spot Trading",
            )}
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
      <Text fw={"bolder"} fz={12}>
        <Box style={{ textAlign: "right" }} fz={12}>
          <NumberFormat value={availableBalance} decimalPlaces={6} />{" "}
          {coin}
        </Box>
      </Text>
    </Flex>
  );
}

export function PostOnlyWidget({
  label, // eslint-disable-line
  ...props
}: WidgetProps) {
  const t = useTranslation();
  return (
    <ActionOnlyWidget
      tooltip={t(
        "The Post-Only order will only be executed as a maker order. If it can be executed immediately as a taker order, it will be automatically canceled",
      )}
      label={t("Post Only")}
      {...props}
    />
  );
}

export function ReduceOnlyWidget({
  label, // eslint-disable-line
  ...props
}: WidgetProps) {
  const t = useTranslation();
  return (
    <ActionOnlyWidget
      tooltip={t(
        "The reduce-only order will only reduce your position size. Any order that might increase your position size will be canceled or adjusted",
      )}
      label={t("Reduce Only")}
      {...props}
    />
  );
}

export function TimeInForceWidget(props: WidgetProps) {
  const t = useTranslation();

  return (
    <Flex gap={5} align={"center"} justify={"start"}>
      <InputLabel className="text-label-form">
        {t("Time in Force")}
      </InputLabel>
      <Select
        w={"80px"}
        value={props.value}
        data={props.schema.enum as string[]}
        onChange={(v) => props.onChange(v)}
        defaultValue="Good-Till-Canceled"
        withCheckIcon={false}
        rightSection={<IconCaretDownFilled size={14} />}
        rightSectionWidth={30}
        allowDeselect={false}
        size="xs"
        classNames={{
          root: "app-select",
          option: "app-select-option",
        }}
        comboboxProps={{
          position: "bottom",
          offset: 0,
          withinPortal: true,
          width: "auto",
        }}
        styles={{
          input: {
            border: "none",
            fontSize: "12px",
            textAlign: "right",
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            background: "light-dark(rgba(0,0,0, 0.05), #26282c)",
          },
          option: {
            fontSize: "12px",
          },
        }}
      />
    </Flex>
  );
}

export function PlaceOrderButtonsWidget({
  formContext: { formData, submit },
}: WidgetProps) {
  const t = useTranslation();
  const isBuy = useMemo(() => {
    return formData?.orderSide === "BUY";
  }, [formData?.orderSide]);

  return (
    <AppButton
      onClick={submit}
      fullWidth
      bg={isBuy ? "#23b26b" : "#f0444b"}
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
        {isBuy
          ? `${t("BUY")} ${formData.base}`
          : `${t("SELL")} ${formData.base}`}
      </Text>
    </AppButton>
  );
}

function ActionOnlyWidget(
  props: Omit<WidgetProps, "label"> & {
    label?: string;
    tooltip?: string;
  },
) {
  return (
    <Box className="space-y-10">
      <Checkbox
        checked={props.value}
        onChange={(event) => {
          props.onChange(event.currentTarget.checked);
        }}
        label={
          !props.label ? (
            ""
          ) : (
            <>
              <AppPopover
                withArrow={false}
                position="bottom-start"
                target={(_props) => ({
                  children: (
                    <InputLabel
                      onClick={() => props.onChange(!props.value)}
                      className="text-label-form"
                      onMouseLeave={_props.close}
                      onMouseEnter={_props.open}
                    >
                      {props.label || ""}
                    </InputLabel>
                  ),
                })}
                dropdown={() => ({
                  children: (
                    <div>
                      <AppText instancetype="WithTextTooltip">
                        {props.tooltip || ""}
                      </AppText>
                    </div>
                  ),
                })}
              ></AppPopover>
            </>
          )
        }
      />
    </Box>
  );
}

function _isBuy(value: string) {
  return ["BUY", "LONG"].includes(value);
}
