import { schema } from "@/domain/schema";
import { GridTradeProps } from "@/types";
import AppForm from "@/ui/Form/Form";
import { Box } from "@mantine/core";
import { convertToSpotTradeFormData } from "./config";

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
          type: "Market",
          triggerPrice: 0,
          orderPrice: 0,
          leverage: isFuture ? 5 : 1,
          orderSide: "BUY",
          isFuture,
          symbol,
          base,
          quote,
        }}
        api="/api/order/create"
        formDataConverter={convertToSpotTradeFormData}
        showJsonOutput
      />
    </Box>
  );
}
