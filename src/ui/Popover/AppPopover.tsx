import {
  Popover,
  PopoverDropdownProps,
  PopoverProps,
  PopoverTargetProps,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./index.module.scss";

type _TYPES = "Default";
type ParentProps = {
  close: () => void;
  open: () => void;
  opened: boolean;
};
interface Custom {
  instancetype?: _TYPES;
  target: (props: ParentProps) => PopoverTargetProps;
  dropdown: (props: ParentProps) => PopoverDropdownProps;
}

type InstanceProps = PopoverProps & Partial<Custom>;

export function AppPopover(props: InstanceProps) {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Popover
      styles={{
        arrow: { cursor: "pointer" },
        dropdown: { cursor: "pointer" },
      }}
      width={300}
      withinPortal
      offset={0}
      position="top"
      withArrow
      shadow="md"
      opened={opened}
      arrowSize={12}
      {...props}
    >
      {props.target ? (
        <Popover.Target {...props.target({ close, opened, open })} />
      ) : (
        ""
      )}
      <Popover.Dropdown
        classNames={{
          dropdown: classes["bgGray"],
        }}
        onMouseLeave={close}
        onMouseEnter={open}
        {...props.dropdown?.({ close, opened, open })}
      />
    </Popover>
  );
}
