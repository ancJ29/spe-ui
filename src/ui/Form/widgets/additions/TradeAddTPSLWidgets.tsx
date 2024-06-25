import AppButton from "@/ui/Button/AppButton";
import { AppPopover } from "@/ui/Popover/AppPopover";
import AppText from "@/ui/Text/AppText";
import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Group,
  InputLabel,
  Modal,
  NumberInput,
  Radio,
  Select,
  SimpleGrid,
  Slider,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { WidgetProps } from "@rjsf/utils";
import {
  IconCaretDownFilled,
  IconEraser,
  IconHelp,
  IconMinus,
  IconPlus,
  IconSwitch3,
} from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";

type OrderType = "Entire Position" | "Current Order";

export function BiasTypeSwitchWidget(props: WidgetProps) {
  const [orderType, toggle] = useToggle<OrderType>([
    "Entire Position",
    "Current Order",
  ]);
  return (
    <>
      <Flex justify={"space-between"} align={"center"}>
        <AppPopover
          withArrow={false}
          width={400}
          target={(props) => ({
            children: (
              <Flex
                onMouseLeave={props.close}
                onMouseEnter={props.open}
                align={"center"}
                gap={5}
              >
                <AppText
                  style={{
                    cursor: "pointer",
                  }}
                  fz={14}
                >
                  Applicable to
                </AppText>
                <IconHelp size={14} />
              </Flex>
            ),
          })}
          dropdown={() => ({
            children: (
              <div className="space-y-20">
                <Box>
                  <AppText fw={"bold"}>Entire Position</AppText>
                  <AppText instancetype="WidthTooltipGray" fz={12}>
                    The TP/SL applies to the entire position. Once
                    this order is fully or partially filled, the TP/SL
                    order will be placed. Current Order
                  </AppText>
                </Box>
                <Box>
                  <AppText fw={"bold"}>Current Order</AppText>
                  <AppText instancetype="WidthTooltipGray">
                    Take Profit-Trigger by ROI (%)
                  </AppText>
                </Box>
              </div>
            ),
          })}
        ></AppPopover>
        <AppButton
          onClick={() => {
            toggle();
            if (orderType === "Current Order") {
              props.onChange("1");
            } else {
              props.onChange("2");
            }
          }}
          variant="transparent"
          c={"white"}
          rightSection={<IconSwitch3 color="orange" size={14} />}
        >
          {props.value === "1" ? "Entire Position" : "Current Order"}
        </AppButton>
      </Flex>
    </>
  );
}
const T = 0.00001;
// roi = ((tp - gia mua) / gia mua) * 100
const calcROI = (
  value: number,
  orderPrice: number,
  isLong = false,
) => {
  if (isLong) {
    return ((value - orderPrice) / orderPrice) * 100;
  } else {
    return ((orderPrice - value) / orderPrice) * 100;
  }
};
// tp = gia mua * (1 + ROI / 100)
const calcTP = (roi: number, orderPrice: number, isLong = false) => {
  if (isLong) {
    return orderPrice * (1 + roi / 100);
  } else {
    return orderPrice * (1 - roi / 100);
  }
};

// sl = gia mua * (1 - ROI / 100)
const calcSL = (roi: number, orderPrice: number, isLong = false) => {
  if (isLong) {
    return orderPrice * (1 - roi / 100);
  } else {
    return orderPrice * (1 + roi / 100);
  }
};

