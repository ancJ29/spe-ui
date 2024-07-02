import {
  Flex,
  Tabs,
  TabsListProps,
  TabsPanelProps,
  TabsProps,
  TabsTabProps,
} from "@mantine/core";
import { ReactNode } from "react";
import cx from "clsx";
type _TYPES =
  | "Default"
  | "WithCopyTradeDetail"
  | "WithSmallOnMenu"
  | "WithMediumNoBorder";
type ItemType = {
  data: Partial<{ value: string; label: string; options: unknown }>;
  tabProp: TabsTabProps;
  tabsPanelProps: TabsPanelProps;
  // tabsPanelProps: (props: TabsProps) => TabsPanelProps;
};
interface Custom {
  instancetype?: _TYPES;
  items: Partial<ItemType>[];
  tablist: TabsListProps;
  showPanel: boolean;
  leftSection: ReactNode;
  rightSection: ReactNode;
}
type InstanceProps = TabsProps & Partial<Custom>;

const _props: Partial<Record<_TYPES, InstanceProps>> = {
  Default: {
    className: "",
  },
  WithCopyTradeDetail: {
    className: "WithCopyTradeDetail",
  },
  WithSmallOnMenu: {
    className: "WithSmallOnMenu",
  },
  WithMediumNoBorder: {
    className: "WithMediumNoBorder",
  },
};

export default function AppTabs({
  rightSection,
  leftSection,
  showPanel,
  ...props
}: Partial<InstanceProps>) {
  return (
    <>
      <Tabs {..._props[props.instancetype ?? "Default"]} {...props} className={cx(
            _props[props.instancetype ?? "Default"]?.className,
            props.className,
          )}>
        <Flex align={"center"} gap={10} className="tabs-header">
          {leftSection}
          <Tabs.List {...props.tablist} flex={1}>
            {(props.items as ItemType[]).map((item, idx) => (
              <Tabs.Tab
                {...item.tabProp}
                key={idx}
                value={item.data.value as string}
              >
                {item.data.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {rightSection}
        </Flex>
        {Boolean(showPanel) &&
          (props.items as ItemType[]).map((item, idx) => (
            <Tabs.Panel
              key={idx}
              // {...item.tabsPanelProps(props)}
              {...item.tabsPanelProps}
              value={item.data.value as string}
            />
          ))}
      </Tabs>
    </>
  );
}
