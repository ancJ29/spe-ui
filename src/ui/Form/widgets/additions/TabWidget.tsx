import { Center, Flex, SegmentedControl, rem } from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { IconEye, IconMailHeart, IconPhone } from "@tabler/icons-react";
import { useState } from "react";

type Mode = "0" | "1";

export function TabWidget(props: WidgetProps) {
  const [value, setValue] = useState<Mode>("0");
  
  return (
    <>
      <SegmentedControl
        size="sm"
        color="primary"
        transitionDuration={200}
        w={"100%"}
        transitionTimingFunction="linear"
        data={[
          {
            value: "0", label: <Center style={{ gap: 10 }}>
              <IconPhone style={{ width: rem(16), height: rem(16) }} />
              <span>Email</span>
            </Center>
          },
          {
            value: "1", label: <Center style={{ gap: 10 }}>
              <IconMailHeart style={{ width: rem(16), height: rem(16) }} />
              <span>Mobile</span>
            </Center>
          },
        ]}
        value={value}
        onChange={(v) => {
          setValue(v as Mode);
          props.onChange(v);
        }}
      />
    </>
  );
}