export function ProfitInputWidget(props: WidgetProps) {
  const [, setValue] = useState(props.value);
  const { orderPrice } = props.formContext.formData;
  const [type] = useState<"Long" | "Short">(
    props.formContext["formData"]?.type,
  );
  const [ROI, setROI] = useState<number>(0);

  const isLong = useMemo(() => {
    return props.formContext.formData?.type === "Long";
  }, [props.formContext.formData]);

  const isHasValue = useMemo(() => {
    return props.formContext["formData"]?.tp?.value > 0;
  }, [props.formContext]);
  const isShowAlertTP = useMemo(() => {
    const isEntire = props.formContext["formData"]?.biasType === "1";
    const isHasTPValue = props.formContext["formData"]?.tp?.value > 0;
    const isHasTPAsLimit =
      props.formContext["formData"]?.tp?.limit === true;
    if (isEntire) {
      return isHasTPValue;
    } else {
      return !isHasTPAsLimit && isHasTPValue;
    }
  }, [props.formContext]);

  const onChangePrice = useCallback(
    (v: number) => {
      props.onChange(parseFloat(v.toFixed(5)));
      const roi = calcROI(v, orderPrice, isLong);
      setROI(roi);
    },
    [props, orderPrice, isLong],
  );

  const onChangeROI = useCallback(
    (v: number) => {
      setROI(v);
      const tp = calcTP(v, orderPrice, isLong);
      props.onChange(parseFloat(tp.toFixed(5)));
    },
    [orderPrice, isLong, props],
  );

  const onTickPrice = useCallback(
    (isDecrement = false) => {
      if (Boolean(props.value) && props.value > 0) {
        const v = parseFloat(props.value);
        const tp = isDecrement ? v - T : v + T;
        const roi = calcROI(tp, orderPrice, isLong);
        setROI(parseFloat(roi.toFixed(2)));

        props.onChange(parseFloat(tp.toFixed(5)));
      }
    },
    [props, orderPrice, isLong],
  );

  return (
    <>
      <Box>
        <Box className="space-y-6">
          <Box className="space-y-10">
            <Box>
              <Grid columns={12} gutter={10}>
                <Grid.Col span={8}>
                  <NumberInput
                    size="lg"
                    withErrorStyles={false}
                    rightSectionWidth={150}
                    placeholder="Trigger Price"
                    value={props.value}
                    onChange={(v) => onChangePrice(v as number)}
                    rightSection={
                      <Flex
                        align={"center"}
                        gap={0}
                        justify={"end"}
                        w={"100%"}
                      >
                        {isHasValue && (
                          <Flex align={"center"}>
                            <ActionIcon
                              variant="transparent"
                              onClick={() => {
                                setValue("");
                                props.onChange("");
                                setROI(0);
                              }}
                            >
                              <IconEraser size={16} />
                            </ActionIcon>
                          </Flex>
                        )}
                        <Flex align={"center"}>
                          <ActionIcon
                            variant="transparent"
                            styles={{
                              root: {},
                            }}
                            onClick={() => onTickPrice(true)}
                          >
                            <IconMinus size={16} />
                          </ActionIcon>
                        </Flex>
                        <Box>
                          <Box h={14} w={1} bg={"gray"}></Box>
                        </Box>
                        <Flex align={"center"}>
                          <ActionIcon
                            variant="transparent"
                            onClick={() => onTickPrice()}
                          >
                            <IconPlus size={16} />
                          </ActionIcon>
                        </Flex>
                        <Flex flex={"0 0 60px"}>
                          <Select
                            data={["Last", "Index", "Mark"]}
                            defaultValue="Last"
                            withCheckIcon={false}
                            rightSection={
                              <IconCaretDownFilled size={14} />
                            }
                            rightSectionWidth={30}
                            allowDeselect={false}
                            size="xs"
                            classNames={{
                              root: "app-select",
                              option: "app-select-option",
                              input: "app-select--input",
                              section: "app-select--section",
                            }}
                            comboboxProps={{
                              position: "bottom-start",
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
                              },
                              option: {
                                fontSize: "12px",
                              },
                            }}
                          />
                        </Flex>
                      </Flex>
                    }
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <NumberInput
                    size="lg"
                    withErrorStyles={false}
                    placeholder="ROI"
                    value={ROI}
                    onChange={(v) => onChangeROI(v as number)}
                    rightSection={<>%</>}
                  />
                </Grid.Col>
              </Grid>
              {type === "Long" ? (
                <Box>
                  <InputLabel fz={12} c={"gray"} color="gray">
                    The Take Profit price must be lower than the order
                    price
                  </InputLabel>
                </Box>
              ) : (
                ""
              )}
            </Box>
            <Box h={40}>
              <Slider
                w={"100%"}
                color="primary"
                thumbSize={14}
                max={150}
                value={ROI}
                showLabelOnHover={false}
                onChange={onChangeROI}
                marks={[
                  { value: 0, label: "0" },
                  { value: 50, label: "50%" },
                  { value: 100, label: "100%" },
                  { value: 150, label: "150%" },
                ]}
                styles={{
                  trackContainer: {
                    width: "calc(100% - 10px)",
                  },
                  label: {},
                  markLabel: {
                    fontSize: "10px",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        {isShowAlertTP && (
          <Alert
            variant="light"
            color="gray"
            fz={12}
            p={10}
            styles={{
              message: {
                color: "rgba(255,255,255,0.6)",
                fontSize: "10px",
                padding: "0px",
              },
            }}
          >
            <div className="text-label-alert">
              Index Price to 0.5696 will trigger market Take Profit
              order; your expected profit will be 7,091.7863 USDC
              (ROI: 132.43%)
            </div>
          </Alert>
        )}
        <Box h={1} w={"100%"} bg={"gray"}></Box>
      </Box>
    </>
  );
}

export function StopLossInputWidget(props: WidgetProps) {
  const { orderPrice } = props.formContext.formData;

  const isLong = useMemo(() => {
    return props.formContext.formData?.type === "Long";
  }, [props.formContext.formData]);

  const isHasValue = useMemo(() => {
    return props.formContext["formData"]?.sl?.value > 0;
  }, [props.formContext]);
  const [ROI, setROI] = useState<number>(0);

  const isHasTPAsLimit = useMemo(() => {
    return props.formContext["formData"]?.sl?.limit === true;
  }, [props.formContext]);

  const isShowAlertSL = useMemo(() => {
    const isEntire = props.formContext["formData"]?.biasType === "1";
    if (isEntire) {
      return isHasValue;
    } else {
      return !isHasTPAsLimit && isHasValue;
    }
  }, [isHasTPAsLimit, isHasValue, props.formContext]);

  const onChangePrice = useCallback(
    (v: number) => {
      props.onChange(parseFloat(v.toFixed(5)));
      const roi = calcROI(v, orderPrice, isLong);
      setROI(roi);
    },
    [props, orderPrice, isLong],
  );

  const onChangeROI = useCallback(
    (v: number) => {
      setROI(v);
      const sl = calcSL(v, orderPrice, isLong);
      props.onChange(parseFloat(sl.toFixed(5)));
    },
    [orderPrice, isLong, props],
  );

  const onTickPrice = useCallback(
    (isDecrement = false) => {
      if (Boolean(props.value) && props.value > 0) {
        const v = parseFloat(props.value);
        const sl = isDecrement ? v - T : v + T;
        const roi = calcROI(sl, orderPrice, isLong);
        setROI(parseFloat(roi.toFixed(2)));
        props.onChange(parseFloat(sl.toFixed(5)));
      }
    },
    [props, orderPrice, isLong],
  );

  return (
    <>
      <Box className="space-y-6">
        <Box className="space-y-10">
          <Grid columns={12} gutter={10}>
            <Grid.Col span={8}>
              <NumberInput
                size="lg"
                value={props.value}
                onChange={(v) => onChangePrice(v as number)}
                withErrorStyles={false}
                rightSectionWidth={150}
                placeholder="Trigger Price"
                rightSection={
                  <Flex
                    align={"center"}
                    gap={2}
                    justify={"end"}
                    w={"100%"}
                  >
                    <Flex align={"center"}>
                      {isHasValue && (
                        <ActionIcon
                          variant="transparent"
                          onClick={() => {
                            props.onChange("");
                            setROI(0);
                          }}
                        >
                          <IconEraser size={16} />
                        </ActionIcon>
                      )}
                    </Flex>
                    <Flex align={"center"}>
                      <ActionIcon
                        variant="transparent"
                        styles={{
                          root: {},
                        }}
                        onClick={() => onTickPrice(true)}
                      >
                        <IconMinus size={16} />
                      </ActionIcon>
                    </Flex>
                    <Box>
                      <Box h={14} w={1} bg={"gray"}></Box>
                    </Box>
                    <Flex align={"center"}>
                      <ActionIcon
                        variant="transparent"
                        onClick={() => onTickPrice()}
                      >
                        <IconPlus size={16} />
                      </ActionIcon>
                    </Flex>
                    <Flex flex={"0 0 60px"}>
                      <Select
                        data={["Last", "Index", "Mark"]}
                        defaultValue="Last"
                        withCheckIcon={false}
                        rightSection={
                          <IconCaretDownFilled size={14} />
                        }
                        rightSectionWidth={30}
                        allowDeselect={false}
                        size="xs"
                        classNames={{
                          root: "app-select",
                          option: "app-select-option",
                          section: "app-select--section",
                          input: "app-select--input",
                        }}
                        comboboxProps={{
                          position: "bottom-start",
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
                          },
                          option: {
                            fontSize: "12px",
                          },
                        }}
                      />
                    </Flex>
                  </Flex>
                }
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                size="lg"
                withErrorStyles={false}
                placeholder="Decrease"
                onChange={(v) => onChangeROI(v as number)}
                value={ROI}
                rightSection={<>%</>}
              />
            </Grid.Col>
          </Grid>
          <Box h={40}>
            <Slider
              w={"100%"}
              color="primary"
              thumbSize={14}
              max={10}
              showLabelOnHover={false}
              onChange={onChangeROI}
              value={ROI}
              marks={[
                { value: 0, label: "0" },
                { value: 5, label: "5%" },
                { value: 10, label: "10%" },
              ]}
              styles={{
                trackContainer: {
                  width: "calc(100% - 10px)",
                },
                label: {},
                markLabel: {
                  fontSize: "10px",
                },
              }}
            />
          </Box>
        </Box>
        {isShowAlertSL && (
          <Alert
            variant="light"
            color="gray"
            fz={12}
            p={10}
            styles={{
              message: {
                color: "rgba(255,255,255,0.6)",
                fontSize: "10px",
                padding: "0px",
              },
            }}
          >
            <div className="text-label-alert">
              Last Traded Price to 0.00100 will trigger market Stop
              Loss order; your expected profit will be 250,179.7676
              USDT (ROI: 1,000.00%)
            </div>
          </Alert>
        )}
      </Box>
    </>
  );
}

export function OrderPriceTPInputWidget(props: WidgetProps) {
  return (
    <>
      <NumberInput
        size="lg"
        onChange={(v) => props.onChange(v)}
        withErrorStyles={false}
        rightSectionWidth={50}
        rightSection={<AppText fz={10}>USDT</AppText>}
        placeholder="Order Price"
      />
      <Space h={10} />
      <Alert
        variant="light"
        color="gray"
        fz={12}
        p={10}
        styles={{
          message: {
            color: "rgba(255,255,255,0.6)",
            fontSize: "10px",
            padding: "0px",
          },
        }}
      >
        <div className="space-y-10">
          <Flex gap={10} align={"flex-start"}>
            <div>
              <span className="badge-bg">1</span>
            </div>
            <span className="text-label-alert">
              Last Traded Price to 0.00057 USDT will trigger a Limit
              Take Profit order at -- USDT.
            </span>
          </Flex>
          <Flex gap={10} align={"flex-start"}>
            <div>
              <span className="badge-bg">2</span>
            </div>
            <span className="text-label-alert">
              Your expected profit will be -- USDT. (ROI: --%)
            </span>
          </Flex>
        </div>
      </Alert>
      <Space h={10} />
      <AppText className="text-hint">
        * Limit TP/SL orders will only be filled at the specified
        price, but there is a risk that the order may not be filled.
      </AppText>
    </>
  );
}

export function OrderPriceSLInputWidget(props: WidgetProps) {
  return (
    <>
      <NumberInput
        size="lg"
        onChange={(v) => props.onChange(v)}
        withErrorStyles={false}
        rightSectionWidth={50}
        rightSection={<AppText fz={10}>USDT</AppText>}
        placeholder="Order Price"
      />
      <Space h={10} />
      <Alert
        variant="light"
        color="gray"
        fz={12}
        p={10}
        styles={{
          message: {
            color: "rgba(255,255,255,0.6)",
            fontSize: "10px",
            padding: "0px",
          },
        }}
      >
        <div className="space-y-10">
          <Flex gap={10} align={"flex-start"}>
            <div>
              <span className="badge-bg">1 </span>
            </div>
            <span className="text-label-alert">
              Last Traded Price to 0.00100 USDT will trigger a Limit
              Stop Loss order at -- USDT.
            </span>
          </Flex>
          <Flex gap={10} align={"flex-start"}>
            <div>
              <span className="badge-bg">2</span>
            </div>
            <span className="text-label-alert">
              Your expected profit will be -- USDT. (ROI: --%)
            </span>
          </Flex>
        </div>
      </Alert>
      <Space h={10} />
      <AppText className="text-hint">
        * Limit TP/SL orders will only be filled at the specified
        price, but there is a risk that the order may not be filled.
      </AppText>
    </>
  );
}

export function TpAndSlSettingsWidget(props: WidgetProps) {
  const [value, setValue] = useState<string | null>("1");
  const [opened, { open, close }] = useDisclosure(false);
  const openTPSLSettings = () => {
    open();
  };
  const [options] = useState([
    {
      name: "Trigger by ROI (%)",
      description: `
            Please enter your desired ROI (%) to calculate the trigger price of TP/SL.`,
      value: 1,
    },
    {
      name: "Trigger by Change %",
      description:
        "Please enter your preferred TP/SL trigger price, or select a percentage increase or decrease of the entry price to calculate it.",
      value: 2,
    },
    {
      name: "Trigger by P&L NEW",
      description:
        "Please enter your expected profit or loss to calculate the trigger price of TP/SL.",
      value: 3,
    },
  ]);

  const optionAsLabel = useMemo(() => {
    return (
      options.find((i) => i.value.toString() === value)?.name ?? "--"
    );
  }, [options, value]);

  return (
    <>
      <Flex align={"center"} gap={5}>
        <AppText
          className="cursor-pointer"
          onClick={openTPSLSettings}
          fz={14}
        >
          {props.label} {optionAsLabel.replace("Trigger by", "")}
        </AppText>
        <IconCaretDownFilled size={12} />
      </Flex>
      <Modal
        opened={opened}
        onClose={close}
        title="TP/SL Settings"
        centered
      >
        <Radio.Group
          value={value}
          onChange={(v) => {
            setValue(v);
          }}
        >
          <Stack pt="md" gap="xs">
            {options.map((item) => (
              <Radio.Card
                radius="md"
                bd={0}
                value={item.value.toString()}
                key={item.value}
              >
                <Group wrap="nowrap" align="flex-start">
                  <Radio.Indicator />
                  <div className="space-y-4">
                    <Text fw={"bolder"} mb={2}>
                      {item.name}
                    </Text>
                    <Text fz={"xs"}>{item.description}</Text>
                  </div>
                </Group>
              </Radio.Card>
            ))}
          </Stack>
        </Radio.Group>
        <Box mt={"lg"}></Box>
        <InputLabel>
          <Text display={"inline"} c={"red"}>
            *
          </Text>{" "}
          The selected TP/SL trigger method will be applicable to all
          newly placed and modified TP/SL orders.
        </InputLabel>
        <SimpleGrid cols={2}>
          <Button
            fullWidth
            onClick={() => {
              close();
              props.onChange(value);
            }}
            mt="md"
          >
            Confirm
          </Button>
          <Button
            fullWidth
            onClick={() => close()}
            mt="md"
            bg={"gray"}
          >
            Cancel
          </Button>
        </SimpleGrid>
      </Modal>
    </>
  );
}

export function CheckLimitTpAndSlWidget(props: WidgetProps) {
  const [checked, setChecked] = useState<boolean>(props.value);
  return (
    <>
      <Flex justify={"space-between"} h={"100%"}>
        <Box></Box>
        <Flex align={"center"}>
          <Checkbox
            m={0}
            p={0}
            size="xs"
            label="Limit"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              props.onChange(!checked);
            }}
          />
        </Flex>
      </Flex>
    </>
  );
}
