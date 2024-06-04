import React, { FormEvent, useCallback, useState } from "react";
import Form, { IChangeEvent } from "@rjsf/core";
import Ajv2020 from "ajv/dist/2020.js";
import { customizeValidator } from "@rjsf/validator-ajv8";
import {
  FieldTemplateProps,
  RJSFSchema,
  RJSFValidationError,
  RegistryWidgetsType,
  UiSchema,

} from "@rjsf/utils";
import { samples } from "./Sample";
import { Box, Card, Text } from "@mantine/core";
import { LogoWidget } from "./widgets/additions/LogoWidget";
import PhoneNumberField from "./fields/additions/PhoneNumber";
import { TabWidget } from "./widgets/additions/TabWidget";
import CustomTextWidget from "./widgets/overwrites/TextWidget";
import CustomPasswordWidget from "./widgets/overwrites/PasswordWidget";
import SubmitButton from "./templates/overwrites/SubmitButtonTemplate";
import FieldErrorTemplate from "./templates/overwrites/FieldErrorTemplate";
import classes from "./form.module.scss"

import { Sample } from "./Sample/Sample";
import CustomFieldTemplate from "./templates/overwrites/CustomFieldTemplate";

const AJV8_2020 = customizeValidator({ AjvClass: Ajv2020 });
const customWidgets: RegistryWidgetsType = {
  TextWidget: CustomTextWidget,
  PasswordWidget: CustomPasswordWidget,
  LogoWidget: LogoWidget,
  TabWidget: TabWidget,
};


const AppForm: React.FC<Sample & Partial<{w: number | string}>> = (props) => {
  const [schema] = useState<RJSFSchema>(
    // samples.SignUp.schema as RJSFSchema,
    props.schema as RJSFSchema,
  );
  
  const [uiSchema] = useState<UiSchema>(props.uiSchema! /*props.formConfig.schema as UiSchema*/);  /*samples.SignUp.uiSchema!*/
  const [formData, setFormData] = useState(props.formData /*props.formConfig.formData*/); /*samples.SignUp.formData*/

  const onFormDataSubmit = useCallback(
    ({ formData }: IChangeEvent, event: FormEvent<any>) => {
      window.console.log("submitted formData", formData);
      window.console.log("submit event", event);
    },
    [],
  );

  const onFormDataChange = useCallback(
    ({ formData }: IChangeEvent, id?: string) => {
      if (id) {
        window.console.log("Field changed, id: ", id);
      }
      setFormData(formData);
    },
    [setFormData],
  );

  return (
    <>
    
      <Box w={props.w ?? 500}>
        <Form className={classes.form}
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          validator={AJV8_2020}
          fields={{
            'PhoneNumber': PhoneNumberField,
          }}
          widgets={customWidgets}
          templates={{
            ButtonTemplates: { SubmitButton },
            FieldErrorTemplate,
            FieldTemplate: CustomFieldTemplate,

          }}
          showErrorList={false}
          onChange={onFormDataChange}
          onSubmit={onFormDataSubmit}

          onBlur={(id: string, value: string) =>
            window.console.log(`Touched ${id} with value ${value}`)
          }
          onFocus={(id: string, value: string) =>
            window.console.log(`Focused ${id} with value ${value}`)
          }
          onError={(errorList: RJSFValidationError[]) =>
            window.console.log("errors", errorList)
          }
        />
      </Box>
    </>
  );
};

export default AppForm;
