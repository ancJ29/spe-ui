import axios from "@/services/apis/api";
import {
  Box,
  Flex,
  Image,
  Loader,
  NumberInput,
  Select,
  SelectProps,
  Text,
} from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import phoneCode from "../mocks/phone-code.json";

export function PhoneLocalWidget(props: WidgetProps) {
  // const options = useMemo(() => {
  //   return phoneCode.map((item) => {
  //     return {
  //       value: item.value,
  //       label: (
  //         <>
  //           <Flex justify={"space-between"}>
  //             <Image src={item.image} />
  //             <Text>{item.label}</Text>
  //           </Flex>
  //         </>
  //       ),
  //     };
  //   });
  // }, []);
  const renderSelectOption: SelectProps["renderOption"] = ({
    option,
    checked,
  }) => (
    <Flex align={"center"} gap={10} w={"100%"}>
      <Box>
        <Image w={20} src={option?.image} />
      </Box>
      <Text>{option.label}</Text>
      <Flex ml={"auto"} justify={"end"} flex={1}>
        {checked && (
          <IconCheck style={{ marginInlineStart: "auto" }} />
        )}
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
      onChange={(v) => props.onChange(v)}
      rightSection={<IconChevronDown />}
      label={props.label ? props.label : ""}
      renderOption={renderSelectOption}
      comboboxProps={{
        withinPortal: true,
        width: 400,
        position: "bottom-start",
      }}
      {...(props.options?.props as any)} // eslint-disable-line
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

export function PhoneNumber2FAWidget(props: WidgetProps) {
  const [text, setText] = useState<string>(props.value);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    formContext: { formData, updateField },
  } = props;
  const doCheck2FA = (value: number) => {
    const region = `+${parseInt(formData.mobile?.phoneLocale)}`;
    const params = {
      mobile: `${region}${value}`,
      type: 2,
    };
    setLoading(true);
    axios
      .post("/api/check", params)
      .then((res) => {
        const hasMfa = Boolean(res.data?.result?.hasMfa);
        updateField("mobile.mobile", value.toString());
        updateField("mobile.is2fa", hasMfa);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };
  const debouncedOnChange = useCallback(
    debounce((value) => {
      if (value === "") {
        updateField("mobile.mobile", undefined);
        updateField("mobile.is2fa", false);
      } else {
        doCheck2FA(value);
      }
    }, 800),
    [],
  );

  const handleChange = (value: number) => {
    setText(value.toString());
    debouncedOnChange(value);
  };

  return (
    <>
      <NumberInput
        label={props.label ? props.label : ""}
        value={props.value}
        placeholder={props.uiSchema?.["ui:placeholder"]}
        error={Boolean(props.rawErrors?.toLocaleString())}
        hideControls
        onChange={handleChange}
        rightSection={
          <>{loading && <Loader color="primary" size={"xs"} />}</>
        }
        {...(props.options?.props as any)} // eslint-disable-line
      />
    </>
  );
}
