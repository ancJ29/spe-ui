import useTranslation from "@/hooks/useTranslation";
import { Box, Button, Flex, InputLabel, NumberInput, SimpleGrid, Slider, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

export function CopyTradingSettingsForm() {
  const t = useTranslation();
  return (
    <Box className="space-y-10">
      <Box>
        <InputLabel fz={16}>{t("Copy Trade Ratio")}</InputLabel>
        <NumberInput hideControls />
      </Box>
      <SimpleGrid cols={2}>
        <Box>
          <InputLabel fz={16}>{t("Min/Max. Margin Per Order")}</InputLabel>
          <NumberInput
            rightSectionWidth={100}
            rightSection={
              <Flex pr={"sm"} justify={"end"} w={"100%"}>USDT</Flex>
            }
          />
        </Box>
        <Box>
          <InputLabel></InputLabel>
          <NumberInput
            rightSection={
              <Flex pr={"sm"} justify={"end"} w={"100%"}>USDT</Flex>
            }
            rightSectionWidth={100}
          />
        </Box>
      </SimpleGrid>
      <Box>
        <InputLabel>{t("Max. Margin Per Month")}</InputLabel>
        <NumberInput
          rightSection={
            <Flex pr={"sm"} justify={"end"} w={"100%"}>USDT</Flex>
          }
          rightSectionWidth={100}
        />
      </Box>
      <Box>
        <Flex justify={"space-between"} w={"100%"}>
          <InputLabel fz={16}>Take-Profit Ratio</InputLabel>
          <Box>
            <Text fw={"bold"}>40%</Text>
          </Box>
        </Flex>
        <Slider
          h={40}
          color="primary"
          marks={[
            { value: 0, label: "0%" },
            { value: 20, label: "20%" },
            { value: 40, label: "40%" },
            { value: 60, label: "60%" },
            { value: 80, label: "80%" },
            { value: 100, label: "100%" },
          ]}
          styles={{
            markLabel: {
              display: "none"
            }
          }}
        />
      </Box>
      <Box>
        <Flex justify={"space-between"} w={"100%"}>
          <InputLabel fz={16}>Stop-Loss Ratio</InputLabel>
          <Box>
            <Text fw={"bold"}>40%</Text>
          </Box>
        </Flex>
        <Slider
          color="primary"
          h={40}
          marks={[
            { value: 0, label: "0%" },
            { value: 20, label: "20%" },
            { value: 40, label: "40%" },
            { value: 60, label: "60%" },
            { value: 80, label: "80%" },
            { value: 100, label: "100%" },
          ]}
          styles={{
            markLabel: {
              display: "none"
            }
          }}
        />
      </Box>
      <Box w={"100%"}>
        <Button fullWidth onClick={() => modals.closeAll()}>
          {t("Confirm")}
        </Button>
      </Box>
    </Box>
  );
}
