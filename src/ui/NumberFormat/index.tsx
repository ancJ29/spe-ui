import BN from "@/common/big-number";

type NumberFormatProps = {
  decimalPlaces?: number;
  hidden?: boolean;
  prefix?: string;
  suffix?: string;
  value: string | number | undefined;
};

export default function NumberFormat({
  decimalPlaces = 2,
  hidden,
  prefix = "",
  suffix = "",
  value,
}: NumberFormatProps) {
  if (hidden) {
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
