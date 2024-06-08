import React from "react";

const ServiceWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div style={{ width: "100vw" }}>{children}</div>;
};

export default ServiceWrapper;
