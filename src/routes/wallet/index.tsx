import { useTradeStorageInfo } from "@/services/tradeAdapter";
import NumberFormat from "@/ui/NumberFormat";
import { DepositForm, SwapForm, TabsWallet, TransferForm, WithdrawForm } from "@/ui/Wallet";
import { Box, Button, Container, Divider, Flex, SimpleGrid, Space, Text, Title, useMantineColorScheme } from "@mantine/core";
import { IconHistory } from "@tabler/icons-react";
import { useEffect } from "react";

export default function Page() {
  const { accounts, balances, depositAddress } = useTradeStorageInfo();
  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setColorScheme("light");
  }, [])
  return (
    <Container fluid>
      <Box className="space-y-4" py={10}>
      <Space mt={20} />
        <Title order={2}>Funding Account</Title>
        <Space mb={20} />
        <SimpleGrid cols={3}>
          <Box>
            <Text c={"dimmed"}>Total Equity</Text>
            <Flex align={"end"}>
              <Text fz={24} fw={"bold"}>
                <NumberFormat decimalPlaces={2} value={balances?.overview['all']?.totalInUsd}/>
              {" "}
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>USD</span>
              </Text>

            </Flex>
            <Text c={"dimmed"}>
              ≈ <NumberFormat decimalPlaces={8} value={balances?.overview['all']?.totalInUsd}/> BTC
              </Text>
          </Box>
          <Box>
            <Text c={"dimmed"}>Available Balance</Text>
            <Flex align={"end"}>
              <Text fz={24} fw={"bold"}>
              <NumberFormat decimalPlaces={2} value={balances?.overview['all']?.totalInUsd}/> {" "}
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>USD</span>
              </Text>

            </Flex>
            <Text c={"dimmed"}>≈ <NumberFormat decimalPlaces={8} value={balances?.overview['all']?.totalInUsd}/> BTC</Text>
          </Box>
          <Box ml={"auto"}>
            <Button component="a" href="/wallet/history" variant="gradient" rightSection={<IconHistory />}
              gradient={{ from: "primary", to: "yellow", deg: 90 }}>History</Button>
          </Box>
        </SimpleGrid>
        <Space mb={20} />
        <Divider />
        <Box>
          <TabsWallet />
        </Box>

        <Box hidden>
          <Box>
            <DepositForm onSubmit={res => { }} />
          </Box>
          <Box>
            <SwapForm onSubmit={res => { }} />
          </Box>
          <Box>
            <TransferForm onSubmit={res => { }} />
          </Box>
          <Box>
            <WithdrawForm onSubmit={res => { }} />
          </Box>
        </Box>
        <Box hidden>
          <Title order={4}>Accounts</Title>
          {JSON.stringify(accounts)}
        </Box>
      </Box>
    </Container>
  );
}
