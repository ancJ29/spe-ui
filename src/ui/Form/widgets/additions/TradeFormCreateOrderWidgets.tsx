
import AppButton from "@/ui/Button/AppButton";
import { AppPopover } from "@/ui/Popover/AppPopover";
import AppText from "@/ui/Text/AppText";
import { ActionIcon, Badge, Box, Checkbox, Chip, Flex, Image, InputLabel, Menu, Modal, NumberInput, SegmentedControl, Select, SimpleGrid, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { WidgetProps } from "@rjsf/utils";
import { IconArrowBackUp, IconCaretDownFilled, IconEdit, IconEraser, IconLetterC, IconMinus, IconPlus, IconPlusMinus } from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AddTpSlOfTradeForm } from "@/ui/GridLayout/components";
import Decimal from "decimal.js";
import { IChangeEvent } from "@rjsf/core";



export function TriggerPriceWidget(props: WidgetProps) {
  const changeByLast = useCallback(() => {
    props.onChange(Math.floor(Math.random() * 100));
  }, [props.value]);

  const changeBySymbol = useCallback((v: string) => {
    if (["DEL", "BACK"].includes(v)) {
      props.onChange(0.1);
    } else {
      const num = new Decimal(parseFloat(v));
      console.log("NUM", num);
      const n = props.value ?? 0
      const val = num.plus(n);
      const _v = parseFloat(val.toString());
      if (_v < 0) {
        props.onChange(0.1);
      } else {
        props.onChange(_v);
      }
    }
  }, [props.value]);

  return (
    <>
      <NumberInput
        label={props.label}
        classNames={{
          label: "text-label-form"
        }}
        thousandSeparator=","
        decimalSeparator="."
        rightSectionWidth={80}
        value={props.value}
        onChange={(_value) => {
          props.onChange(_value);
        }}
        rightSection={
          <Flex align={"center"} gap={8}>
            <AppPopover
              withArrow={false}
              width={"auto"}
              target={(props) => ({
                children: (
                  <AppText
                    onClick={changeByLast}
                    onMouseLeave={props.close}
                    style={{
                      cursor: "pointer",
                    }}
                    onMouseEnter={props.open}
                    fz={12}
                    c={"primary"}
                    fw={"bold"}
                  >
                    Last
                  </AppText>
                ),
              })}
              dropdown={() => ({
                children: (
                  <div>
                    <AppText instancetype="WithTextTooltip">
                      Fill in the last traded price
                    </AppText>
                  </div>
                ),
              })}
            ></AppPopover>
            <Box h={14} w={1} bg={"gray"}></Box>
            <Menu
              width={140}
              withinPortal
              offset={0}
              position="bottom-end"
            >
              <Menu.Target>
                <AppButton instancetype="Ghost" px={0}>
                  <IconPlusMinus size={18} color="white" />
                </AppButton>
              </Menu.Target>
              <Menu.Dropdown
                styles={{
                  dropdown: {
                    padding: 0,
                    border: "none",
                    borderRadius: 0,
                  },
                }}
              >
                <SimpleGrid
                  cols={2}
                  bg={"gray.8"}
                  styles={{
                    root: {
                      gap: 1,
                    },
                  }}
                >
                  {["0.1", "-0.1", "+5", "-5", "+25", "-25", "+100", "-100", "DEL", "BACK"].map(
                    (_, i) => (
                      <Flex
                        py={4}
                        align={"center"}
                        justify={"center"}
                        key={i}
                        bg={"dark"}
                        className="cursor-pointer"
                        onClick={() => changeBySymbol(_)}
                      >
                        {
                          _ === "DEL" ? <IconLetterC size={17} /> :
                            _ === "BACK" ? <IconArrowBackUp size={17} /> :
                              _ === "0.1" ? <IconPlus size={17} /> :
                                _ === "-0.1" ? <IconMinus size={17} /> :
                                  <AppText
                                    className="textMainHover cursor-pointer"
                                    style={{ textAlign: "center" }}
                                    w={"100%"}
                                  >
                                    {_}
                                  </AppText>
                        }

                      </Flex>
                    ),
                  )}
                </SimpleGrid>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        }
      />
    </>
  );
}

