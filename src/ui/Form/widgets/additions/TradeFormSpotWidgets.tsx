import logger from "@/services/logger";
import { useSpotTradeStorage } from "@/services/spotTradeAdapter";
import AppButton from "@/ui/Button/AppButton";
import AppText from "@/ui/Text/AppText";
import { extractSuffix } from "@/utils/utility";
import {
  Box,
  Button,
  Flex,
  InputLabel,
  Modal,
  NumberFormatter,
  NumberInput,
  SegmentedControl,
  SimpleGrid,
  Slider,
  Space,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { WidgetProps } from "@rjsf/utils";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const isBuyOrLong = ["Long", "BUY"];

export function TradeBuySellSwitchTPLimitWidget(props: WidgetProps) {
  return (
    <>
      <SegmentedControl
        fullWidth
        data={props.schema.enum as string[]}
        onChange={(v) => {
          props.onChange(v);
        }}
        value={props.value}
        classNames={{
          indicator: isBuyOrLong.includes(props.value)
            ? "btn-long"
            : "btn-short",
        }}
        styles={{
          root: {
            padding: "0px",
          },
          indicator: {
            background: isBuyOrLong.includes(props.value)
              ? "#23b26b"
              : "#f0444b",
          },
          label: {
            fontWeight: "bolder",
            // color: (isSell || isBuy) ? "white" : "black"
          },
        }}
      />
    </>
  );
}

export function TradetriggerBuyModeWidget(props: WidgetProps) {
  return (
    <>
      <SegmentedControl
        onChange={(v) => props.onChange(v)}
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

export function NumberSimpleWidget(props: WidgetProps) {
  return (
    <>
      <NumberInput
        thousandSeparator=","
        decimalSeparator="."
        classNames={{
          label: "text-label-form",
        }}
        label={props.label ? props.label : "Order by Value"}
        value={props.value}
        onChange={(_value) => {
          props.onChange(_value.toString());
        }}
        hideControls
      ></NumberInput>
    </>
  );
}

export function VolumeInputPercentFieldWidget(props: WidgetProps) {
  const [, setPercentQty] = useState(0);
  const { pairToken, baseToken } = useSpotTradeStorage();
  const {
    formContext: { formData },
  } = props;
  const isBuy = useMemo(() => {
    return formData?.orderSide === "BUY";
  }, [formData?.orderSide]);

  const info = useMemo(() => {
    const rightTitle = isBuy ? pairToken : baseToken;
    return {
      rightTitle,
    };
  }, [baseToken, isBuy, pairToken]);

  const onChangePercent = (v: string) => {
    logger.debug("onChangePercent", v);
  };

  const onChangeInput = (v: string) => {
    logger.debug("onChangeInput", v);
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
      <Box>
        <NumberInput
          thousandSeparator=","
          decimalSeparator="."
          classNames={{
            label: "text-label-form",
          }}
          label={props.label ? props.label : "Order by Value"}
          value={props.value}
          onChange={(_value) => {
            onChangeInput(_value.toString());
          }}
          rightSectionWidth={60}
          rightSection={
            <AppText fz={12} fw={"bold"}>
              {info.rightTitle}
            </AppText>
          }
        ></NumberInput>
      </Box>
      <Box py={20} mb={10} px={2}>
        <Slider
          color="primary"
          size="sm"
          max={100}
          onChange={(v) => {
            onChangePercent(v.toString());
          }}
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
    </>
  );
}

export function VolumeInputHintFieldWidget(props: WidgetProps) {
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
            props.onChange(_value.toString());
          }}
          rightSectionWidth={60}
          rightSection={
            <AppText fz={12} fw={"bold"}>
              {extractSuffix(props?.options?.props)}
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

export function QtyBuyButtonWidget() {
  // props: WidgetProps
  return (
    <>
      <Space mt={10} />
      <Flex justify={"space-between"}>
        <InputLabel className="text-label-form">
          Max. buying amount
        </InputLabel>
        <Text fw={"bolder"} fz={12}>
          0.923598 BTC
        </Text>
      </Flex>
      <Space my={10} />
      <AppButton
        fullWidth
        bg={"#23b26b"}
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
          Buy BTC
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

export function QtySellButtonWidget() {
  // props: WidgetProps
  return (
    <>
      <Space mt={10} />
      <Flex justify={"space-between"}>
        <InputLabel className="text-label-form">
          Max. selling amount
        </InputLabel>
        <Text fw={"bolder"} fz={12}>
          0.923598 BTC
        </Text>
      </Flex>
      <Space my={10} />
      <AppButton
        fullWidth
        bg={"#f0444b"}
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
          Sell BTC
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

export function MarginWidget(props: WidgetProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const onOpenModal = useCallback(() => {
    open();
  }, [open]);
  return (
    <>
      <Box
        onClick={onOpenModal}
        px={10}
        py={8}
        style={{
          borderRadius: "5px",
          background: "light-dark(#f3f5f7, #26282c)",
        }}
        className="cursor-pointer"
      >
        <Flex justify={"space-between"} align={"center"}>
          <Flex align={"center"} gap={5}>
            <Text fz={12}>Cross</Text>
            <Text fz={12} c={"primary"}>{`${props.value}x`}</Text>
          </Flex>
          <IconCaretDownFilled size={16} />
        </Flex>
      </Box>
      <Modal
        opened={opened}
        onClose={close}
        title="Adjust Leverage"
        centered
        size={440}
        closeOnClickOutside={false}
        radius={16}
        styles={{
          root: {
            // padding: "20px"
          },
          content: {
            padding: "20px",
          },
        }}
      >
        <Text fw={"bolder"}>Leverage</Text>
        <Space mb={10} />
        <NumberInput
          hideControls
          size="lg"
          readOnly
          value={props.value}
          styles={{
            input: {
              border: "none",
              background: "light-dark(#f3f5f7, #26282c)",
              textAlign: "center",
            },
          }}
        />
        <Box py={30} mb={10} px={2}>
          <Slider
            color="primary"
            size="lg"
            max={10}
            step={1}
            min={2}
            value={props.value}
            onChange={(v) => {
              props.onChange(v);
            }}
            marks={[
              { value: 1, label: "1x" },
              { value: 2, label: "2x" },
              { value: 3, label: "3x" },
              { value: 4, label: "4x" },
              { value: 5, label: "5x" },
              { value: 6, label: "6x" },
              { value: 7, label: "7x" },
              { value: 8, label: "8x" },
              { value: 9, label: "9x" },
              { value: 10, label: "10x" },
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
        <SimpleGrid cols={2}>
          <Button bg={"#f6a600"} c={"black"} onClick={close}>
            Confirm
          </Button>
          <Button bg={"gray"} onClick={close}>
            Cancel
          </Button>
        </SimpleGrid>
      </Modal>
      <Space mb={5} />
    </>
  );
}
