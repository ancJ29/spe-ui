import { Button } from "@mantine/core";
import { SubmitButtonProps, getSubmitButtonOptions } from "@rjsf/utils";

function SubmitButton(props: SubmitButtonProps) {
    const { uiSchema } = props;
    const { norender } = getSubmitButtonOptions(uiSchema);
    if (norender) {
      return null;
    }
    return (
      <Button type="submit" {...uiSchema?.["ui:options"]["submitButtonOptions"]?.props}>
        {uiSchema?.["ui:options"]["submitButtonOptions"]?.submitText}
      </Button>
    );
  }

  export default SubmitButton
