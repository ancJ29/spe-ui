import useMetadata from "@/hooks/useMetadata";
import { Header } from "@/ui/Header";
import { Box } from "@mantine/core";
import React from "react";

const ServiceWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = useMetadata();
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
