import { Text, TextProps, createPolymorphicComponent } from "@mantine/core";
import { ReactNode, forwardRef } from "react";
import classes from "./appText.module.scss"

type _TYPES =
  | "Default"
  | "TabTitle"
  | "WithCellToken"
  | "WithThead"
  | "BannerCopyTitle"
  | "BannerTextSub"
  | "TabText"
  | "WithTitleSectionTrade"
  | "WithSubTitleSectionTrade"
  | "WithPriceCardTrader"
  | "withTheadSmall"
  | "withPriceCardTrade"
  | "WidthPriceNormal"
  | "WithSize14Gray"
  | "WidthTooltipGray"
  | "WithTextTooltip"
  | "withPriceLong"
  | "withPriceNormal"

type Instance = TextProps;
type Custom = {
  children: ReactNode;
  instancetype: _TYPES;
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
    style() {
      return {
        textOverflow: "ellipsis",
        overflow: "hidden",
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
    fw: "bold",
  },
  BannerTextSub: {
    size: "lg",
    fw: "bold",
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
    fw: "bolder",
  },
  WithSubTitleSectionTrade: {
    c: "#81858c",
    fz: 16,
    fw: "bold",
  },
  WithPriceCardTrader: {
    style: {
      fontWeight: "700",
      fontSize: "28px",
    },
  },
  withTheadSmall: {
    fz: 12,
    c: "#81858c",
  },
  withPriceCardTrade: {
    fw: "bold",
    fz: 14,
  },
  WidthPriceNormal: {
    fw: "600",
    fz: 14,
  },
  WithSize14Gray: {
    // fz: 14,
    // c: "#71757a",
    classNames(theme, props, ctx) {
      return {
        root: classes["WithSize14Gray"]
      }
    },
  },
  WidthTooltipGray: {
    classNames(theme, props, ctx) {
      return {
        root: classes["WidthTooltipGray"]
      }
    },
  },
  WithTextTooltip: {
    classNames(theme, props, ctx) {
      return {
        root: classes["WithTextTooltip"]
      }
    },
  },
  withPriceLong: {
    fw: "bolder",
    classNames(theme, props, ctx) {
      return {
        root: classes["withPriceLong"]
      }
    },
  },
  withPriceNormal: {
    fw: "bolder",
    fz: 14
  }
};

const AppText = createPolymorphicComponent<"p", InstanceProps>(
  forwardRef<HTMLParagraphElement, InstanceProps>(
    ({ children, ...others }, ref) => {
      const _pr = { ...others };
      return (
        <Text
          {..._props[_pr.instancetype ?? "Default"]}
          className={_classes[_pr.instancetype ?? "Default"]}
          {...others}
          ref={ref}
        >
          {children}
        </Text>
      );
    },
  ),
);
AppText.displayName = "AppText"; // Add display name


export default AppText;
