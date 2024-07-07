import axios from "@/services/apis/api";
import { Box, LoadingOverlay, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import MonacoEditor from "@monaco-editor/react";
import Form, { FormProps, IChangeEvent } from "@rjsf/core";
import {
  RJSFSchema,
  RJSFValidationError,
  RegistryWidgetsType,
} from "@rjsf/utils";
import { customizeValidator } from "@rjsf/validator-ajv8";
import { IconCheck } from "@tabler/icons-react";
import Ajv2020 from "ajv/dist/2020.js";
import React, {
  FormEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cloneDeep, set } from "lodash";
import * as fields from "./fields";
import * as templates from "./templates";
import * as widgets from "./widgets";

const toJson = (val: unknown) => JSON.stringify(val, null, 2);
const AJV8_2020 = customizeValidator({ AjvClass: Ajv2020 });
const customWidgets: RegistryWidgetsType = { ...widgets };

type SPEResponse = {
  code: number;
  message: string;
  result: unknown | null;
};

type AppFormProps = Omit<FormProps, "validator"> & {
  w?: number | string;
  api?: string;
  onSuccess?: (res: any) => void; // eslint-disable-line
  formDataConverter?: (res: any) => any; // eslint-disable-line
  msgSuccess?: string;
  showJsonOutput?: boolean;
  messages?: {
    titleSuccess?: string;
    msgSuccess?: string;
    titleError?: string;
    msgError?: string;
  };
};

const isDev = ["localhost", "127.0.0.1", "0.0.0.0"].includes(
  window.location.hostname,
);

const debug = (...args: unknown[]) => {
  isDev ? console.log(...args) : void 0; // eslint-disable-line
};

// eslint-disable-next-line react/display-name
const AppForm = forwardRef(
  ({ showJsonOutput = true, ...props }: AppFormProps, ref) => {
    const [visible, { toggle, close }] = useDisclosure(false);
    const [schema, setSchema] = useState<RJSFSchema>(props.schema);
    const [uiSchema, setUiSchema] = useState(props.uiSchema);
    const [formData, updateFormData] = useState(props.formData);
    const formRef = useRef<React.ElementRef<typeof Form>>(null);

    const onFormDataSubmit = useCallback(
      (evt: IChangeEvent, event: FormEvent<unknown>) => {
        debug("submitted formData", evt.formData);
        debug("submit event", event);
        if (props.api) {
          const rawData = { ...evt.formData };
          const params =
            props.formDataConverter?.(rawData) ?? rawData;
          toggle();
          axios
            .post<SPEResponse>(props.api, params)
            .then((res) => {
              if (res.data.code !== 0) {
                // Error handling
                return notifications.show({
                  color: "red",
                  title:
                    props.messages?.titleError ??
                    "Something went wrong",
                  message:
                    props.messages?.msgError ?? res.data.message,
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
              props.onSuccess?.(res.data.result);
              notifications.show({
                color: "teal",
                title:
                  props.messages?.titleSuccess ??
                  "The form was submitted successfully.",
                message:
                  props.messages?.msgSuccess ??
                  "The action was success",
                icon: (
                  <IconCheck
                    style={{ width: rem(18), height: rem(18) }}
                  />
                ),
                loading: false,
                autoClose: 5000,
                position: "top-center",
              });
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
        id && debug("Field changed, id: ", id, props);
        updateFormData(props.formData);
      },
      [updateFormData],
    );

    const updateField = (field: string, value: unknown) => {
      updateFormData((prevFormData: unknown) => {
        const d = cloneDeep(prevFormData) as Record<string, unknown>;
        const v = set(d, field, value);
        return { ...v };
      });
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          formRef,
          toggle,
          close,
          setSchema,
          setUiSchema,
          submit: formRef.current?.submit,
          setFormData: updateFormData,
        };
      },
      [close, toggle],
    );

    return (
      <>
        <Box w={props.w ?? 500} pos="relative">
          <Form
            ref={formRef}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            validator={AJV8_2020}
            fields={{ ...fields }}
            widgets={customWidgets}
            templates={{
              ButtonTemplates: {
                SubmitButton: templates.SubmitButton,
              },
              ...templates,
            }}
            showErrorList={false}
            extraErrorsBlockSubmit={false}
            extraErrors={{}}
            onChange={onFormDataChange}
            onSubmit={props.onSubmit ?? onFormDataSubmit}
            formContext={{ formData, updateFormData, updateField }}
            onBlur={(id: string, value: string) =>
              debug(`Touched ${id} with value ${value}`)
            }
            onFocus={(id: string, value: string) =>
              debug(`Focused ${id} with value ${value}`)
            }
            onError={(errorList: RJSFValidationError[]) =>
              debug("errors", errorList)
            }
          />
        </Box>
        {showJsonOutput && <JsonForm formData={formData} />}
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

const test = false;
function JsonForm({ formData }: { formData: unknown }) {
  if (!isDev) {
    return "";
  }
  if (test) {
    return "";
  }
  return (
    <Box h={"300px"}>
      <MonacoEditor
        language="json"
        value={toJson(formData)}
        theme="vs-dark"
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
  );
}
