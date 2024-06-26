import AppButton from "@/ui/Button/AppButton";
import { Box, Flex } from "@mantine/core";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

type FilterButtons = {
    value: string;
    label: string;
    order: number;
    pos: "right" | "left";
};

type FilterGroupButtonsType = {
    items: FilterButtons[];
    value?: string;
    valueRight?: string;
    onChange?: (values: string[], valuesRight: string[]) => void;
};
export function FilterGroupButtons({ ...props }: FilterGroupButtonsType) {
    const [filterValues, setFilterValues] = useState<string[]>([
        props.value as string,
    ]);

    // prettier-ignore
    const [filterValuesRight, setFilterValuesRight] = useState<string[]>([props.valueRight as string]);

    useEffect(() => {
        const left =
            (props.items
                .filter((i) => i?.pos === "left")
                .sort((a, b) => a?.order - b?.order) as FilterButtons[]) ??
            [];
        const right =
            (props.items
                .filter((i) => i?.pos === "right")
                .sort((a, b) => a?.order - b?.order) as FilterButtons[]) ??
            [];
        if (left.length > 0) {
            setFilterValues([left[0].value]);
        }
        if (right.length > 0) {
            setFilterValuesRight([right[0].value]);
        }
    }, [props.items]);

    useEffect(() => {
        if (props.onChange) {
            props.onChange(filterValues, filterValuesRight);
        }
    }, [filterValues, filterValuesRight, props]);

    const _items = useMemo(() => {
        const left = props.items
            .filter((i) => i?.pos === "left")
            .sort((a, b) => a?.order - b?.order) as FilterButtons[];
        const right = props.items
            .filter((i) => i?.pos === "right")
            .sort((a, b) => a?.order - b?.order) as FilterButtons[];
        return {
            left,
            right,
        };
    }, [props.items]);

    const _styles = useMemo(() => {
        return {
            left: {
                active: {
                    bg: "dark",
                },
                default: {
                    color: "light",
                    variant: "subtle",
                },
            },
            right: {
                active: {
                    color: "white",
                    fw: "bolder",
                },
                default: {
                    color: "light",
                },
            },
        };
    }, []);

    const onChange = useCallback((value: string, isRight = false) => {
        if (isRight) {
            setFilterValuesRight([value]);
        } else {
            setFilterValues([value]);
        }
    }, []);

    return (
        <>
            <Flex gap={12} my={10} align={"center"}>
                {_items.left.map((item: FilterButtons, i) => (
                    <Fragment key={i}>
                        <AppButton
                            onClick={() => onChange(item.value)}
                            size="compact-xs"
                            fz={12}
                            value={item.value}
                            {...(filterValues.includes(item.value)
                                ? _styles.left.active
                                : _styles.left.default)}
                        >
                            {item.label}
                        </AppButton>
                    </Fragment>
                ))}
                <Box>
                    <Box h={20} w={1} bg={"dark"} />
                </Box>
                {_items.right.map((item: FilterButtons, i) => (
                    <Fragment key={i}>
                        <AppButton
                            onClick={() => onChange(item.value, true)}
                            px={0}
                            size="compact-xs"
                            fz={12}
                            variant="subtle"
                            value={item.value}
                            {...(filterValuesRight.includes(item.value)
                                ? _styles.right.active
                                : _styles.right.default)}
                        >
                            {item.label}
                        </AppButton>
                    </Fragment>
                ))}
            </Flex>
        </>
    );
}