export function TriggerPriceNoLastWidget(props: WidgetProps) {
  const changeBySymbol = useCallback((v: string) => {
    if (["DEL", "BACK"].includes(v)) {
      props.onChange(0.1);
    } else {
      const num = new Decimal(parseFloat(v));
      console.log("NUM", num);
      const n = props.value ?? 0
      const val = num.plus(n);
      const _v = parseFloat(val.toString());
      if (_v < 0) {
        props.onChange(0.1);
      } else {
        props.onChange(_v);
      }
    }
  }, [props.value]);

  return (
    <>
      <NumberInput
        label={props.label}
        classNames={{
          label: "text-label-form"
        }}
        thousandSeparator=","
        decimalSeparator="."
        rightSectionWidth={40}
        value={props.value}
        onChange={(_value) => {
          props.onChange(_value);
        }}
        rightSection={
          <Flex align={"center"} gap={8} justify={"end"} w={"100%"} pr={"8px"}>
            <Menu
              width={140}
              withinPortal
              offset={0}
              position="bottom-end"
            >
              <Menu.Target>
                <AppButton instancetype="Ghost" px={0}>
                  <IconPlusMinus size={18} color="white" />
                </AppButton>
              </Menu.Target>
              <Menu.Dropdown
                styles={{
                  dropdown: {
                    padding: 0,
                    border: "none",
                    borderRadius: 0,
                  },
                }}
              >
                <SimpleGrid
                  cols={2}
                  bg={"gray.8"}
                  styles={{
                    root: {
                      gap: 1,
                    },
                  }}
                >
                  {["0.1", "-0.1", "+5", "-5", "+25", "-25", "+100", "-100", "DEL", "BACK"].map(
                    (_, i) => (
                      <Flex
                        py={4}
                        align={"center"}
                        justify={"center"}
                        key={i}
                        bg={"dark"}
                        className="cursor-pointer"
                        onClick={() => changeBySymbol(_)}
                      >
                        {
                          _ === "DEL" ? <IconLetterC size={17} /> :
                            _ === "BACK" ? <IconArrowBackUp size={17} /> :
                              _ === "0.1" ? <IconPlus size={17} /> :
                                _ === "-0.1" ? <IconMinus size={17} /> :
                                  <AppText
                                    className="textMainHover cursor-pointer"
                                    style={{ textAlign: "center" }}
                                    w={"100%"}
                                  >
                                    {_}
                                  </AppText>
                        }

                      </Flex>
                    ),
                  )}
                </SimpleGrid>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        }
      />
    </>
  );
}

export function OrderPriceWidget(props: WidgetProps) {
  const changeByLast = useCallback(() => {
    props.onChange(Math.floor(Math.random() * 100));
  }, [props.value]);

  const changeBySymbol = useCallback((v: string) => {
    if (["DEL", "BACK"].includes(v)) {
      props.onChange(0.1);
    } else {
      const num = new Decimal(parseFloat(v));
      console.log("NUM", num);
      const val = num.plus(props.value);
      const _v = parseFloat(val.toString());
      if (_v < 0) {
        props.onChange(0.1);
      } else {
        props.onChange(_v);
      }
    }
  }, [props.value]);

  return (
    <>
      <NumberInput
        label="Order Price"
        classNames={{
          label: "text-label-form"
        }}
        thousandSeparator=","
        decimalSeparator="."
        rightSectionWidth={80}
        value={props.value}
        onChange={(_value) => {
          props.onChange(_value.toString());
        }}
        rightSection={
          <Flex align={"center"} gap={8}>
            <AppPopover
              withArrow={false}
              width={"auto"}
              target={(props) => ({
                children: (
                  <AppText
                    onClick={changeByLast}
                    onMouseLeave={props.close}
                    style={{
                      cursor: "pointer",
                    }}
                    onMouseEnter={props.open}
                    fz={12}
                    c={"primary"}
                    fw={"bold"}
                  >
                    Last
                  </AppText>
                ),
              })}
              dropdown={() => ({
                children: (
                  <div>
                    <AppText instancetype="WithTextTooltip">
                      Fill in the last traded price
                    </AppText>
                  </div>
                ),
              })}
            ></AppPopover>
            <Box h={14} w={1} bg={"gray"}></Box>
            <Menu
              width={140}
              withinPortal
              offset={0}
              position="bottom-end"
            >
              <Menu.Target>
                <AppButton instancetype="Ghost" px={0}>
                  <IconPlusMinus size={18} color="white" />
                </AppButton>
              </Menu.Target>
              <Menu.Dropdown
                styles={{
                  dropdown: {
                    padding: 0,
                    border: "none",
                    borderRadius: 0,
                  },
                }}
              >
                <SimpleGrid
                  cols={2}
                  bg={"gray.8"}
                  styles={{
                    root: {
                      gap: 1,
                    },
                  }}
                >
                  {["0.1", "-0.1", "+5", "-5", "+25", "-25", "+100", "-100", "DEL", "BACK"].map(
                    (_, i) => (
                      <Flex
                        py={4}
                        align={"center"}
                        justify={"center"}
                        key={i}
                        bg={"dark"}
                        className="cursor-pointer"
                        onClick={() => changeBySymbol(_)}
                      >
                        {
                          _ === "DEL" ? <IconLetterC size={17} /> :
                            _ === "BACK" ? <IconArrowBackUp size={17} /> :
                              _ === "0.1" ? <IconPlus size={17} /> :
                                _ === "-0.1" ? <IconMinus size={17} /> :
                                  <AppText
                                    className="textMainHover cursor-pointer"
                                    style={{ textAlign: "center" }}
                                    w={"100%"}
                                  >
                                    {_}
                                  </AppText>
                        }

                      </Flex>
                    ),
                  )}
                </SimpleGrid>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        }
      />
    </>
  );
}

