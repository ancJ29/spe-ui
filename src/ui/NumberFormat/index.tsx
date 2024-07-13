import BN from "@/common/big-number";
import { NumberFormatterProps } from "@mantine/core";
import { useMemo } from "react";

export default function NumberFormat({
  decimalPlaces = 2,
  ...props
}: NumberFormatterProps & { decimalPlaces: number }) {
  const value = useMemo(() => {
    return BN.formatNumberWithCommas(
      props.value as string,
      decimalPlaces,
    );
  }, [decimalPlaces, props.value]);
  return <>{value}</>;
}
