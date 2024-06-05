import { Text, TextProps } from "@mantine/core";
import { ReactNode } from "react";

const _TYPES = {
  Default: "Default",
  TabTitle: "TabTitle",
  WithCellToken: "WithCellToken",
  WithThead: "WithThead",
} as const;

type _TYPES = (typeof _TYPES)[keyof typeof _TYPES];
type Instance = TextProps;
type Custom = {
  children: ReactNode;
  instanceType: _TYPES;
};
type InstanceProps = Instance & Partial<Custom>;
type InstancePropsByType = {
  [k in _TYPES]: Instance;
};
type InstanceClassesByType = {
  [k in _TYPES]: string;
};

const _classes: Partial<InstanceClassesByType> = {
  Default: "",
};

const _props: Partial<InstancePropsByType> = {
  Default: {},
  TabTitle: {
    size: "lg",
    fw: "bold",
  },
  WithCellToken: {
    fw: "bold",
    size: "md",
  },
  WithThead: {
    size: "sm",
    fw: "normal",
    c: "gray",
    lineClamp: 1,
    truncate: "end",
  },
};

const AppText = (props: InstanceProps) => {
  const _pr = { ...props };
  return (
    <Text
      {..._props[_pr.instanceType ?? "Default"]}
      {..._pr}
      className={_classes[_pr.instanceType ?? "Default"]}
    >
      {_pr.children}
    </Text>
  );
};

export default AppText;
