import { GridTradeSpot } from "@/ui/GridLayout/spot";
import { Box } from "@mantine/core";
import { useParams } from "react-router-dom";

export default function IndexPage() {
  const { base, quote } = useParams();
  return (
    <Box className="bg-dark">
      <GridTradeSpot
        isSpot
        symbol={`${base || ""}_${quote || ""}_SPOT`}
        base={base || ""}
        quote={quote || ""}
      />
    </Box>
  );
}
