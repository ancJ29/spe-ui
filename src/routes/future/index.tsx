import { GridTradeSpot } from "@/ui/GridLayout/spot";
import { Box } from "@mantine/core";
import { useParams } from "react-router-dom";

export default function FuturePage() {
  const { base, quote } = useParams();
  return (
    <Box className="bg-dark">
      <GridTradeSpot
        isFuture
        symbol={`${base || ""}${quote || ""}`}
        base={base || ""}
        quote={quote || ""}
      />
    </Box>
  );
}
