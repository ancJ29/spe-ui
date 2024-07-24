import { alpha, Avatar, Box, Card, Flex, Space, Text, Title } from "@mantine/core";
import AppButton from "../Button/AppButton";
import AppPill from "../Pill/AppPill";

export function CardTradeDefault() {
  return (
    <Card
      padding="lg"
      radius="md"
      mx={5}
      bg={alpha("gray", 0.03)}
      withBorder
    >
      <Flex gap={"md"} align={"center"}>
        <Box>
          <Avatar
            size={44}
            src={
              "https://www.bybit.com/bycsi-root/fop/copytrade/d4b50bbb-a63f-4675-808a-5b60ae5cdf22.jpg?quality=50&format=avif&resize=width/44"
            }
          />
        </Box>
        <Box>
          <Title order={5}>GlimmerGrace</Title>
          <Text c={"gray"}>24 Followers</Text>
        </Box>
      </Flex>
      <Space h={"md"} />
      <Box>
        <Box>
          <Title order={6} fw={"normal"} c={"gray"}>
                        7D ROI
          </Title>
          <Title order={4} fw={"bold"}>
                        394.80%
          </Title>
        </Box>
        <Space h={"sm"} />
        <Box>
          <Title order={6} fw={"normal"} c={"gray"}>
            {"7D followers' Pnl"}
          </Title>
          <Title order={4} fw={"bold"}>
                        1,9444.23
          </Title>
        </Box>
      </Box>
      <Space h={"md"} />
      <AppButton
        instancetype="GhostWithRightIcon"
        size="lg"
      >
                Copy
      </AppButton>
      <AppPill />
    </Card>
  );
}
