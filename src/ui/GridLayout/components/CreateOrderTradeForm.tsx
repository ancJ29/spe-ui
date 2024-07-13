import { schema } from "@/domain/schema";
import AppForm from "@/ui/Form/Form";
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
          schema={schema.NewOrderOfLimitTradeSchema.schema}
          uiSchema={schema.NewOrderOfLimitTradeSchema.uiSchema}
          formData={{
            ...schema.NewOrderOfLimitTradeSchema.formData,
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
          schema={schema.NewOrderOfMarketTradeSchema.schema}
          uiSchema={schema.NewOrderOfMarketTradeSchema.uiSchema}
          formData={{
            ...schema.NewOrderOfMarketTradeSchema.formData,
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
          schema={schema.NewOrderOfConditionalTradeSchema.schema}
          uiSchema={schema.NewOrderOfConditionalTradeSchema.uiSchema}
          formData={{
            ...schema.NewOrderOfConditionalTradeSchema.formData,
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
