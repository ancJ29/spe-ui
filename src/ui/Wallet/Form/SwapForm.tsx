import AppForm from "@/ui/Form/Form";
import { samples } from "@/ui/Form/Sample";
import { Card, Space, Title } from "@mantine/core";
import { IChangeEvent } from "@rjsf/core";
import { convertToSwapFormData } from "./config";

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (res: IChangeEvent) => void;
}
export function SwapForm(props: FormProps) {
  return (
    <>
      <Card p={"32px"} shadow="0 0 24px 0 rgba(18,18,20,.1)" padding="lg" radius="25px" maw={"600px"} w={"100%"} mx={"auto"}>
        <Title order={3}>Swap</Title>
        <Space my={10}/>
        <AppForm
          w={"100%"}
          schema={samples.FundSwapSchema.schema}
          uiSchema={samples.FundSwapSchema.uiSchema}
          formData={{
            ...samples.FundSwapSchema.formData,
          }}
          showJsonOutput
          api="/api/order/swap"
          formDataConverter={convertToSwapFormData}
          onSuccess={props.onSubmit}
        />
      </Card>
    </>
  );
}
