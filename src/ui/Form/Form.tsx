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
const toJson = (val: unknown) => JSON.stringify(val, null, 2);
const AJV8_2020 = customizeValidator({ AjvClass: Ajv2020 });
const customWidgets: RegistryWidgetsType = {
  ...widgets,
};

type Custom = {
  w: number | string;
  api: string;
  _onSubmit: (res: unknown) => void;
  msgSuccess: string;
  showJsonOutput: boolean;
};
type AppFormProps = Sample & Partial<Custom>;

// eslint-disable-next-line react/display-name
const AppForm = forwardRef(
  ({ showJsonOutput = false, ...props }: AppFormProps, ref) => {
    const [schema] = useState<RJSFSchema>(props.schema as RJSFSchema);
    const [visible, { toggle, close }] = useDisclosure(false);
    const [uiSchema] = useState<UiSchema | undefined>(props.uiSchema);
    const [formData, setFormData] = useState(
      props.formData,
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

    const updateField = (field: string, value: any) => {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [field]: value
      }));
    };
  

    useImperativeHandle(
      ref,
      () => {
        return {
          submit() {
            formRef.current?.submit();
          },
          formRef,
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
