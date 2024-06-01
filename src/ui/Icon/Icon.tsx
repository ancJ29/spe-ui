import { darken, lighten, rem, } from "@mantine/core";
import cx from 'clsx';
import classes from './Icon.module.scss'
import { IconChevronDown } from "@tabler/icons-react";
import { ComponentProps, ElementType } from "react";

type IconChevronDownProps = ComponentProps<typeof IconChevronDown>;
type IconProps = {
    icon: ElementType
    color: string
    iconProps: Partial<IconChevronDownProps>
}

export default function Icon(props: IconProps) {
    return (
        <>
            <props.icon {...props.iconProps} className={cx(classes.icon, classes.light)} color={lighten(props.color, 1)}/>
            <props.icon {...props.iconProps} className={cx(classes.icon, classes.dark)} color={darken(props.color, 1)}/>
        </>
    )
}
