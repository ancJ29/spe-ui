import { WidgetProps } from "@rjsf/utils";
import svgLogo from "@/assets/images/logo.svg";
import svgLogoLight from "@/assets/images/logo_light.svg";
import { Flex, Group, Image, Title } from "@mantine/core";

export function LogoWidget(props: WidgetProps) {
  return (
    <Flex justify="center" direction={"column"} align={"center"}>
      <Image darkHidden src={svgLogoLight} w={200} />
      <Image lightHidden src={svgLogo} w={200} />
      <Title order={2}>
        {props.schema.title}
      </Title>
    </Flex>
  );
}
