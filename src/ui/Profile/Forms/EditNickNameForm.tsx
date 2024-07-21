import useTranslation from "@/hooks/useTranslation";
import { Avatar, Badge, Box, Button, Flex, rem, SimpleGrid, Text, TextInput } from "@mantine/core";
import defaultAvatar from "@/assets/images/defaultAvatar.png";
import { IconCircleCheck, IconEdit } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

export function EditNickNameForm() {
    const t = useTranslation()
    const onChangeNickName = () => {
        modals.open({
            title: t("Add a nickname"),
            children: <ModalNickName />,
            centered: true
        })
    }
    return (
        <>
            <Flex gap={12} align={"center"}>
                <Box>
                    <Avatar w={72} h={72} src={defaultAvatar}></Avatar>
                </Box>
                <Box>
                    <Flex align={"center"} gap={10}>
                        <Text fz={24} fw={600}>
                            duc***@****
                        </Text>
                        <Button onClick={onChangeNickName} p={0} m={0} variant="transparent">
                            <IconEdit size={16} color="gray" />
                        </Button>
                    </Flex>
                    <Badge tt={"capitalize"} fw={"normal"} variant="light" color={"#20b26c"} c={"#20b26c"} leftSection={
                        <IconCircleCheck style={{ width: rem(12), height: rem(12) }} />
                    }>Identity Verification Lv.1</Badge>
                </Box>
            </Flex>
        </>
    )
}


export function ModalNickName() {
    const t = useTranslation()
    return (
        <>
            <TextInput label={t("Nickname")} />
            <SimpleGrid cols={2} mt={"xl"}>
                <Button fullWidth onClick={() => modals.closeAll()}>{t("Confirm")}</Button>
                <Button color="gray" variant="outline" fullWidth onClick={() => modals.closeAll()}>{t("Cancel")}</Button>
            </SimpleGrid>
        </>
    )
}
