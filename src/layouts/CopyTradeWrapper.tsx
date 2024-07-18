import useMetadata from "@/hooks/useMetadata";
import useOnMounted from "@/hooks/useOnMounted";
import { CopyTradeInfo, TabsCopyTrade } from "@/ui/CopyTrade";
import { CopyTradeSwitchMode } from "@/ui/CopyTrade/Infos/CopyTradeSwitchMode";
import { Header } from "@/ui/Header";
import { Box, Card, Container, Loader, Space, Transition } from "@mantine/core";
import React, { Suspense, useState } from "react";

const CopyTradeWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = useMetadata();
  const [mounted, setMounted] = useState(false);
  useOnMounted(() => {
    setMounted(true);
  });
  return (
    <Suspense fallback={<div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Loader />
    </div>}
    >
      <>
        <Transition
          mounted={mounted}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => <Box style={styles}>
            <Header metadata={data} />
            <Space mb={"xl"} />
            <CopyTradeSwitchMode/>
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
          </Box>}
        </Transition>

      </>
    </Suspense>
  );
};

export default CopyTradeWrapper;
