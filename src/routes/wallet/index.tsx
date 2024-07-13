import BN from "@/common/big-number";
import useTranslation from "@/hooks/useTranslation";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import NumberFormat from "@/ui/NumberFormat";
import { TabsWallet } from "@/ui/Wallet";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import { IconHistory } from "@tabler/icons-react";
import { useMemo } from "react";

export default function Wallet() {
  const t = useTranslation();
  const { overview, balances } = useTradeStorageInfo();

  const { totalInUsd, totalInBtc, availableInUsd, availableInBtc } =
    useMemo(() => {
      let lockedInUsd = "0",
        lockedInBtc = "0";
      balances.forEach((balance) => {
        lockedInBtc = BN.add(lockedInUsd, balance.lockedBtcValue);
        lockedInUsd = BN.add(lockedInBtc, balance.lockedUsdValue);
      });
      return {
        totalInUsd: overview.all?.totalInUsd,
        totalInBtc: overview.all?.totalInBtc,
        availableInUsd: BN.sub(overview.all?.totalInUsd, lockedInUsd),
        availableInBtc: BN.sub(overview.all?.totalInBtc, lockedInBtc),
      };
    }, [overview, balances]);

  return (
    <Container fluid>
      <Box className="space-y-4" py={10}>
        <Space mt={20} />
        <SimpleGrid cols={3}>
          <Box>
            <Card
              shadow="0 0 24px 0 rgba(18,18,20,.1)"
              padding="lg"
              radius="25px"
              w={"100%"}
            >
              <Text c={"dimmed"}>{t("Total Equity")}</Text>
              <Flex align={"end"}>
                <Text fz={24} fw={"bold"}>
                  <NumberFormat
                    decimalPlaces={2}
                    value={totalInUsd}
                  />{" "}
                  <span
                    style={{ fontSize: "14px", fontWeight: "bold" }}
                  >
                    USD
                  </span>
                </Text>
              </Flex>
              <Text c={"dimmed"}>
                ~{" "}
                <NumberFormat decimalPlaces={8} value={totalInBtc} />{" "}
                BTC
              </Text>
            </Card>
          </Box>
          <Box>
            <Card
              shadow="0 0 24px 0 rgba(18,18,20,.1)"
              padding="lg"
              radius="25px"
              w={"100%"}
            >
              <Text c={"dimmed"}>{t("Available Balance")}</Text>
              <Flex align={"end"}>
                <Text fz={24} fw={"bold"}>
                  <NumberFormat
                    decimalPlaces={2}
                    value={availableInUsd}
                  />{" "}
                  <span
                    style={{ fontSize: "14px", fontWeight: "bold" }}
                  >
                    USD
                  </span>
                </Text>
              </Flex>
              <Text c={"dimmed"}>
                ~{" "}
                <NumberFormat
                  decimalPlaces={8}
                  value={availableInBtc}
                />{" "}
                BTC
              </Text>
            </Card>
          </Box>
          <Box ml={"auto"}>
            <Flex align={"right"} h={"100%"}>
              <Button
                component="a"
                href="/wallet/records/swap"
                variant="gradient"
                gradient={{ from: "primary", to: "yellow", deg: 90 }}
                rightSection={<IconHistory />}
              >
                {t("History")}
              </Button>
            </Flex>
          </Box>
        </SimpleGrid>
        <Space mb={20} />
        <Box>
          <TabsWallet />
        </Box>
      </Box>
    </Container>
  );
}
