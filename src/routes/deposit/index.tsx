import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { DepositForm } from "@/ui/Wallet";
import { Box, Container, Title } from "@mantine/core";

export default function Page() {
  const { accounts, balances, depositAddress } = useTradeStorageInfo();
  return (
    <Container>
      <Box className="space-y-4" py={20}>
        <Box>
          <Title order={2}>Deposit</Title>
          <DepositForm onSubmit={(res) => {
            alert(JSON.stringify(res.formData));
          }}
          />
        </Box>
      </Box>
    </Container>
  );
}
