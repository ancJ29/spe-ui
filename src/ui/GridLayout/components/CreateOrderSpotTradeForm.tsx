import AppForm from "@/ui/Form/Form";
import { samples } from "@/ui/Form/Sample";
import { Box } from "@mantine/core";
import { useRef } from "react";

interface CreateOrderTradeFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (res: any) => void;
}
export function CreateOrderSpotTradeForm({
  ...props
}: CreateOrderTradeFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<any>(null);
  return (
    <>
      <Box className="space-y-20">
        <AppForm
          w={"100%"}
          ref={formRef}
          schema={samples.NewOrderOfSpotTradeSchema.schema}
          uiSchema={samples.NewOrderOfSpotTradeSchema.uiSchema}
          formData={{
            ...samples.NewOrderOfSpotTradeSchema.formData,
            price: 1,
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

export function CreateOrderSpotMarginTradeForm({
  ...props
}: CreateOrderTradeFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<any>(null);
  return (
    <>
      <Box className="space-y-20">
        <AppForm
          w={"100%"}
          ref={formRef}
          schema={samples.NewOrderOfSpotMarginTradeSchema.schema}
          uiSchema={samples.NewOrderOfSpotMarginTradeSchema.uiSchema}
          formData={{
            ...samples.NewOrderOfSpotMarginTradeSchema.formData,
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
