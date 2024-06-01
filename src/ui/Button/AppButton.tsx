import { Button, ButtonProps } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./appButton.module.scss"
import { IconArrowRight } from "@tabler/icons-react";

const _TYPES = {
    Default: "Default",
    Ghost: "Ghost",
    GhostWithRightIcon: "GhostWithRightIcon",
    WithRightIcon: "WithRightIcon",
    WithOutlinedColor: "WithOutlinedColor"
} as const

type _TYPES = typeof _TYPES[keyof typeof _TYPES];
type Instance = ButtonProps;
type Custom = {
    children: ReactNode
    instanceType: _TYPES
}
type InstanceProps = Instance & Partial<Custom>
type InstancePropsByType = {
    [k in _TYPES]: Instance
}
type InstanceClassesByType = {
    [k in _TYPES]: string
}

const _classes: Partial<InstanceClassesByType> = {
    Default: "",
    GhostWithRightIcon: classes.appButton,
}

const _props: Partial<InstancePropsByType> = {
    Default: {

    },
    Ghost: {
        variant: "transparent",
    },
    GhostWithRightIcon: {
        justify: "space-between",
        fullWidth: true,
        rightSection: <IconArrowRight />,
        variant: "transparent",
        px: "0"
    },
    WithRightIcon: {
        rightSection: <IconArrowRight />,
    },
    WithOutlinedColor: {
        variant: "outline"
    }
}


const AppButton = (props: InstanceProps) => {
    const _pr = {...props}
    return (
        <Button {..._props[_pr.instanceType ?? "Default"]} {..._pr}
            className={_classes[_pr.instanceType ?? "Default"]}>{_pr.children}</Button>
    )
}

export default AppButton
