import { schema } from "@/domain/schema";
import AppForm from "@/ui/Form/Form";
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
          schema={schema.NewOrderOfSpotTradeSchema.schema}
          uiSchema={schema.NewOrderOfSpotTradeSchema.uiSchema}
          formData={{
            ...schema.NewOrderOfSpotTradeSchema.formData,
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
          schema={schema.NewOrderOfSpotMarginTradeSchema.schema}
          uiSchema={schema.NewOrderOfSpotMarginTradeSchema.uiSchema}
          formData={{
            ...schema.NewOrderOfSpotMarginTradeSchema.formData,
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
