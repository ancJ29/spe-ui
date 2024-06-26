import AppForm from "@/ui/Form/Form";
import { samples } from "@/ui/Form/Sample";
import { Box } from "@mantine/core";
import { useCallback, useRef } from "react";

interface AddTPSLProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (res: any) => void;
}
export function CreateOrderTradeForm({
  ...props
}: AddTPSLProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<any>(null);
  return (
    <>
      <Box className="space-y-20">
        <AppForm
          w={"100%"}
          ref={formRef}
          schema={samples.LimitMarketConditionalTrade.schema}
          uiSchema={samples.LimitMarketConditionalTrade.uiSchema}
          formData={{
            ...samples.LimitMarketConditionalTrade.formData,
          }}
          onSubmit={({ formData }) => {
            if (props.onSubmit) {
              props?.onSubmit(formData);
            }
          }}
          showJsonOutput
        />
      </Box>
    </>
  );
}
