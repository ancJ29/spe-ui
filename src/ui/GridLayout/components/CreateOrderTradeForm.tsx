import AppForm from "@/ui/Form/Form";
import { samples } from "@/ui/Form/Sample";
import { Box } from "@mantine/core";
import { useRef } from "react";

interface CreateOrderTradeFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (res: any) => void;
}
export function CreateOrderTradeByLimitForm({
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
          schema={samples.NewOrderOfLimitTradeSchema.schema}
          uiSchema={samples.NewOrderOfLimitTradeSchema.uiSchema}
          formData={{
            ...samples.NewOrderOfLimitTradeSchema.formData,
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

export function CreateOrderTradeByMarketForm({
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
          schema={samples.NewOrderOfMarketTradeSchema.schema}
          uiSchema={samples.NewOrderOfMarketTradeSchema.uiSchema}
          formData={{
            ...samples.NewOrderOfMarketTradeSchema.formData,
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

export function CreateOrderTradeByConditionalForm({
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
          schema={samples.NewOrderOfConditionalTradeSchema.schema}
          uiSchema={samples.NewOrderOfConditionalTradeSchema.uiSchema}
          formData={{
            ...samples.NewOrderOfConditionalTradeSchema.formData,
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
