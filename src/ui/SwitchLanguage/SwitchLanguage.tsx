import { ActionIcon, Menu, lighten, useMantineTheme } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import classes from "./index.module.scss"

export default function SwitchLanguage() {
    const theme = useMantineTheme();
    return (
        <Menu shadow="none" width={150} trigger='hover' radius={0} offset={0}>
            <Menu.Target>
                <ActionIcon
                    variant="transparent"
                    size="xl"
                    h={"100%"}
                >
                    <IconWorld color={lighten(theme.colors.dark[7], 1)} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown bg={"black"} bd={"none"} style={{ "border": "none" }}>
                <Menu.Item c={"white"} className={classes.menulan}>
                    English
                </Menu.Item>
                <Menu.Item c={"white"} className={classes.menulan}>
                    日本語
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
