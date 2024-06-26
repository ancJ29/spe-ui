
import AppButton from "@/ui/Button/AppButton";
import { AppPopover } from "@/ui/Popover/AppPopover";
import AppText from "@/ui/Text/AppText";
import { Box, Checkbox, Flex, Image, InputLabel, Menu, Modal, NumberInput, SegmentedControl, Select, SimpleGrid, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { WidgetProps } from "@rjsf/utils";
import { IconArrowBackUp, IconCaretDownFilled, IconLetterC, IconMinus, IconPlus, IconPlusMinus } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import AddTPandSLOfTrade from "../../Sample/trades/AddTPandSLOfTradeSchema";
import { AddTpSlOfLimitTradeForm } from "@/ui/GridLayout/components";
export function OrderPriceWidget(props: WidgetProps) {
    return (
        <Box className="space-y-4">
            <InputLabel className="text-label-form">
                Order Price
            </InputLabel>
            <NumberInput
                rightSectionWidth={80}
                rightSection={
                    <Flex align={"center"} gap={8}>
                        <AppPopover
                            withArrow={false}
                            width={"auto"}
                            target={(props) => ({
                                children: (
                                    <AppText
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
                                    <Flex
                                        py={4}
                                        className="cursor-pointer"
                                        align={"center"}
                                        justify={"center"}
                                        bg={"dark"}
                                    >
                                        <IconPlus size={17} />
                                    </Flex>
                                    <Flex
                                        py={4}
                                        className="cursor-pointer"
                                        align={"center"}
                                        justify={"center"}
                                        bg={"dark"}
                                    >
                                        <IconMinus size={17} />
                                    </Flex>
                                    {["+5", "-5", "+25", "-25", "+100", "-100"].map(
                                        (_, i) => (
                                            <Flex
                                                py={4}
                                                align={"center"}
                                                justify={"center"}
                                                key={i}
                                                bg={"dark"}
                                                className="cursor-pointer"
                                            >
                                                <AppText
                                                    className="textMainHover cursor-pointer"
                                                    style={{ textAlign: "center" }}
                                                    w={"100%"}
                                                >
                                                    {_}
                                                </AppText>
                                            </Flex>
                                        ),
                                    )}
                                    <Flex
                                        className="cursor-pointer"
                                        py={4}
                                        align={"center"}
                                        justify={"center"}
                                        bg={"dark"}
                                    >
                                        <IconLetterC size={17} />
                                    </Flex>
                                    <Flex
                                        className="cursor-pointer"
                                        py={4}
                                        align={"center"}
                                        justify={"center"}
                                        bg={"dark"}
                                    >
                                        <IconArrowBackUp size={17} />
                                    </Flex>
                                </SimpleGrid>
                            </Menu.Dropdown>
                        </Menu>
                    </Flex>
                }
            />
        </Box>
    );
}

export function VolumeInputFieldWidget(props: WidgetProps) {
    return (
        <>
            <Box className="space-y-10">
                <InputLabel className="text-label-form">
                    Order by Value
                </InputLabel>
                <NumberInput
                    rightSectionWidth={60}
                    rightSection={
                        <AppText fz={12} fw={"bold"}>
                            USDC
                        </AppText>
                    }
                ></NumberInput>
                <Box>
                    <SegmentedControl
                        className="control-segment-percent"
                        w={"100%"}
                        h={25}
                        data={["10%", "25%", "50%", "75%", "100%"]}
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
            </Box>
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
    )
}

export function TimeInForceWidget(props: WidgetProps) {
    console.log(props.schema.enum)
    return (
        <>
            <Box>
                <Select value={props.value}
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
    )
}

export function PostOnlyWidget(props: WidgetProps) {
    return (
        <>
            <Box className="space-y-10">
                <Checkbox
                    checked={props.value}
                    onChange={(event) => {
                        props.onChange(event.currentTarget.checked)
                    }}
                    label={
                        <>
                            <AppPopover
                                withArrow={false}
                                position="bottom-start"
                                target={(props) => ({
                                    children: (
                                        <InputLabel
                                            onMouseLeave={props.close}
                                            onMouseEnter={props.open}
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
    )
}

export function ReduceOnlyWidget(props: WidgetProps) {
    return (
        <>
            <Box className="space-y-10">
                <Checkbox
                    checked={props.value}
                    onChange={(event) => {
                        props.onChange(event.currentTarget.checked)
                    }}
                    label={
                        <>
                            <AppPopover
                                withArrow={false}
                                position="bottom-start"
                                target={(props) => ({
                                    children: (
                                        <InputLabel
                                            className="text-label-form"
                                            onMouseLeave={props.close}
                                            onMouseEnter={props.open}
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
    )
}

export function TPandSLModalWidget(props: WidgetProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const onOpenModal = useCallback(() => {
        open();
    }, [open]);

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
                <AddTpSlOfLimitTradeForm
                    orderPrice={0}
                    onSubmit={(res) => {
                        // eslint-disable-next-line no-console
                        console.log("AddTpSlOfLimitTradeForm", res);
                    }}
                />
            </Modal>
            <Box>
                <Checkbox
                    checked={opened}
                    onChange={onOpenModal}
                    label="Take Profit / Stop Loss"
                    styles={{
                        label: {
                            fontSize: "12px",
                        },
                    }}
                />
            </Box>
        </>
    )
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
    )
}
