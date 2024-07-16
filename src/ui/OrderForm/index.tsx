import { schema } from "@/domain/schema";
import AppForm from "@/ui/Form/Form";
import { Box } from "@mantine/core";
import { convertToSpotTradeFormData } from "./config";
import { GridTradeProps } from "@/types";

export default function OrderForm({
  symbol,
  base,
  quote,
  isFuture,
}: GridTradeProps) {
  return (
    <Box className="space-y-20">
      <AppForm
        w={"100%"}
        schema={schema.PostOrderSchema.schema}
        uiSchema={schema.PostOrderSchema.uiSchema}
        formData={{
          orderSide: "BUY",
          isFuture,
          symbol,
          base,
          quote,
        }}
        api="/api/order/create"
        formDataConverter={convertToSpotTradeFormData}
        showJsonOutput={false}
      />
    </Box>
  );
}
