import { IconChevronDown, IconCode, IconCoin, IconDecimal  } from "@tabler/icons-react";
import { ComponentProps, ElementType, useState } from "react";

type _TYPES = "Default";
type _ICONS = "Default" | "IconCode" | "IconChevronDown" | "IconCoin" | "IconBook" | "IconFingerprint" | "IconChartPie3" | "IconNotification";

type Custom = {
  instancetype: _TYPES
  instanceicon: _ICONS
};
const icons: Partial<InstancePropsByType<_ICONS, ElementType>> = {
  Default: IconDecimal,
  IconCode: IconCode,
  IconCoin: IconCoin,
  IconChevronDown: IconChevronDown,
};
type InstanceProps = ComponentProps<typeof IconChevronDown> & Partial<Custom>;

const _props: Partial<InstancePropsByType<_TYPES, InstanceProps>> = {
  Default: {
    color: "white"
  }
};

export default function Icon(props: InstanceProps) {
  const [Icon] = useState<ElementType>(icons[props.instancetype ?? "IconCoin"] as ElementType);
  const [prop] = useState<InstanceProps>(_props[props.instancetype ?? "Default"] as InstanceProps);
  return (
    <>
      <Icon {...prop} {...props}/>
    </>
  );
}
