import BN from "@/common/big-number";

type NumberFormatProps = {
  decimalPlaces?: number;
  isOff?: boolean;
  prefix?: string;
  suffix?: string;
  value: string | number | undefined;
};

export default function NumberFormat({
  decimalPlaces = 2,
  isOff,
  prefix = "",
  suffix = "",
  value,
}: NumberFormatProps) {
  if (isOff) {
    return <span>****</span>;
  }
  if (value === undefined) {
    return "--";
  }
  return (
    <span>
      {`${prefix}${BN.formatNumberWithCommas(
        value,
        decimalPlaces,
      )} ${suffix}`}
    </span>
  );
}
