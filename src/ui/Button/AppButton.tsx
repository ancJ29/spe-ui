import {
  BoxProps,
  Button,
  ButtonProps,
  createPolymorphicComponent,
} from "@mantine/core";

import { IconArrowRight } from "@tabler/icons-react";
import { ReactNode, forwardRef } from "react";
import classes from "./appButton.module.scss";

type _TYPES =
  | "Default"
  | "Ghost"
  | "GhostWithRightIcon"
  | "WithRightIcon"
  | "WithOutlinedColor";
type Instance = ButtonProps;

type Custom = {
  children?: ReactNode;
  instanceType?: _TYPES;
};

const _classes: Record<string, string> = {
  Default: "",
  GhostWithRightIcon: classes.appButton,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _props: any = {
  Default: {},
  Ghost: {
    variant: "transparent",
  },
  GhostWithRightIcon: {
    justify: "space-between",
    fullWidth: true,
    rightSection: <IconArrowRight />,
    variant: "transparent",
    px: "0",
  },
  WithRightIcon: {
    rightSection: <IconArrowRight />,
  },
  WithOutlinedColor: {
    variant: "outline",
  },
};

type InstanceProps = Instance & Custom;

interface MyButtonProps extends BoxProps, InstanceProps {}

const AppButton = createPolymorphicComponent<"button", MyButtonProps>(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLButtonElement, MyButtonProps>(
    ({ children, ...others }, ref) => {
      const _pr = { ...others };
      return (
        <Button
          {..._props[_pr.instanceType ?? "Default"]}
          className={_classes[_pr.instanceType ?? "Default"]}
          {...others}
          ref={ref}
        >
          {children}
        </Button>
      );
    },
  ),
);

AppButton.displayName = "AppButton"; // Add display name

export default AppButton;
