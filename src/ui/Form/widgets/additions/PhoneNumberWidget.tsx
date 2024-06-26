import {
  Avatar,
  Combobox,
  Flex,
  Grid,
  InputBase,
  TextInput,
  rem,
  useCombobox,
} from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { useMemo, useState } from "react";
import phoneCode from "../mocks/phone-code.json";

import { useDebouncedCallback } from "@mantine/hooks";

export function PhoneNumberWidget(props: WidgetProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      if (eventSource === "keyboard") {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex("active");
      }
    },
  });
  const [value, setValue] = useState<string | null>("+81 Japan");
  const [search, setSearch] = useState("");
  const shouldFilterOptions = phoneCode.every(
    (item) => item.value !== search,
  );
  const options = useMemo(() => {
    if (shouldFilterOptions) {
      return phoneCode
        .filter((item) =>
          item.value
            .toLowerCase()
            .includes(search.toLowerCase().trim()),
        )
        .map((item) => (
          <Combobox.Option
            value={item.value}
            key={item.value}
            active={item.value === value}
          >
            <Flex justify={"start"} align={"center"} gap={10}>
              <Avatar size={20} src={item.image} />
              {item.label}
            </Flex>
          </Combobox.Option>
        ));
    }
    return phoneCode.map((item) => (
      <Combobox.Option
        value={item.value}
        key={item.value}
        active={item.value === value}
      >
        <Flex justify={"start"} align={"center"} gap={10}>
          <Avatar size={20} src={item.image} />
          {item.label}
        </Flex>
      </Combobox.Option>
    ));
  }, [search, shouldFilterOptions, value]);

  const handleSearch = useDebouncedCallback(async (query: string) => {
    props.onChange(query);
    // console.log("IS_VALID", isValidPhoneNumber(query, "VN"), new AsYouType().input(`${value}${query}`))
  }, 500);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleSearch(event.currentTarget.value);
  };

  return (
    <>
      <Grid gutter={5}>
        <Grid.Col span={4}>
          <Combobox
            store={combobox}
            withinPortal={true}
            onOptionSubmit={(val) => {
              setValue(val);
              setSearch(`+${parseInt(val)}`);
              combobox.closeDropdown();
            }}
            width={300}
            position="bottom-start"
          >
            <Combobox.Target>
              <InputBase
                rightSection={<Combobox.Chevron />}
                value={search}
                onChange={(event) => {
                  combobox.openDropdown();
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onClick={() => combobox.openDropdown()}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => {
                  combobox.closeDropdown();
                  setSearch(value || "");
                }}
                placeholder="Region"
                rightSectionPointerEvents="none"
              />
            </Combobox.Target>

            <Combobox.Dropdown
              style={{ overflowY: "auto", maxHeight: rem("30vh") }}
            >
              <Combobox.Options>
                {options.length > 0 ? (
                  options
                ) : (
                  <Combobox.Empty>Nothing found</Combobox.Empty>
                )}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
        </Grid.Col>
        <Grid.Col span={8}>
          <TextInput
            value={props.value}
            placeholder={props.uiSchema?.["ui:placeholder"]}
            onChange={handleChange}
            error={Boolean(props.rawErrors?.toLocaleString())}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}