export function OrderPriceConditionalWidget(props: WidgetProps) {
  const changeByLast = useCallback(() => {
    props.onChange(Math.floor(Math.random() * 100));
  }, [props.value]);

  const changeBySymbol = useCallback((v: string) => {
    if (["DEL", "BACK"].includes(v)) {
      props.onChange(0.1);
    } else {
      const num = new Decimal(parseFloat(v));
      console.log("NUM", num);
      const n = props.value ?? 0
      const val = num.plus(n);
      const _v = parseFloat(val.toString());
      if (_v < 0) {
        props.onChange(0.1);
      } else {
        props.onChange(_v);
      }
    }
  }, [props.value]);

  return (
    <>
      <NumberInput
        label={props.label}
        classNames={{
          label: "text-label-form"
        }}
        thousandSeparator=","
        decimalSeparator="."
        rightSectionWidth={80}
        value={props.value}
        readOnly={props.readonly}
        disabled={props.readonly}
        onChange={(_value) => {
          props.onChange(_value.toString());
        }}
        rightSection={
          <>
            {!props.readonly && <Flex align={"center"} gap={8}>
              <AppPopover
                withArrow={false}
                width={"auto"}
                target={(props) => ({
                  children: (
                    <AppText
                      onClick={changeByLast}
                      onMouseLeave={props.close}
                      style={{
                        cursor: "pointer",
                      }}
                      onMouseEnter={props.open}
                      fz={12}
                      c={"primary"}
                      fw={"bold"}
                    >
                      Last
                    </AppText>
                  ),
                })}
                dropdown={() => ({
                  children: (
                    <div>
                      <AppText instancetype="WithTextTooltip">
                        Fill in the last traded price
                      </AppText>
                    </div>
                  ),
                })}
              ></AppPopover>
              <Box h={14} w={1} bg={"gray"}></Box>
              <Menu
                width={140}
                withinPortal
                offset={0}
                position="bottom-end"
              >
                <Menu.Target>
                  <AppButton instancetype="Ghost" px={0}>
                    <IconPlusMinus size={18} color="white" />
                  </AppButton>
                </Menu.Target>
                <Menu.Dropdown
                  styles={{
                    dropdown: {
                      padding: 0,
                      border: "none",
                      borderRadius: 0,
                    },
                  }}
                >
                  <SimpleGrid
                    cols={2}
                    bg={"gray.8"}
                    styles={{
                      root: {
                        gap: 1,
                      },
                    }}
                  >
                    {["0.1", "-0.1", "+5", "-5", "+25", "-25", "+100", "-100", "DEL", "BACK"].map(
                      (_, i) => (
                        <Flex
                          py={4}
                          align={"center"}
                          justify={"center"}
                          key={i}
                          bg={"dark"}
                          className="cursor-pointer"
                          onClick={() => changeBySymbol(_)}
                        >
                          {
                            _ === "DEL" ? <IconLetterC size={17} /> :
                              _ === "BACK" ? <IconArrowBackUp size={17} /> :
                                _ === "0.1" ? <IconPlus size={17} /> :
                                  _ === "-0.1" ? <IconMinus size={17} /> :
                                    <AppText
                                      className="textMainHover cursor-pointer"
                                      style={{ textAlign: "center" }}
                                      w={"100%"}
                                    >
                                      {_}
                                    </AppText>
                          }

                        </Flex>
                      ),
                    )}
                  </SimpleGrid>
                </Menu.Dropdown>
              </Menu>
            </Flex>}
          </>
        }
      />
    </>
  );
}

