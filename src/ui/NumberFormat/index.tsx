import bigNumber from "@/common/big-number";
import { NumberFormatter, NumberFormatterProps } from "@mantine/core";
import { useMemo } from "react";

export default function ({
    decimalPlaces = 2,
    ...props
}: NumberFormatterProps & {decimalPlaces: number}) {
    const value = useMemo(() => {
        return bigNumber.formatNumberWithCommas(props.value as string, decimalPlaces)
    }, [props.value])
    return <>
        {value}
    </>
}
