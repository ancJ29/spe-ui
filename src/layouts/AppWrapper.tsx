import appStore from "@/store/app";
import { Loader } from "@mantine/core";
import React from "react";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = appStore();

  return (
    <div style={{ width: "100vw" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            opacity: 0.8,
            zIndex: 1000,
            backgroundColor: "white",
          }}
        >
          <Loader />
        </div>
      )}
      {children}
    </div>
  );
}
