import AppForm from "@/ui/Form/Form";
import { samples } from "@/ui/Form/Sample";
import { Card, Space, Title } from "@mantine/core";
import { IChangeEvent } from "@rjsf/core";
import { convertToDepositFormData } from "./config";

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (res: IChangeEvent) => void;
  maw?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export function DepositForm(props: FormProps) {
  return (
    <>
      <Card
        p={"32px"}
        shadow="0 0 24px 0 rgba(18,18,20,.1)"
        padding="lg"
        radius="25px"
        maw={props.maw ? props.maw : "600px"}
        w={"100%"}
        mx={"auto"}
      >
        <Title order={3}>Deposit</Title>
        <Space my={10} />
        <AppForm
          w={"100%"}
          schema={samples.DepositSchema.schema}
          uiSchema={samples.DepositSchema.uiSchema}
          formData={{
            ...samples.DepositSchema.formData,
          }}
          showJsonOutput
          api="/internal-api/deposit"
          formDataConverter={convertToDepositFormData}
          onSuccess={props.onSubmit}
        />
      </Card>
    </>
  );
}
