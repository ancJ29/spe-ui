import AppButton from "@/ui/Button/AppButton";
import AppForm from "@/ui/Form/Form";
import { samples } from "@/ui/Form/Sample";
import { Box, Input, SimpleGrid } from "@mantine/core";
import { FormProps } from "@rjsf/core";
import { useCallback, useRef } from "react";

type AddTPSLProps = {
    orderPrice: number
}
export function AddTpSlOfLimitTradeForm({ orderPrice = 0.4907, ...props }: AddTPSLProps) {
    const formRef = useRef(null);

    const confirm = useCallback(() => {
        alert(4)
        console.log("FORM_REF", formRef)
        if (formRef.current) {
            console.log("FORM_REF", formRef)
        }
    }, [formRef])
    return (
        <>
            <Box className="space-y-20" h={"100%"} mah={"698px"}>
                <AppForm w={"100%"}
                    ref={formRef}
                    schema={samples.LimitMarketConditionalTrade.schema}
                    uiSchema={
                        samples.LimitMarketConditionalTrade.uiSchema
                    }
                    formData={
                        {
                            ...samples.LimitMarketConditionalTrade.formData,
                            orderPrice
                        }
                    }
                    showJsonOutput />
                <SimpleGrid cols={2} bg={"dark"} py={10} styles={{
                    root: {
                        position: "sticky",
                        bottom: 0,
                        left: 0,
                        zIndex: 4
                    }
                }}>
                    <AppButton color="primary" onClick={confirm}>Confirm</AppButton>
                    <AppButton color="gray">Cancel</AppButton>
                </SimpleGrid>
            </Box>
        </>
    )
}
