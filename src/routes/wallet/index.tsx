import { useTradeStorageInfo } from "@/services/tradeAdapter";
import NumberFormat from "@/ui/NumberFormat";
import { DepositForm, SwapForm, TabsWallet, TransferForm, WithdrawForm } from "@/ui/Wallet";
import { Box, Button, Card, Container, Divider, Flex, SimpleGrid, Space, Text, Title, useMantineColorScheme } from "@mantine/core";
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
        <Flex justify={"space-between"} align={"center"}>
          <Title order={2}>Funding Account</Title>
          <Flex align={"center"} h={"100%"}>
            <Button component="a" href="/wallet/records" variant="gradient" rightSection={<IconHistory />}
              gradient={{ from: "primary", to: "yellow", deg: 90 }}>History</Button>
          </Flex>
        </Flex>
        <Space mb={20} />
        <SimpleGrid cols={3}>
          <Box>
            <Card shadow="0 0 24px 0 rgba(18,18,20,.1)" padding="lg" radius="25px" w={"100%"}>
              <Text c={"dimmed"}>Total Equity</Text>
              <Flex align={"end"}>
                <Text fz={24} fw={"bold"}>
                  <NumberFormat decimalPlaces={2} value={balances?.overview['all']?.totalInUsd} />
                  {" "}
                  <span style={{ fontSize: "14px", fontWeight: "bold" }}>USD</span>
                </Text>

              </Flex>
              <Text c={"dimmed"}>
                ≈ <NumberFormat decimalPlaces={8} value={balances?.overview['all']?.totalInUsd} /> BTC
              </Text>
            </Card>
          </Box>
          <Box>
            <Card shadow="0 0 24px 0 rgba(18,18,20,.1)" padding="lg" radius="25px" w={"100%"}>
              <Text c={"dimmed"}>Available Balance</Text>
              <Flex align={"end"}>
                <Text fz={24} fw={"bold"}>
                  <NumberFormat decimalPlaces={2} value={balances?.overview['all']?.totalInUsd} /> {" "}
                  <span style={{ fontSize: "14px", fontWeight: "bold" }}>USD</span>
                </Text>

              </Flex>
              <Text c={"dimmed"}>≈ <NumberFormat decimalPlaces={8} value={balances?.overview['all']?.totalInUsd} /> BTC</Text>
            </Card>
          </Box>
          <Box ml={"auto"}>

          </Box>
        </SimpleGrid>
        <Space mb={20} />
        <Box>
          <TabsWallet />
        </Box>
        <Box hidden>
          <SwapForm onSubmit={res => { }} />
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
