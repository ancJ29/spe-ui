import { PROFILE_IMAGE_PREFIX } from "@/common/configs";
import { Avatar, Flex, Text } from "@mantine/core";

export function MasterTrader({
  avatar,
  name,
}: {
  avatar?: string;
  name?: string;
}) {
  return (
    <Flex justify="start" align="center" gap={30}>
      <Avatar size={50} src={`${PROFILE_IMAGE_PREFIX}/${avatar}`} />
      <Text fz={14} fw="bold">
        {name}
      </Text>
    </Flex>
  );
}
