import BN from "@/common/big-number";
import { NumberFormatterProps } from "@mantine/core";

export default function NumberFormat({
  decimalPlaces = 2,
  ...props
}: NumberFormatterProps & { decimalPlaces?: number }) {
  return (
    <span>
      {BN.formatNumberWithCommas(
        props.value as string,
        decimalPlaces,
      )}
    </span>
  );
}
