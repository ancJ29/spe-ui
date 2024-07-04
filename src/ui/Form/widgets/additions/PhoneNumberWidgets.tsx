import {
  Avatar,
  Box,
  Combobox,
  Flex,
  Grid,
  Group,
  Image,
  InputBase,
  NumberInput,
  Select,
  SelectProps,
  Text,
  TextInput,
  rem,
  useCombobox,
} from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { useMemo, useState } from "react";
import phoneCode from "../mocks/phone-code.json";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";

export function PhoneLocalWidget(props: WidgetProps) {
  const options = useMemo(() => {
    return phoneCode.map((item) => {
      return {
        value: item.value,
        label: (<>
          <Flex justify={"space-between"}>
            <Image src={item.image} />
            <Text>{item.label}</Text>
          </Flex>

        </>)
      };
    });
  }, []);
  const renderSelectOption: SelectProps["renderOption"] = ({ option, checked }) => (
    <Flex align={"center"} gap={10} w={"100%"}>
      <Box>
        <Image w={20} src={option?.image} />
      </Box>
      <Text>{option.label}</Text>
      <Flex ml={"auto"} justify={"end"} flex={1}>
        {checked && <IconCheck style={{ marginInlineStart: "auto" }} />}
      </Flex>
    </Flex>
  );
  return (
    <Select
      placeholder={props.placeholder}
      value={props.value}
      data={phoneCode}
      searchable
      size="lg"
      onChange={v => props.onChange(v)}
      rightSection={
        <IconChevronDown />
      }
      label={props.label ? props.label : ""}
      renderOption={renderSelectOption}
      comboboxProps={{
        withinPortal: true,
        width: 400,
        position: "bottom-start"
      }}
      {...(props.options?.props as any)}
    />
  );
}


export function PhoneNumberWidget(props: WidgetProps) {
  return (
    <>
      <NumberInput
        label={props.label ? props.label : ""}
        value={props.value}
        placeholder={props.uiSchema?.["ui:placeholder"]}
        error={Boolean(props.rawErrors?.toLocaleString())}
        hideControls
        onChange={(v) => {
          props.onChange(v.toString());
        }}
        {...(props.options?.props as any)}
      />
    </>
  );
}