export function VolumeInputFieldWidget(props: WidgetProps) {
  return (
    <>
      <Box className="space-y-10">
        <NumberInput
          thousandSeparator=","
          decimalSeparator="."
          classNames={{
            label: "text-label-form"
          }}
          label="Order by Value"
          value={props.value}
          onChange={(_value) => {
            props.onChange(_value.toString());
          }}
          rightSectionWidth={60}
          rightSection={
            <AppText fz={12} fw={"bold"}>
              USDC
            </AppText>
          }
        ></NumberInput>


      </Box>
    </>
  );
}

export function LeverageWidget(props: WidgetProps) {
  const options = useMemo(() => {
    return props.schema?.enum?.map(item => `${item?.toString()}%`) ?? [];
  }, [props.schema.enum]);
  return (
    <>
      <Box>
        <SegmentedControl
          value={`${props.value}%`}
          onChange={v => {
            props.onChange(parseFloat(v));
          }}
          className="control-segment-percent"
          w={"100%"}
          h={25}
          data={options}
          size="xs"
          styles={{
            label: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              fontSize: "10px",
            },
            indicator: {},
            innerLabel: {
              height: "100%",
              fontSize: "12px",
            },
          }}
          withItemsBorders={false}
        />
      </Box>
    </>
  );
}

export function calcInfoPriceWidget(props: WidgetProps) {
  return (
    <>
      <Box
        className="space-y-10"
        bd={"solid 1px var(--mantine-color-gray-8)"}
        px={10}
        py={10}
        style={{ borderRadius: "4px" }}
      >
        <Flex justify={"space-between"}>
          <InputLabel className="text-label-form">Qty</InputLabel>
          <Flex fz={12} fw={"bold"} gap={4}>
            <AppText fz={12} c={"green"}>
              122,495{" "}
            </AppText>{" "}
            /{" "}
            <AppText fz={12} c={"red"}>
              122,495
            </AppText>{" "}
            XRP
          </Flex>
        </Flex>
        <Flex justify={"space-between"}>
          <InputLabel className="text-label-form">Cost</InputLabel>
          <Flex fz={12} fw={"bold"} gap={4}>
            <AppText fz={12} c={"green"}>
              135.9056
            </AppText>
            /{" "}
            <AppText fz={12} c={"red"}>
              65,929.2886
            </AppText>{" "}
            &nbsp; USDC
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export function TimeInForceWidget(props: WidgetProps) {
  console.log(props.schema.enum);
  return (
    <>
      <Box>
        <Select
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
            },
            option: {
              fontSize: "12px",
            },
          }}
        />
      </Box>
    </>
  );
}

export function PostOnlyWidget(props: WidgetProps) {
  return (
    <>
      <Box className="space-y-10">
        <Checkbox
          checked={props.value}
          onChange={(event) => {
            props.onChange(event.currentTarget.checked);
          }}
          label={
            <>
              <AppPopover
                withArrow={false}
                position="bottom-start"
                target={(_props) => ({
                  children: (
                    <InputLabel
                      onClick={() => props.onChange(!props.value)}
                      onMouseLeave={_props.close}
                      onMouseEnter={_props.open}
                      className="text-label-form"
                    >
                      Post-Only
                    </InputLabel>
                  ),
                })}
                dropdown={() => ({
                  children: (
                    <div>
                      <AppText instancetype="WithTextTooltip">
                        The Post-Only order will only be executed
                        as a maker order. If it can be executed
                        immediately canceled
                      </AppText>
                    </div>
                  ),
                })}
              ></AppPopover>
            </>
          }
        />
      </Box>
    </>
  );
}

