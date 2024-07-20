import useMetadata from "@/hooks/useMetadata";
import useOnMounted from "@/hooks/useOnMounted";
import authStore from "@/store/auth";
import copyStore from "@/store/copy";
import { CopyTradeInfo, TabsCopyTrade } from "@/ui/CopyTrade";
import TabControl from "@/ui/CopyTrade/TabControl";
import { Header } from "@/ui/Header";
import {
  Box,
  Card,
  Container,
  Loader,
  Space,
  Transition,
} from "@mantine/core";
import React, { Suspense, useEffect, useState } from "react";

const CopyTradeWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = useMetadata();
  const [mounted, setMounted] = useState(false);
  const { me } = authStore();
  useOnMounted(() => {
    setMounted(true);
  });
  useEffect(() => {
    me?.isCopyMaster &&
      setTimeout(() => {
        copyStore.getState().loadMaster();
      }, 500);
  }, [me?.isCopyMaster]);
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Loader />
        </div>
      }
    >
      <Transition
        mounted={mounted}
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Box style={styles}>
            <Header metadata={data} />
            <Space mb={"xl"} />
            <TabControl />
            <Space mb={"xl"} />
            <CopyTradeInfo />
            <Space mb={"xl"} />
            <Container fluid>
              <Card
                shadow="0 0 24px 0 rgba(18,18,20,.1)"
                padding="xl"
                radius="25px"
                w={"100%"}
              >
                <TabsCopyTrade />
                <Box>{children}</Box>
              </Card>
            </Container>
          </Box>
        )}
      </Transition>
    </Suspense>
  );
};

export default CopyTradeWrapper;
