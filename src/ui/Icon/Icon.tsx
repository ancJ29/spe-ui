import {
  IconChevronDown,
  IconCode,
  IconCoin,
  IconDecimal,
} from "@tabler/icons-react";
import { ComponentProps, ElementType, useState } from "react";

type _TYPES = "Default";
type _ICONS =
  | "Default"
  | "IconCode"
  | "IconChevronDown"
  | "IconCoin"
  | "IconBook"
  | "IconFingerprint"
  | "IconChartPie3"
  | "IconNotification";

const icons: Record<string, ElementType> = {
  Default: IconDecimal,
  IconCode: IconCode,
  IconCoin: IconCoin,
  IconChevronDown: IconChevronDown,
};
type InstanceProps = ComponentProps<typeof IconChevronDown> & {
  instanceType?: _TYPES;
  instanceIcon?: _ICONS;
};

const _props: Record<string, InstanceProps> = {
  Default: {
    color: "white",
  },
};

export default function Icon(props: InstanceProps) {
  const [Icon] = useState<ElementType>(
    icons[props.instanceType ?? "IconCoin"] as ElementType,
  );
  const [prop] = useState<InstanceProps>(
    _props[props.instanceType ?? "Default"] as InstanceProps,
  );
  return (
    <>
      <Icon {...prop} {...props} />
    </>
  );
}
