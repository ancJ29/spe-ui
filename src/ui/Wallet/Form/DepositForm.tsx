import { schema } from "@/domain/schema";
import useTranslation from "@/hooks/useTranslation";
import AppForm from "@/ui/Form/Form";
import { Card, Space, Title } from "@mantine/core";

type DepositFormProps = {
  maw?: string | number;
  onClose?: () => void;
};

export function DepositForm(props: DepositFormProps) {
  const t = useTranslation();
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
        <Title order={3}>{t("Deposit")}</Title>
        <Space my={10} />
        <AppForm
          w={"100%"}
          schema={schema.DepositSchema.schema}
          uiSchema={schema.DepositSchema.uiSchema}
          onSubmit={props.onClose}
          formData={{
            ...schema.DepositSchema.formData,
          }}
          showJsonOutput
        />
        <Space my={10} />
      </Card>
    </>
  );
}
