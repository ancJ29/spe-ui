import { schema } from "@/domain/schema";
import useTranslation from "@/hooks/useTranslation";
import AppForm from "@/ui/Form/Form";
import { Card, Space, Title } from "@mantine/core";
import { IChangeEvent } from "@rjsf/core";
import { convertToTransferFormData } from "./config";

type TransferFormProps = {
  onSubmit?: (res: IChangeEvent) => void;
};
export function TransferForm(props: TransferFormProps) {
  const t = useTranslation();

  return (
    <>
      <Card
        p={"32px"}
        shadow="0 0 24px 0 rgba(18,18,20,.1)"
        padding="lg"
        radius="25px"
        maw={"600px"}
        w={"100%"}
        mx={"auto"}
      >
        <Title order={3}>{t("Transfer")}</Title>
        <Space my={10} />
        <AppForm
          w={"100%"}
          schema={schema.TransferSchema.schema}
          uiSchema={schema.TransferSchema.uiSchema}
          formData={schema.TransferSchema.formData}
          showJsonOutput
          api="/api/transfer"
          formDataConverter={convertToTransferFormData}
          messages={{
            titleError: t("Transfer Unsuccessful"),
            titleSuccess: t("Transfer Successful"),
            msgSuccess: t(
              "The transaction was successful and your funds have been transferred.",
            ),
          }}
          onSuccess={props.onSubmit}
        />
      </Card>
    </>
  );
}
