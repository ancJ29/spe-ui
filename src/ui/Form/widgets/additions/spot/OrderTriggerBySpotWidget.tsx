import { SelectAsMenu } from "@/ui/SelectAsMenu";
import { WidgetProps } from "@rjsf/utils";

export function OrderTriggerBySpotWidget(props: WidgetProps) {
  const {
    formContext: { updateField },
  } = props;
  const onChange = (v: string | null) => {
    updateField(props.name, v);
    resetSomeFields();
  };
  const resetSomeFields = () => {
    updateField("qty", "");
    updateField("orderValue", "");
    updateField("orderValueMarket", "");
    updateField("orderValueConditionalMarket", "");
    updateField("orderValueConditionalLimit", "");
  };
  return (
    <>
      <SelectAsMenu
        label={props.label ? props.label : " "}
        onChange={(v) => onChange(v)}
        data={props.schema.enum as string[]}
        value={props.value}
      />
    </>
  );
}
