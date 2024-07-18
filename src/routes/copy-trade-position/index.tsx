import { CopyPostion } from "@/ui/CopyTrade";
import { Box } from "@mantine/core";
import { useLocation } from "react-router-dom";

export default function Page() {
  const location = useLocation();

  return (
    <>
      <Box hidden>
        {location.pathname}
      </Box>
      <CopyPostion />
    </>
  );
}
