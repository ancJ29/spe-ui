import useTranslation from "@/hooks/useTranslation";
import {
  ActionIcon,
  Box,
  Card,
  Container,
  Divider,
  Flex,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import {
  IconArrowsHorizontal,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import NumberFormat from "../../NumberFormat";

export function CopyTradeFollowerMoneyInfo() {
  const t = useTranslation();
  const [hidden, toggle] = useToggle([false, true]);

  return (
    <>
      <Container fluid>
        <Card
          shadow="0 0 24px 0 rgba(18,18,20,.1)"
          padding="xl"
          radius="25px"
          w={"100%"}
        >
          <Flex gap={40} align={"center"}>
            <Box>
              <Flex>
                <Text>{t("Total Assets")}</Text>
                <ActionIcon
                  variant="transparent"
                  onClick={() => toggle()}
                >
                  <Box hidden={hidden}>
                    <IconEye size={18} color="gray" />
                  </Box>
                  <Box hidden={!hidden}>
                    <IconEyeOff size={18} color="gray" />
                  </Box>
                </ActionIcon>
              </Flex>
              <Flex align={"end"}>
                <Text fz={30} fw={"bold"} miw={160}>
                  <NumberFormat
                    hidden={hidden}
                    decimalPlaces={2}
                    value={0}
                  />{" "}
                  <span
                    style={{ fontSize: "30px", fontWeight: "normal" }}
                  >
                    USDT
                  </span>
                </Text>
                <Box>
                  <ActionIcon variant="transparent">
                    <IconArrowsHorizontal />
                  </ActionIcon>
                </Box>
              </Flex>
              <Text c={"dimmed"}>
                ≈
                <NumberFormat
                  prefix="$"
                  hidden={hidden}
                  decimalPlaces={2}
                  value={0}
                />{" "}
              </Text>
            </Box>
            <Flex align={"center"}>
              <Divider orientation="vertical" h={74} />
            </Flex>
            <Box>
              <Flex>
                <Text>{t("Net PnL")}</Text>
              </Flex>
              <Flex align={"end"}>
                <Text fz={30} fw={"bold"} miw={160}>
                  <NumberFormat
                    hidden={hidden}
                    decimalPlaces={2}
                    value={0}
                  />{" "}
                  <span
                    style={{ fontSize: "30px", fontWeight: "normal" }}
                  >
                    USDT
                  </span>
                </Text>
              </Flex>
              <Text c={"dimmed"}>
                ≈
                <NumberFormat
                  prefix="$"
                  hidden={hidden}
                  decimalPlaces={2}
                  value={0}
                />{" "}
              </Text>
            </Box>
          </Flex>
          <Space mb={"xl"} />
          <SimpleGrid cols={5}>
            <Box>
              <Text fz={14} c={"dimmed"}>
                {t("Unrealized PnL")}
              </Text>
              <Flex align={"center"} gap={5}>
                <Text fz={16} fw={600}>
                  <NumberFormat
                    hidden={hidden}
                    value={0}
                    decimalPlaces={2}
                  />
                </Text>
                <Text fz={14} fw={600}>
                  (
                  <NumberFormat
                    hidden={hidden}
                    value={0}
                    decimalPlaces={2}
                  />
                  %)
                </Text>
              </Flex>
            </Box>
            <Box>
              <Text fz={14} c={"dimmed"}>
                {t("Available Balance (USDT)")}
              </Text>
              <Flex align={"center"} gap={5}>
                <Text fz={16} fw={600}>
                  <NumberFormat
                    hidden={hidden}
                    value={0}
                    decimalPlaces={2}
                  />
                </Text>
              </Flex>
            </Box>
            <Box>
              <Text fz={14} c={"dimmed"}>
                {t("Withdrawable (USDT)")}
              </Text>
              <Flex align={"center"} gap={5}>
                <Text fz={16} fw={600}>
                  <NumberFormat
                    hidden={hidden}
                    value={0}
                    decimalPlaces={2}
                  />
                </Text>
              </Flex>
            </Box>
            <Box>
              <Text fz={14} c={"dimmed"}>
                {t("Settled Profit Sharing")}
              </Text>
              <Flex align={"center"} gap={5}>
                <Text fz={16} fw={600}>
                  <NumberFormat
                    hidden={hidden}
                    value={0}
                    decimalPlaces={2}
                  />
                </Text>
              </Flex>
            </Box>
            <Box>
              <Text fz={14} c={"dimmed"}>
                {t("Unsettled Profit Sharing")}
              </Text>
              <Flex align={"center"} gap={5}>
                <Text fz={16} fw={600}>
                  <NumberFormat
                    hidden={hidden}
                    value={0}
                    decimalPlaces={2}
                  />
                </Text>
              </Flex>
            </Box>
          </SimpleGrid>
        </Card>
      </Container>
    </>
  );
}
