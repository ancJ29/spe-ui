import useMetadata from "@/hooks/useMetadata";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { Header } from "@/ui/Header";
import { Box, useMantineColorScheme } from "@mantine/core";
import React, { useEffect } from "react";


const ServiceWrapper = ({ children }: { children: React.ReactNode;}) => {
  const { data } = useMetadata();
  const { setColorScheme } = useMantineColorScheme();
  const { initialAll } = useTradeStorageInfo();
  useEffect(() => {
    // setColorScheme("dark");
    initialAll();
  }, []);
  return (
    <>
      <Header metadata={data} />
      <Box className="bg-dark" h={"100%"}>
        {children}
      </Box>
    </>
  );
};

export default ServiceWrapper;
