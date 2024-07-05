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
import React, {
  FormEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Sample } from "./Sample/Sample";

import axios from "@/services/apis/api";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import MonacoEditor from "@monaco-editor/react";

import * as fields from "./fields";
import * as templates from "./templates";
import * as widgets from "./widgets";
import { cloneDeep, set } from "lodash";
const toJson = (val: unknown) => JSON.stringify(val, null, 2);
const AJV8_2020 = customizeValidator({ AjvClass: Ajv2020 });
const customWidgets: RegistryWidgetsType = {
  ...widgets,
};

type MessageForm = {
  titleSuccess: string
  msgSuccess: string
  titleError: string
  msgError: string
}

type Custom = {
  w: number | string;
  api: string;
  _onSubmit: (res: unknown) => void;
  converterFormData: (res: unknown) => any;
  msgSuccess: string;
  showJsonOutput: boolean;
  messages: Partial<MessageForm>
};
type AppFormProps = Sample & Partial<Custom>;

// eslint-disable-next-line react/display-name
const AppForm = forwardRef(
  ({ showJsonOutput = true, ...props }: AppFormProps, ref) => {
    const [schema, setSchema] = useState<RJSFSchema>(props.schema as RJSFSchema);
    const [visible, { toggle, close }] = useDisclosure(false);
    const [uiSchema, setUiSchema] = useState<UiSchema | undefined>(props.uiSchema);
    const [formData, setFormData] = useState(
      props.formData,
    ); /*samples.SignUp.formData*/

    const onFormDataSubmit = useCallback(
      (evt: IChangeEvent, event: FormEvent<unknown>) => {
        window.console.log("submitted formData", evt.formData);
        window.console.log("submit event", event);
        
        if (props.api && props.converterFormData) {
          let prams = props.converterFormData({ ...evt.formData })
          toggle();
          axios
            .post(props.api, prams)
            .then((res) => {
              if (!res.data.result) {
                notifications.show({
                  color: "red",
                  title: props.messages?.titleError ?? "Something went wrong",
                  message: props.messages?.msgError ?? res.data.message,
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
                  title: props.messages?.titleSuccess ?? "The form was submitted successfully.",
                  message: props.messages?.msgSuccess ?? "The action was successful",
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

    const updateField = (field: string, value: any) => {
      setFormData((prevFormData: any) => {
        let d = cloneDeep(prevFormData)
        let v = set(d, field, value)
        return {
          ...v
        }
        // return {
        //   ...prevFormData,
        //   [field]: value
        // }
      });
    };
  

    useImperativeHandle(
      ref,
      () => {
        return {
          submit() {
            formRef.current?.submit();
          },
          formRef,
          setSchema,
          setUiSchema,
          setFormData,
          toggle, close
        };
      },
      [],
    );
    const formRef = useRef<React.ElementRef<typeof Form>>(null);
    const isDev = import.meta.env.MODE === "development";
    return (
      <>
        <Box w={props.w ?? 500} pos="relative">
          <Form
            ref={formRef}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            validator={AJV8_2020}
            fields={{
              ...fields,
            }}
            widgets={customWidgets}
            templates={{
              ButtonTemplates: { SubmitButton: templates.SubmitButton },
              ...templates,
            }}
            showErrorList={false}
            extraErrorsBlockSubmit={false}
            extraErrors={{}}
            onChange={onFormDataChange}
            onSubmit={props.onSubmit ?? onFormDataSubmit}
            onBlur={(id: string, value: string) =>
              window.console.log(`Touched ${id} with value ${value}`)
            }
            onFocus={(id: string, value: string) =>
              window.console.log(`Focused ${id} with value ${value}`)
            }
            onError={(errorList: RJSFValidationError[]) =>
              window.console.log("errors", errorList)
            }
            formContext={{ formData, updateFormData: setFormData, updateField }}
          />
        </Box>
        {(showJsonOutput && isDev) && (
          <>
            <Box h={"300px"}>
              <MonacoEditor
                language='json'
                value={toJson(formData)}
                theme='vs-dark'
                onChange={() => { }}
                options={{
                  minimap: {
                    enabled: false,
                  },
                  automaticLayout: true,
                  formatOnType: true,
                  formatOnPaste: true,
                }}
              />
            </Box>
          </>
        )}
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      </>
    );
  },
);

export default AppForm;
