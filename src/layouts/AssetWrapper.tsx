import useMetadata from "@/hooks/useMetadata";
import useOnMounted from "@/hooks/useOnMounted";
import { useAssetStore } from "@/store/assets";
import { Header } from "@/ui/Header";
import { Box } from "@mantine/core";
import React from "react";
const AssetWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = useMetadata();
  useOnMounted(() => {
    useAssetStore.getState().initial();
  });
  return (
    <>
      <Header metadata={data} />
      <Box h={"100%"}>{children}</Box>
    </>
  );
};

export default AssetWrapper;
