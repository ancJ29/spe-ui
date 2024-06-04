import { Button, ButtonProps, BoxProps, 
  createPolymorphicComponent,  
} from "@mantine/core";

import { ReactNode, forwardRef } from "react";
import classes from "./appButton.module.scss";
import { IconArrowRight } from "@tabler/icons-react";

type _TYPES = "Default" | "Ghost" | "GhostWithRightIcon" | "WithRightIcon" | "WithOutlinedColor";
type Instance = ButtonProps;
type Custom = {
  children: ReactNode
  instancetype: _TYPES
};
const _classes: Partial<InstanceClassesByType<_TYPES, string>> = {
  Default: "",
  GhostWithRightIcon: classes.appButton,
};
const _props: Partial<InstancePropsByType<_TYPES, Instance>> = {
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
};

type InstanceProps = Instance & Partial<Custom>;

interface MyButtonProps extends BoxProps, InstanceProps {
}

const AppButton = createPolymorphicComponent<"button", MyButtonProps>(
  forwardRef<HTMLButtonElement, MyButtonProps>(({ children, ...others }, ref) => {
    const _pr = { ...others };
    return (
      <Button
        {..._props[_pr.instancetype ?? "Default"]}
        className={_classes[_pr.instancetype ?? "Default"]}
        {...others}
        ref={ref}
      >
        {children}
      </Button>
    );
  })
);


export default AppButton;
