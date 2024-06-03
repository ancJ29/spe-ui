import { Pill } from "@mantine/core";
import { ComponentProps } from "react";
import classes from "./pill.module.scss";
type Instance = ComponentProps<typeof Pill>;
type Custom = {
    
};
type InstanceProps = Instance & Partial<Custom>;


export default function AppPill(props: InstanceProps) {
  return (
    <Pill className={classes.appPill} {...props}>{props.children}</Pill>
  );
}
