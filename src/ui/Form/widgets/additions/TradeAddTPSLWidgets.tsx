import AppButton from "@/ui/Button/AppButton";
import { AppPopover } from "@/ui/Popover/AppPopover";
import AppText from "@/ui/Text/AppText";
import { Box, Button, Checkbox, Flex, Group, InputLabel, Modal, Radio, SegmentedControl, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { WidgetProps } from "@rjsf/utils";
import { IconCaretDownFilled, IconHelp, IconSwitch3 } from "@tabler/icons-react";
import { useCallback, useState } from "react";

export function BiasTypeSwitchWidget(props: WidgetProps) {
    const [orderType, toggle] = useToggle<'Entire Position' | 'Current Order'>(['Entire Position', 'Current Order']);
    return (
        <>
            <Flex justify={"space-between"} align={"center"}>
                <AppPopover
                    withArrow={false}
                    width={400}
                    target={(props) => ({
                        children: (
                            <Flex onMouseLeave={props.close}
                                onMouseEnter={props.open} align={"center"} gap={5}>
                                <AppText
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    fz={14}
                                >Applicable to</AppText>
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
                                        The TP/SL applies to the entire position. Once this order is fully or partially filled, the TP/SL order will be placed.
                                        Current Order
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
                <AppButton onClick={(v) => {
                    toggle()
                    if (orderType === "Current Order") {
                        props.onChange("1")
                    } else {
                        props.onChange("2")
                    }
                }} variant="transparent" c={"white"} rightSection={
                    <IconSwitch3 color="orange" size={14} />
                }>
                    {props.value === "1" ? "Entire Position" : "Current Order"}
                </AppButton>

            </Flex>
        </>
    )
}

export function ProfitInputWidget(props: WidgetProps) {
    return (
        <>
            ProfitInputWidget
        </>
    )
}

export function StopLossInputWidget(props: WidgetProps) {
    return (
        <>
            ProfitInputWidget
        </>
    )
}

const data = [
    {
        name: 'Trigger by ROI (%)',
        description: `
        Please enter your desired ROI (%) to calculate the trigger price of TP/SL.`,
        value: 1
    },
    {
        name: 'Trigger by Change %',
        description: `Please enter your preferred TP/SL trigger price, or select a percentage increase or decrease of the entry price to calculate it.`,
        value: 2
    },
    {
        name: 'Trigger by P&L NEW',
        description: `Please enter your expected profit or loss to calculate the trigger price of TP/SL.`,
        value: 3
    },
];
export function CheckLimitTpAndSlWidget(props: WidgetProps) {
    const [value, setValue] = useState<string | null>("1");
    const [opened, { open, close }] = useDisclosure(false);
    const [checked, setChecked] = useState<boolean>()
    const openTPSLSettings = () => {
        open()
    }
    return (
        <>
            <Flex justify={"space-between"}>
                <Flex align={"center"} gap={5}>
                    <AppText className="cursor-pointer" onClick={openTPSLSettings} fz={14}>{props.label}</AppText>
                    <IconCaretDownFilled size={12} />
                </Flex>
                <Box>
                    <Checkbox size="xs" label="Limit" checked={checked} onChange={() => {
                        setChecked(!checked)
                        props.onChange(!checked)
                    }} />
                </Box>
            </Flex>
            <Modal opened={opened} onClose={close} title="TP/SL Settings" centered>
                <Radio.Group
                    value={value}
                    onChange={(v) => {
                        setValue(v)
                    }}
                >
                    <Stack pt="md" gap="xs">
                        {data.map((item) => (
                            <Radio.Card radius="md" bd={0} value={item.value.toString()} key={item.value}>
                                <Group wrap="nowrap" align="flex-start">
                                    <Radio.Indicator />
                                    <div className="space-y-4">
                                        <Text fw={"bolder"} mb={2}>{item.name}</Text>
                                        <Text fz={"xs"}>{item.description}</Text>
                                    </div>
                                </Group>
                            </Radio.Card>
                        ))}
                    </Stack>
                </Radio.Group>
                <Box mt={"lg"}></Box>
                <InputLabel>
                    <Text display={"inline"} c={"red"}>*</Text> The selected TP/SL trigger method will be applicable to all newly placed and modified TP/SL orders.
                </InputLabel>
                <SimpleGrid cols={2}>
                    <Button fullWidth onClick={() => close()} mt="md">
                        Confirm
                    </Button>
                    <Button fullWidth onClick={() => close()} mt="md" bg={"gray"}>
                        Cancel
                    </Button>
                </SimpleGrid>
            </Modal>
        </>
    )
}


