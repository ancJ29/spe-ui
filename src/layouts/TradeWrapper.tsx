import useMetadata from "@/hooks/useMetadata";
import tradeStore from "@/store/trade";
import { Header } from "@/ui/Header";
import { Box } from "@mantine/core";
import React, { useEffect } from "react";

const TradeWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = useMetadata();

  useEffect(() => {
    tradeStore.getState().loadAllMarketInformation();
  }, []);

  return (
    <>
      <Header metadata={data} />
      <Box h={"100%"}>{children}</Box>
    </>
  );
};

export default TradeWrapper;
