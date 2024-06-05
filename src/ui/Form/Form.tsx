import { Box, LoadingOverlay, rem } from "@mantine/core";
import Form, { IChangeEvent } from "@rjsf/core";
import {
  RJSFSchema,
  RJSFValidationError,
  RegistryWidgetsType,
  UiSchema,
} from "@rjsf/utils";
import { customizeValidator } from "@rjsf/validator-ajv8";
import Ajv2020 from "ajv/dist/2020.js";
import React, { FormEvent, useCallback, useState } from "react";
import { Sample } from "./Sample/Sample";
import classes from "./form.module.scss";

import axios from "@/services/apis/api";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { PhoneNumberField } from "./fields";
import {
  CustomFieldTemplate,
  FieldErrorTemplate,
  SubmitButton,
} from "./templates";
import {
  CustomPasswordWidget,
  CustomTextWidget,
  LogoWidget,
  PhoneNumberWidget,
  TabWidget,
} from "./widgets";

const AJV8_2020 = customizeValidator({ AjvClass: Ajv2020 });
const customWidgets: RegistryWidgetsType = {
  // overwrites
  TextWidget: CustomTextWidget,
  PasswordWidget: CustomPasswordWidget,
  // additions
  LogoWidget: LogoWidget,
  TabWidget: TabWidget,
  PhoneNumberWidget: PhoneNumberWidget,
};

type Custom = {
  w: number | string;
  api: string;
  _onSubmit: (res: unknown) => void;
  msgSuccess: string;
};
const AppForm: React.FC<Sample & Partial<Custom>> = (props) => {
  const [schema] = useState<RJSFSchema>(
    // samples.SignUp.schema as RJSFSchema,
    props.schema as RJSFSchema,
  );
  const [visible, { toggle, close }] = useDisclosure(false);
  const [uiSchema] = useState<UiSchema | undefined>(props.uiSchema);
  const [formData, setFormData] = useState(
    props.formData /*props.formConfig.formData*/,
  ); /*samples.SignUp.formData*/

  const onFormDataSubmit = useCallback(
    (evt: IChangeEvent, event: FormEvent<unknown>) => {
      window.console.log("submitted formData", evt.formData);
      window.console.log("submit event", event);
      if (props.api) {
        const formData = { ...evt.formData };
        const ks = Object.keys(formData);
        ks.forEach((_name) => {
          if (formData[_name] === undefined) {
            delete formData[_name];
          }
        });
        toggle();
        axios
          .post(props.api, formData)
          .then((res) => {
            if (!res.data.success) {
              notifications.show({
                color: "red",
                title: "Something went wrong",
                message: res.data.reason,
                icon: (
                  <IconCheck
                    style={{ width: rem(18), height: rem(18) }}
                  />
                ),
                loading: false,
                autoClose: 5000,
                position: "top-center",
              });
            } else {
              if (props._onSubmit) {
                props._onSubmit(res);
              }
              notifications.show({
                color: "teal",
                title: "The form was submitted successfully.",
                message:
                  props.msgSuccess ?? "The action was successful",
                icon: (
                  <IconCheck
                    style={{ width: rem(18), height: rem(18) }}
                  />
                ),
                loading: false,
                autoClose: 5000,
                position: "top-center",
              });
            }
          })
          .finally(() => {
            close();
          });
      }
    },
    [close, props, toggle],
  );

  const onFormDataChange = useCallback(
    (props: IChangeEvent, id?: string) => {
      if (id) {
        window.console.log("Field changed, id: ", id, props);
      }
      setFormData(props.formData);
    },
    [setFormData],
  );

  return (
    <>
      <Box w={props.w ?? 500} pos="relative">
        <Form
          className={classes.form}
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          validator={AJV8_2020}
          fields={{
            PhoneNumberField: PhoneNumberField,
          }}
          widgets={customWidgets}
          templates={{
            ButtonTemplates: { SubmitButton },
            FieldErrorTemplate,
            FieldTemplate: CustomFieldTemplate,
          }}
          showErrorList={false}
          extraErrorsBlockSubmit={false}
          extraErrors={{}}
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
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </>
  );
};

export default AppForm;
