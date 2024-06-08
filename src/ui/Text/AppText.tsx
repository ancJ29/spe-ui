import { Text, TextProps } from "@mantine/core";
import { ReactNode } from "react";

type _TYPES =
  "Default" |
  "TabTitle" |
  "WithCellToken" |
  "WithThead" |
  "BannerCopyTitle" |
  "BannerTextSub" |
  "TabText" |
  "WithTitleSectionTrade" |
  "WithSubTitleSectionTrade" |
  "WithPriceCardTrader" |
  "withTheadSmall" |
  "withPriceCardTrade"
  | "WidthPriceNormal";

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
    style(theme) {
      return {
        textOverflow: "ellipsis",
        overflow: "hidden"
      };
    },
  },
  WithThead: {
    size: "sm",
    fw: "normal",
    c: "gray",
    lineClamp: 1,
    truncate: "end",
  },
  BannerCopyTitle: {
    size: "xl",
    fw: "bold"
  },
  BannerTextSub: {
    size: "lg",
    fw: "bold"
  },
  TabText: {
    h: 32,
    fw: "bold",
    fz: "20px",
    lh: "28px",
  },
  WithTitleSectionTrade: {
    style: {
      fontWeight: "600",
      fontSize: "24px",
      lineHeight: "32px",
      color: "#121214",
      display: "flex",
      alignItems: "center",
    },
    fw: "bolder"
  },
  WithSubTitleSectionTrade: {
    c: "#81858c",
    fz: 16,
    fw: "bold"
  },
  WithPriceCardTrader: {
    style: {
      fontWeight: "700",
      fontSize: "28px",
    }
  },
  withTheadSmall: {
    fz: 12,
    c: "#81858c"
  },
  withPriceCardTrade: {
    fw: "bold",
    fz: 14,
  },
  WidthPriceNormal: {
    fw: "600",
    fz: 14
  }

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
