import useMetadata from "@/hooks/useMetadata";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { Header } from "@/ui/Header";
import { Box } from "@mantine/core";
import React, { useEffect } from "react";

const ServiceWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = useMetadata();
  const { initialAll } = useTradeStorageInfo();
  useEffect(() => {
    initialAll();
  }, []);
  return (
    <>
      <Header metadata={data} />
      <Box h={"100%"}>
        {children}
      </Box>
    </>
  );
};

export default ServiceWrapper;
