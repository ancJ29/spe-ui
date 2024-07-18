import { ActionIcon, Box, Button, Card, Center, Container, Divider, Flex, rem, SegmentedControl, SimpleGrid, Space, Text } from "@mantine/core";
import NumberFormat from "../../NumberFormat";
import { IconArrowsHorizontal, IconCopyright, IconEye, IconEyeOff, IconHome, IconSettings } from "@tabler/icons-react";
import useTranslation from "@/hooks/useTranslation";
import { useToggle } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { CopyTradingSettingsForm } from "../Forms";
import { useState } from "react";

export function CopyTradeFollowerMoneyMasterInfo() {
  const t = useTranslation();
  const [isOff, toggle] = useToggle([false, true]);
  const [mode] = useState<"1" | "3">("1");
  return (
    <>
      <Container fluid>
        <Card
          shadow="0 0 24px 0 rgba(18,18,20,.1)"
          padding="xl"
          radius="25px"
          w={"100%"}
        >
          <Flex justify={"space-between"}>
            <Flex gap={30} align={"center"}>
              <Box>
                <Flex>
                  <Text>{t("Est. Total Profit Sharing")}</Text>
                  <ActionIcon variant="transparent" onClick={() => toggle()}>
                    <Box hidden={isOff}>
                      <IconEye size={18} color="gray" />
                    </Box>
                    <Box hidden={!isOff}>
                      <IconEyeOff size={18} color="gray" />
                    </Box>
                  </ActionIcon>
                </Flex>
                <Flex align={"end"}>
                  <Text fz={30} fw={"bold"} miw={160}>
                    <NumberFormat
                      isOff={isOff}
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
                                    ≈<NumberFormat prefix="$" isOff={isOff} decimalPlaces={2} value={0} />{" "}
                </Text>
              </Box>
              <SimpleGrid
                cols={2}
                styles={{
                  root: {
                    gap: 10
                  }
                }}
              >
                <Box bg={"gray.2"} p={"5px 10px"} style={{ borderRadius: "5px" }}>
                  <Text>Master Profit Sharing: 0%</Text>
                </Box>
                <Box bg={"gray.2"} p={"5px 10px"} style={{ borderRadius: "5px" }}>
                  <Text>Promoter Profit Sharing: 0%</Text>
                </Box>
              </SimpleGrid>
            </Flex>
            <Button
              onClick={() => {
                modals.open({
                  title: t("Copy Trading Settings"),
                  centered: true,
                  withinPortal: true,
                  size: "lg",
                  padding: "xl",
                  portalProps: {

                  },
                  styles: {
                    title: {
                      fontSize: "20px"
                    },
                  },
                  children: (
                    <>
                      <CopyTradingSettingsForm />
                    </>
                  ),
                });
              }}
              variant="gradient"
              gradient={{ from: "primary", to: "yellow", deg: 90 }}
              justify="space-between"
              leftSection={
                <><IconSettings /></>
              }
            >
                            My Setting
            </Button>
          </Flex>
          <Space mb={"xl"} />
          <SimpleGrid cols={6}>
            <Box>
              <Text fz={14} c={"dimmed"}>{t("Settlement Method")}</Text>
            </Box>
            <Box>
              <Text fz={14} c={"dimmed"}>{t("Curr. Followers")}</Text>
              <Flex align={"center"} gap={5}>
                <Text fz={16} fw={600}>
                  <NumberFormat isOff={isOff} value={0} decimalPlaces={2} />
                </Text>
                <Text fz={14} fw={600}>
                                    (<NumberFormat isOff={isOff} value={0} decimalPlaces={2} />%)
                </Text>
              </Flex>
            </Box>
            <Box>
              <Text fz={14} c={"dimmed"}>{t("Follower’s AUM")}</Text>
              <Flex align={"center"} gap={5}>
                <Text fz={16} fw={600}>
                  <NumberFormat isOff={isOff} value={0} decimalPlaces={2} />
                </Text>
              </Flex>
            </Box>
            <Box>
              <Text fz={14} c={"dimmed"}>{t("My Promoters")}</Text>
              <Flex align={"center"} gap={5}>
                <Text fz={16} fw={600}>
                  <NumberFormat isOff={isOff} value={0} decimalPlaces={2} />
                </Text>
              </Flex>
            </Box>
            <Box>
              <Text fz={14} c={"dimmed"}>{t("Settled Profit Sharing")}</Text>
              <Flex align={"center"} gap={5}>
                <Text fz={16} fw={600}>
                  <NumberFormat isOff={isOff} value={0} decimalPlaces={2} suffix="USDT" />
                </Text>
              </Flex>
            </Box>
            <Box>
              <Text fz={14} c={"dimmed"}>{t("Unsettled Profit Sharing")}</Text>
              <Flex align={"center"} gap={5}>
                <Text fz={16} fw={600}>
                  <NumberFormat isOff={isOff} value={0} decimalPlaces={2} suffix="USDT" />
                </Text>
              </Flex>
            </Box>
          </SimpleGrid>
        </Card>
      </Container >
    </>
  );
}
