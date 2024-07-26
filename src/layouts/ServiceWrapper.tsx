import useMetadata from "@/hooks/useMetadata";
import { Footer } from "@/routes/top-page";
import appStore from "@/store/app";
import { Header } from "@/ui/Header";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppWrapper from "./AppWrapper";
import { Divider } from "@mantine/core";

export default function ServiceWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useLocation();
  const { data } = useMetadata();

  useEffect(() => {
    appStore.getState().toggleLoading(true);
    setTimeout(() => {
      appStore.getState().toggleLoading(false);
    }, 200);
  }, [pathname]);

  return (
    <AppWrapper>
      <Header metadata={data} />
      {children}
      <Divider />
      <Footer metadata={data} />
    </AppWrapper>
  );
}
