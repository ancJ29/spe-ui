import useTranslation from "@/hooks/useTranslation";
import { Alert, Avatar, Box, Button, Center, Flex, Image, InputLabel, Select, SimpleGrid, Space, Text, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCheck, IconChevronDown, IconInfoCircle, IconSquareChevronDown, IconSquareChevronDownFilled } from "@tabler/icons-react";
import phoneCode from "@/ui/Form/widgets/mocks/phone-code.json";
import { useMemo, useState } from "react";

export function BindPhoneForm() {
    const t = useTranslation()
    const openModal = () => {
        return modals.open({
            title: t("Bind Phone"),
            children: <BindPhoneModal />,
            centered: true,
            withinPortal: true,
            size: "lg",
        })
    }
    return (
        <>
            <Button onClick={openModal} variant="gradient" miw={150} px={"xs"} gradient={{ from: "orange", to: "yellow", deg: 90 }}>
                {t("Bind Phone")}
            </Button>
        </>
    )
}

export function BindPhoneModal() {
    const t = useTranslation()
    const [region, setRegion] = useState("+81 Japan")
    const info = useMemo(() => {
        return phoneCode.find(v => v.value === region)
    }, [region])
    return (
        <Center h={"100%"} w={"100%"}>
            <Box w={"100%"}>
                <SimpleGrid cols={1} styles={{
                    container: {
                        gap: "10px"
                    }
                }}>
                    <Box>
                        <InputLabel size="lg">{t("Phone Number")}</InputLabel>
                        <Flex gap={10}>
                            <Box>
                                <Box w={200}>
                                    <Select
                                        defaultValue={region}
                                        data={phoneCode}
                                        value={region}
                                        onChange={(v) => setRegion(v as string)}
                                        leftSection={
                                            <Image w={20} src={info?.image}></Image>
                                        }
                                        leftSectionWidth={40}
                                        searchable
                                        comboboxProps={{
                                            withinPortal: true,
                                            width: "300px",
                                            position: "bottom-start"
                                        }}
                                        styles={{
                                            input: {
                                                fontSize: "14px"
                                            }
                                        }}
                                        rightSectionWidth={30}
                                        rightSection={<IconChevronDown size={16} />}
                                        renderOption={({ option, checked }) => (
                                            <Flex h={"100%"} align={"center"} gap={10} w={"100%"}>
                                                <Box>
                                                    <Image w={20} src={option?.image} />
                                                </Box>
                                                <Text fz={12}>{option.label}</Text>
                                                <Flex ml={"auto"} justify={"end"} flex={1}>
                                                    {checked && (
                                                        <IconCheck style={{ marginInlineStart: "auto" }} />
                                                    )}
                                                </Flex>
                                            </Flex>
                                        )}
                                        size="lg"
                                        allowDeselect={false}
                                    />
                                </Box>
                            </Box>
                            <Box flex={1}>
                                <TextInput placeholder={t("Phone number")}/>
                            </Box>
                        </Flex>
                    </Box>
                    <TextInput label={t("SMS Verification")} placeholder={t("Enter code")} rightSectionWidth={60} rightSection={
                        <Flex px={10} w={"100%"}>
                            <Button p={0} variant="transparent">{t("Send")}</Button>
                        </Flex>
                    }/>
                    <TextInput styles={{
                        label: {
                            width: "100%"
                        }
                    }} label={
                        <Flex justify={"space-between"} w={"100%"}>
                            <Text>{t("Current Email Verification")}</Text>
                            <Text c={"dimmed"}>d********t@gmail.com</Text>
                        </Flex>
                    } rightSectionWidth={60} rightSection={
                        <Flex px={10} w={"100%"}>
                            <Button p={0} variant="transparent">{t("Send")}</Button>
                        </Flex>
                    } placeholder={t("Enter code")}/>
                    <Space />
                    <Box>
                        <Button size="lg" color="gray" variant="gradient" gradient={{ from: "primary", to: "yellow", deg: 90 }}
                            fullWidth onClick={() => modals.closeAll()}>{t("Confirm")}</Button>
                    </Box>
                </SimpleGrid>
            </Box>
        </Center>
    )
}
