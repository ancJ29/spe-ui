import useTranslation from "@/hooks/useTranslation";
import { Button } from "@mantine/core";
import React from "react";

const ServiceWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslation();
  return (
    <div style={{ width: "100vw" }}>
      <Button
        onClick={() => {
          localStorage.removeItem("__USER__");
          window.open("/login", "_self");
        }}
      >
        {t("Logout")}
      </Button>
      {children}
    </div>
  );
};

export default ServiceWrapper;
