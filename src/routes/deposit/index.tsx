import { DepositForm } from "@/ui/Wallet";
import { Box, Container } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Page() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box className="space-y-4" py={20}>
        <Box>
          <DepositForm
            onClose={() => {
              navigate(-1);
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}