export function ReduceOnlyWidget(props: WidgetProps) {
  return (
    <>
      <Box className="space-y-10">
        <Checkbox
          checked={props.value}
          onChange={(event) => {
            props.onChange(event.currentTarget.checked);
          }}
          label={
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
                      Reduce-Only
                    </InputLabel>
                  ),
                })}
                dropdown={() => ({
                  children: (
                    <div>
                      <AppText instancetype="WithTextTooltip">
                        The reduce-only order will only reduce
                        your position size. Any order that might
                        increase your position size will be
                        canceled or adjusted
                      </AppText>
                    </div>
                  ),
                })}
              ></AppPopover>
            </>
          }
        />
      </Box>
    </>
  );
}

export function TPandSLModalWidget(props: WidgetProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState<any>(null);

  const onOpenModal = useCallback(() => {
    open();
  }, [open]);

  const onSubmit = useCallback((res: IChangeEvent) => {
    // eslint-disable-next-line no-console
    console.log("TPandSLModalWidget", res.formData);
    setData(res.formData);
    close();
  }, [props.value]);

  const isHasTpOrSl: { isLong: boolean, isSet: boolean } = useMemo(() => {
    const isSet = data?.tp?.value > 0 || data?.sl?.value > 0;
    const isLong = data?.type === "Long";
    return {
      isSet,
      isLong
    };
  }, [data]);

  useEffect(() => {
    props.onChange(isHasTpOrSl.isSet);
  }, [isHasTpOrSl]);


  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Add TP/SL"
        centered
        size={440}
        closeOnClickOutside={false}
      >
        <AddTpSlOfTradeForm
          orderPrice={0.4907}
          onSubmit={onSubmit}
          onClose={close}
        />
      </Modal>

      <Box>
        <Flex justify={"space-between"} align={"center"}>
          <Box>
            <Flex justify={"start"} align={"center"} gap={10}>
              <Checkbox
                checked={props.value}
                onChange={onOpenModal}
                label="Take Profit / Stop Loss"
                styles={{
                  label: {
                    fontSize: "12px",
                  },
                }}
              />
              {
                isHasTpOrSl.isSet && (
                  <>
                    <Badge size="sm" variant="light" color={isHasTpOrSl.isLong ? "#23b26b" : "#f0444b"}>
                      {isHasTpOrSl.isLong ? "Long" : "Short"}
                    </Badge>
                  </>
                )
              }
            </Flex>
          </Box>
          <Box className="cursor-pointer" onClick={onOpenModal}>
            {isHasTpOrSl.isSet && <IconEdit size={16} />}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export function CheckBoxTpAndSlWidget(props: WidgetProps) {
  return (
    <>
      <Box>
        <Checkbox
          checked={props.value}
          onChange={(event) => {
            props.onChange(event.currentTarget.checked);
          }}
          label="Take Profit / Stop Loss"
          styles={{
            label: {
              fontSize: "12px",
            },
          }}
        />
      </Box>
    </>
  );
}

export function TakeProfitWidget(props: WidgetProps) {
  const isHasValue = useMemo(() => {
    return Boolean(props.value) === true;
  }, [props.value]);
  const onTickPrice = useCallback(
    (isDecrement = false) => {
      const T = 0.00001;
      if (Boolean(props.value) && props.value > 0) {
        const v = parseFloat(props.value);
        const num = new Decimal(v);
        const tp = isDecrement ? num.minus(T) : num.plus(T);
        props.onChange(parseFloat(tp.toString()));
      }
    },
    [props.value],
  );
  return (
    <>
      <NumberInput
        withErrorStyles={false}
        rightSectionWidth={80}
        label="Profit"
        placeholder="Trigger Price"
        value={props.value}
        onChange={(v) => props.onChange(v as number)}
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
                    props.onChange("");
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
          </Flex>
        }
      />
    </>
  );
}


