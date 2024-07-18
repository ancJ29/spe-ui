import useTranslation from "@/hooks/useTranslation";
import NumberFormat from "@/ui/NumberFormat";
import { Box, Button, Flex, InputLabel, NumberInput, Select, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconChevronDown } from "@tabler/icons-react";

export function AddFundForm() {
  const t = useTranslation();
  return (
    <Box className="space-y-10">
      <Box>
        <InputLabel fz={16}>{t("Amount")}</InputLabel>
        <NumberInput
          rightSection={
            <Flex gap={10} pr={"sm"} align={"center"} justify={"end"} w={"100%"}>
              <Box>
                <Text>USDT</Text>
              </Box>
              <Box>
                <Button fz={16} variant="transparent" p={0} color="primary">All</Button>
              </Box>
            </Flex>
          }
          rightSectionWidth={100}
        />
      </Box>
      <Box>
        <Select
          size="lg"
          styles={{
            label: {
              fontSize: "16px"
            }
          }}
          label={t("Select Account")}
          placeholder=""
          value={"Wallet"}
          data={["Wallet"]}
          rightSection={
            <>
              <IconChevronDown />
            </>
          }
        />
      </Box>
      <Flex gap={10} justify={"end"}>
        <Text c={"dimmed"}>Available</Text>
        <Text><NumberFormat value={0} decimalPlaces={2} suffix="USDT" /></Text>
      </Flex>

      <Box w={"100%"}>
        <Button fullWidth onClick={() => modals.closeAll()}>
          {t("Confirm")}
        </Button>
      </Box>
    </Box>
  );
}
