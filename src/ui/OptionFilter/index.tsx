import {
  Flex,
  Menu,
  MenuDropdownProps,
  MenuProps,
  MenuTargetProps,
} from "@mantine/core";
import { ReactNode, useState } from "react";
import AppButton from "../Button/AppButton";
import { IconChevronDown } from "@tabler/icons-react";

type FilterOption = {
  value: string;
  label: string;
};
export function OptionFilter(
  props: Partial<{
    label: string;
    value?: string;
    items: FilterOption[];
    icon: ReactNode;
    menuProps: MenuProps;
    menuTargetProps: MenuTargetProps;
    menuDropdownProps: MenuDropdownProps;
  }>,
) {
  const [values, setValues] = useState<string>(
    props.label ?? props.value ?? (props?.items?.[0].value as string),
  );
  return (
    <>
      <Menu
        position="bottom-start"
        shadow="md"
        width={200}
        withinPortal
        transitionProps={{ transition: "fade-down", duration: 150 }}
        {...props.menuProps}
      >
        <Menu.Target {...props.menuTargetProps}>
          <AppButton
            p={0}
            variant="transparent"
            color="dark"
            styles={{
              label: {
                color: "light-dark(black, white)",
              },
            }}
          >
            <Flex align={"center"} gap={5}>
              {values ?? props.label ?? "_menu"}
              {props.icon ? (
                props.icon
              ) : (
                <IconChevronDown size={18} color="gray" />
              )}
            </Flex>
          </AppButton>
        </Menu.Target>

        <Menu.Dropdown {...props.menuDropdownProps}>
          {props.items?.map((item, i) => (
            <Menu.Item
              key={i}
              onClick={() => setValues(item.value)}
              fw={"bold"}
              value={item.value}
              c={item.value === values ? "primary" : ""}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </>
  );
}