export function TakeProfitTriggerByWidget(props: WidgetProps) {
  console.log("props.label ", props.label);
  return (
    <>
      <Box h={"100%"} w={"100%"}>
        <Select
          label={props.label ? props.label : " "}
          onChange={v => props.onChange(v)}
          data={props.schema.enum as string[]}
          value={props.value}
          withCheckIcon={false}
          rightSection={
            <IconCaretDownFilled size={14} />
          }
          rightSectionWidth={30}
          allowDeselect={false}
          classNames={{
            root: "app-select--root",
            option: "app-select-option",
            input: "app-select--input",
            section: "app-select--section",
          }}
          comboboxProps={{
            position: "bottom-end",
            offset: 0,
            withinPortal: true,
          }}
          styles={{
            label: {
              fontSize: "12px"
            },
            wrapper: {
              // height: "100%"
            },
            root: {
              // height: "100%"
            },
            input: {
              border: "none",
              fontSize: "12px",
              textAlign: "center",
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              // height: "100%"
            },
            option: {
              fontSize: "12px",
            },
          }}
        />
      </Box>
    </>
  );
}

export function OrderByPriceByWidget(props: WidgetProps) {
  const { formContext: { updateFormData, formData, updateField } } = props;
  useEffect(() => {
    console.log("VALUESSSS", props);
    updateField("type", props.value);
  }, [props.value]);
  return (
    <>
      <Box h={"100%"} w={"100%"}>
        <Select
          label={props.label ? props.label : " "}
          onChange={v => props.onChange(v)}
          data={props.schema.enum as string[]}
          value={props.value}
          withCheckIcon={false}
          rightSection={
            <IconCaretDownFilled size={14} />
          }
          rightSectionWidth={30}
          allowDeselect={false}
          classNames={{
            root: "app-select--root",
            option: "app-select-option",
            input: "app-select--input",
            section: "app-select--section",
          }}
          comboboxProps={{
            position: "bottom-end",
            offset: 0,
            withinPortal: true,
          }}
          styles={{
            label: {
              fontSize: "12px"
            },
            wrapper: {
              // height: "100%"
            },
            root: {
              // height: "100%"
            },
            input: {
              border: "none",
              fontSize: "12px",
              textAlign: "center",
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              // height: "100%"
            },
            option: {
              fontSize: "12px",
            },
          }}
        />
      </Box>
    </>
  );
}

export function StopLossWidget(props: WidgetProps) {
  const isHasValue = useMemo(() => {
    return Boolean(props.value) === true;
  }, [props.value]);
  const onTickPrice = useCallback(
    (isDecrement = false) => {
      const T = 0.00001;
      if (Boolean(props.value) && props.value > 0) {
        const v = parseFloat(props.value);
        const num = new Decimal(v);
        const tp = isDecrement ? num.minus(T) : num.plus(T);
        props.onChange(parseFloat(tp.toString()));
      }
    },
    [props.value],
  );
  return (
    <>
      <NumberInput
        withErrorStyles={false}
        rightSectionWidth={80}
        label="Stop Loss"
        placeholder="Trigger Price"
        value={props.value}
        onChange={(v) => props.onChange(v as number)}
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
                    props.onChange(undefined); // remove in json
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
          </Flex>
        }
      />
    </>
  );
}

export function StopLossTriggerByWidget(props: WidgetProps) {
  return (
    <>
      <Box h={"100%"} w={"100%"}>
        <Select
          label="Trigger Price"
          onChange={v => props.onChange(v)}
          data={props.schema.enum as string[]}
          value={props.value}
          withCheckIcon={false}
          rightSection={
            <IconCaretDownFilled size={14} />
          }
          rightSectionWidth={30}
          allowDeselect={false}
          classNames={{
            root: "app-select--root",
            option: "app-select-option",
            input: "app-select--input",
            section: "app-select--section",
          }}
          comboboxProps={{
            position: "bottom-end",
            offset: 0,
            withinPortal: true,
          }}
          styles={{
            label: {
              fontSize: "12px"
            },
            wrapper: {
              // height: "100%"
            },
            root: {
              // height: "100%"
            },
            input: {
              border: "none",
              fontSize: "12px",
              textAlign: "center",
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              // height: "100%"
            },
            option: {
              fontSize: "12px",
            },
          }}
        />
      </Box>
    </>
  );
}

export function LongShortButtonsWidget(props: WidgetProps) {
  return (
    <>
      <SimpleGrid
        cols={2}
        styles={{
          root: {
            gap: 10,
          },
        }}
      >
        <AppButton
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
            Buy / Long
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
        <AppButton
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
            Sell / Short
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
      </SimpleGrid>
    </>
  );
}


