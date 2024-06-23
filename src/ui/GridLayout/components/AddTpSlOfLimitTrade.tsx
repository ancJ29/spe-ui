import AppButton from "@/ui/Button/AppButton";
import AppForm from "@/ui/Form/Form";
import { samples } from "@/ui/Form/Sample";
import AppText from "@/ui/Text/AppText";
import { ActionIcon, Alert, Box, Checkbox, Flex, Grid, InputLabel, NumberInput, Select, SimpleGrid, Slider } from "@mantine/core";
import { IconCaretDownFilled, IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

export function AddTpSlOfLimitTrade() {
    const [value, setValue] = useState<'Long' | 'Short'>('Long');
    

    return (
        <>
            <Box style={{ overflow: "hidden" }} className="space-y-20">
                <AppForm w={"100%"} schema={samples.LimitMarketConditionalTrade.schema} uiSchema={
                    samples.LimitMarketConditionalTrade.uiSchema
                } formData={
                    samples.LimitMarketConditionalTrade.formData
                } showJsonOutput />
               
                
                <Box className="space-y-6">
                    <Flex justify={"space-between"}>
                        <AppText fz={14}>Take Profit-Trigger by Change %</AppText>
                        <Box>
                            <Checkbox size="xs" label="Limit" />
                        </Box>
                    </Flex>
                    <Box className="space-y-10">
                        <Box>
                            <Grid columns={12} gutter={10}>
                                <Grid.Col span={8}>
                                    <NumberInput size="lg"
                                        withErrorStyles={false}
                                        rightSectionWidth={150}
                                        placeholder="Trigger Price"
                                        rightSection={
                                            <Flex align={"center"} gap={8}>
                                                <Flex align={"center"}>
                                                    <ActionIcon variant="transparent" styles={{
                                                        root: {
                                                        }
                                                    }}>
                                                        <IconMinus size={16} />
                                                    </ActionIcon>
                                                </Flex>
                                                <Box>
                                                    <Box h={14} w={1} bg={"gray"}></Box>
                                                </Box>
                                                <Flex align={"center"}>
                                                    <ActionIcon variant="transparent">
                                                        <IconPlus size={16} />
                                                    </ActionIcon>
                                                </Flex>
                                                <Select
                                                    data={['Last', 'Index', 'Mark']}
                                                    defaultValue="Last"
                                                    withCheckIcon={false}
                                                    rightSection={
                                                        <IconCaretDownFilled size={14} />
                                                    }
                                                    rightSectionWidth={30}
                                                    allowDeselect={false}
                                                    size="xs"
                                                    classNames={
                                                        {
                                                            root: "app-select",
                                                            option: "app-select-option",
                                                            input: "app-select--input",
                                                            section: "app-select--section"
                                                        }
                                                    }
                                                    comboboxProps={{
                                                        position: "bottom-start",
                                                        offset: 0,
                                                        withinPortal: true,
                                                        width: "auto"
                                                    }}
                                                    styles={{
                                                        input: {
                                                            border: "none",
                                                            fontSize: "12px",
                                                            textAlign: "right",
                                                            paddingTop: 0,
                                                            paddingBottom: 0,
                                                            paddingLeft: 0

                                                        },
                                                        option: {
                                                            fontSize: "12px",
                                                        }
                                                    }}
                                                />

                                            </Flex>
                                        }
                                    />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <NumberInput size="lg"
                                        withErrorStyles={false}
                                        placeholder="ROI"
                                        rightSection={
                                            <>
                                                %
                                            </>
                                        }
                                    />
                                </Grid.Col>
                            </Grid>
                            {value === "Long" ? <Box>
                                <InputLabel fz={12} c={"gray"} color="gray">
                                    The Take Profit price must be lower than the order price
                                </InputLabel>
                            </Box> : ""}
                        </Box>
                        <Box h={40}>
                            <Slider w={"100%"}
                                color="primary"
                                thumbSize={14}
                                max={150}
                                showLabelOnHover={false}
                                marks={[
                                    { value: 0, label: '0' },
                                    { value: 50, label: '50%' },
                                    { value: 100, label: '100%' },
                                    { value: 150, label: '150%' },
                                ]}
                                styles={{
                                    trackContainer: {
                                        width: "calc(100% - 10px)"
                                    },
                                    label: {

                                    },
                                    markLabel: {
                                        fontSize: "10px"
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
                <Alert variant="light" color="gray" fz={12} p={10} styles={{
                    message: {
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "10px",
                        padding: "0px"
                    },

                }}>
                    Index Price to 0.5696 will trigger market Take Profit order; your expected profit will be 7,091.7863 USDC (ROI: 132.43%)

                </Alert>
                <Box h={1} w={"100%"} bg={"gray"}></Box>
                <Box className="space-y-6">
                    <Flex justify={"space-between"}>
                        <AppText fz={14}>Stop Loss-Trigger by Change %</AppText>
                        <Box>
                            <Checkbox size="xs" label="Limit" />
                        </Box>
                    </Flex>
                    <Box className="space-y-10">
                        <Grid columns={12} gutter={10}>
                            <Grid.Col span={8}>
                                <NumberInput size="lg"
                                    withErrorStyles={false}
                                    rightSectionWidth={150}
                                    placeholder="Trigger Price"
                                    rightSection={
                                        <Flex align={"center"} gap={8}>
                                            <Flex align={"center"}>
                                                <ActionIcon variant="transparent" styles={{
                                                    root: {
                                                    }
                                                }}>
                                                    <IconMinus size={16} />
                                                </ActionIcon>
                                            </Flex>
                                            <Box>
                                                <Box h={14} w={1} bg={"gray"}></Box>
                                            </Box>
                                            <Flex align={"center"}>
                                                <ActionIcon variant="transparent">
                                                    <IconPlus size={16} />
                                                </ActionIcon>
                                            </Flex>
                                            <Select
                                                data={['Last', 'Index', 'Mark']}
                                                defaultValue="Last"
                                                withCheckIcon={false}
                                                rightSection={
                                                    <IconCaretDownFilled size={14} />
                                                }
                                                rightSectionWidth={30}
                                                allowDeselect={false}
                                                size="xs"
                                                classNames={
                                                    {
                                                        root: "app-select",
                                                        option: "app-select-option",
                                                        section: "app-select--section",
                                                        input: "app-select--input"
                                                    }
                                                }
                                                comboboxProps={{
                                                    position: "bottom-start",
                                                    offset: 0,
                                                    withinPortal: true,
                                                    width: "auto"
                                                }}
                                                styles={{
                                                    input: {
                                                        border: "none",
                                                        fontSize: "12px",
                                                        textAlign: "right",
                                                        paddingTop: 0,
                                                        paddingBottom: 0,
                                                        paddingLeft: 0

                                                    },
                                                    option: {
                                                        fontSize: "12px",
                                                    }
                                                }}
                                            />

                                        </Flex>
                                    }
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <NumberInput size="lg"
                                    withErrorStyles={false}
                                    placeholder="Decrease"
                                    rightSection={
                                        <>
                                            %
                                        </>
                                    }
                                />
                            </Grid.Col>
                        </Grid>

                        <Box h={40}>
                            <Slider w={"100%"}
                                color="primary"
                                thumbSize={14}
                                max={10}
                                showLabelOnHover={false}
                                marks={[
                                    { value: 0, label: '0' },
                                    { value: 5, label: '5%' },
                                    { value: 10, label: '10%' },
                                ]}
                                styles={{
                                    trackContainer: {
                                        width: "calc(100% - 10px)"
                                    },
                                    label: {

                                    },
                                    markLabel: {
                                        fontSize: "10px"
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
                <SimpleGrid cols={2}>
                    <AppButton color="primary">Confirm</AppButton>
                    <AppButton color="gray">Cancel</AppButton>
                </SimpleGrid>
            </Box>
        </>
    )
}
