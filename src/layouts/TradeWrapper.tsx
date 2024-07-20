import { delay } from "@/common/utils";
import useMetadata from "@/hooks/useMetadata";
import tradeStore from "@/store/trade";
import { Header } from "@/ui/Header";
import { Box, Loader, Transition } from "@mantine/core";
import React, { Suspense, useEffect, useState } from "react";

const TradeWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = useMetadata();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    tradeStore
      .getState()
      .loadAllMarketInformation()
      .then(() => delay(500))
      .then(() => setMounted(true));
  }, []);

  if (!mounted) {
    return (
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
    );
  }

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
      <>
        <Transition
          mounted={mounted}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {() => (
            <>
              <Header metadata={data} />
              <Box h={"100%"}>{children}</Box>
            </>
          )}
        </Transition>
      </>
    </Suspense>
  );
};

export default TradeWrapper;
