import { Pill, PillProps } from "@mantine/core";
import classes from "./pill.module.scss";

type _TYPES =
  | "Default"
  | "WithTagSmall";

type Custom = {
  instanceType?: _TYPES;
};

const _props: Partial<Record<_TYPES, InstanceProps>> = {
  "Default": {},
  "WithTagSmall": {
    bg: "blue.1",
    c: "blue.5",
    radius: 5, 
    size: "xs"
  }
};

type InstanceProps = PillProps & Partial<Custom>;

export default function AppPill(props: InstanceProps) {
  return (
    <Pill
      className={classes.appPill}
      {
        ..._props[props.instanceType ?? "Default"]
      }
      {...props}
    >
      {props.children}
    </Pill>
  );
}

