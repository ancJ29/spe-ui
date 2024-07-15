import { schema } from "@/domain/schema";
import AppForm from "@/ui/Form/Form";
import { Box } from "@mantine/core";
import { convertToSpotTradeFormData } from "./config";

export default function OrderForm({
  symbol,
  base,
  quote,
  future = false,
}: {
  future?: boolean;
  symbol: string;
  base: string;
  quote: string;
}) {
  return (
    <Box className="space-y-20">
      <AppForm
        w={"100%"}
        schema={schema.PostOrderSchema.schema}
        uiSchema={schema.PostOrderSchema.uiSchema}
        formData={{
          orderSide: "BUY",
          isFuture: future,
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
