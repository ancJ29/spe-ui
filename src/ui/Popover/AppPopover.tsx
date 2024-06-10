import { Popover, PopoverProps, PopoverTargetProps, PopoverDropdownProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useRef } from "react";
import classes from "./index.module.scss"

type _TYPES = "Default";
type ParentProps = {
    close: () => void,
    open: () => void,
    opened: boolean
}
interface Custom {
    instancetype?: _TYPES;
    target: (props: ParentProps) => PopoverTargetProps;
    dropwdown: (props: ParentProps) => PopoverDropdownProps;
};

type InstanceProps = PopoverProps & Partial<Custom>;

export function AppPopover(props: InstanceProps) {
    const [opened, { close, open }] = useDisclosure(false);
    const r = useRef(null)
    return (
        <Popover styles={{ arrow: { cursor: "pointer" }, dropdown: { cursor: "pointer" }, }} width={300} withinPortal offset={0} position="top" withArrow shadow="md" opened={opened} arrowSize={12}
            {...props}>
            <Popover.Target {...(props.target!({ close, opened, open }))} />
            <Popover.Dropdown classNames={{
                dropdown: classes["bgGray"]
            }} onMouseLeave={close} onMouseEnter={open} {...(props.dropwdown!({ close, opened, open }))} />
        </Popover>
    )
}
