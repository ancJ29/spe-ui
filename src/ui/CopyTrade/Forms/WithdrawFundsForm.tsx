import useTranslation from "@/hooks/useTranslation";
import NumberFormat from "@/ui/NumberFormat";
import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  InputLabel,
  NumberInput,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";

export function WithdrawFundsForm() {
  const t = useTranslation();
  return (
    <Box className="space-y-20">
      <Text c={"error"}>
        {t(
          "You have open positions or unsettled profit. Withdrawal unavailable for now.",
        )}
      </Text>
      <Box>
        <InputLabel fz={16}>{t("Amount")}</InputLabel>
        <NumberInput
          rightSection={
            <Flex
              gap={10}
              pr={"sm"}
              align={"center"}
              justify={"end"}
              w={"100%"}
            >
              <Box>
                <Text>USDT</Text>
              </Box>
              <Box>
                <Button
                  fz={16}
                  variant="transparent"
                  p={0}
                  color="primary"
                >
                  All
                </Button>
              </Box>
            </Flex>
          }
          rightSectionWidth={100}
        />
      </Box>
      <Flex gap={10} justify={"end"}>
        <Text c={"dimmed"}>{t("Withdrawable")}</Text>
        <Text>
          <NumberFormat value={0} decimalPlaces={2} suffix="USDT" />
        </Text>
      </Flex>
      <Box>
        <InputLabel fz={16}>{t("Current Position")}</InputLabel>
        <Card bg="gray.2" p={"lg"}>
          <Box>
            <Flex gap={10} align={"center"} mb={"lg"}>
              <Image
                w={40}
                h={40}
                src={"/images/bybit/assets/btc.svg"}
              />
              <Text>BTCUSDT</Text>
              <Text c={"green"}>Long 5x</Text>
            </Flex>
            <SimpleGrid cols={2}>
              <Box>
                <Text c={"dimmed"}>{t("Entry price")}</Text>
                <Text fz={20}>
                  <NumberFormat
                    value={59976.2932}
                    decimalPlaces={2}
                  />
                </Text>
              </Box>
              <Box>
                <Text c={"dimmed"}>{t("Position Margin")}</Text>
                <Text fz={20}>
                  <NumberFormat
                    value={59976.2932}
                    decimalPlaces={2}
                  />
                </Text>
              </Box>
              <Box>
                <Text c={"dimmed"}>{t("Qty")}</Text>
                <Text fz={20}>
                  <NumberFormat
                    value={0.942543543}
                    decimalPlaces={3}
                  />
                </Text>
              </Box>
              <Box>
                <Text c={"dimmed"}>{t("Unrealized Pnl(%)")}</Text>
                <Text fz={20} c={"green"}>
                  <NumberFormat
                    prefix="+"
                    value={2637.51}
                    decimalPlaces={3}
                  />
                </Text>
                <Text fz={20} c={"green"}>
                  <NumberFormat
                    value={22.3}
                    decimalPlaces={2}
                    prefix="+"
                    suffix="%"
                  />
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </Card>
      </Box>

      <Box w={"100%"}>
        <Button fullWidth onClick={() => modals.closeAll()}>
          {t("Confirm")}
        </Button>
      </Box>
    </Box>
  );
}
