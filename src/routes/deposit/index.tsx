import { DepositForm } from "@/ui/Wallet/Form/DepositForm";
import { Box, Container } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Deposit() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box className="space-y-4" py={20}>
        <Box>
          <DepositForm
            coin="USDT"
            onClose={() => {
              navigate(-1);
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}
