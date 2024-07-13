import { GenericObject } from "@/common/types";
import axios from "@/services/apis/api";
import logger from "@/services/logger";
import { SPEResponse } from "@/types";
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
import { cloneDeep, set } from "lodash";
import React, {
  FormEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import * as fields from "./fields";
import * as templates from "./templates";
import * as widgets from "./widgets";

const toJson = (val: unknown) => JSON.stringify(val, null, 2);
const AJV8_2020 = customizeValidator({ AjvClass: Ajv2020 });
const customWidgets: RegistryWidgetsType = { ...widgets };

const isDev = ["localhost", "127.0.0.1", "0.0.0.0"].includes(
  window.location.hostname,
);

const test = isDev && false;

type OmittedForm = Omit<FormProps, "formData" | "validator">;

type AppFormProps = OmittedForm & {
  w?: number | string;
  api?: string;
  formData: GenericObject;
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

// TODO: refactor typed of this component
// eslint-disable-next-line react/display-name
const AppForm = forwardRef(
  ({ showJsonOutput = false, ...props }: AppFormProps, ref) => {
    const [visible, { toggle, close }] = useDisclosure(false);
    const [counter, setCounter] = useState(0);
    const [schema, setSchema] = useState<RJSFSchema>(props.schema);
    const [lockUntil, setLockUntil] = useState(0);
    const [uiSchema, setUiSchema] = useState(props.uiSchema);
    const [formData, updateFormData] = useState({
      ...props.formData,
    });

    const formRef = useRef<React.ElementRef<typeof Form>>(null);

    const onFormDataSubmit = useCallback(
      (evt: IChangeEvent, event: FormEvent<unknown>) => {
        logger.debug("submitted formData", evt.formData);
        logger.debug("submit event", event);
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
        } else {
          close();
        }
      },
      [close, props, toggle],
    );

    const onFormDataChange = useCallback(
      (props: IChangeEvent, id?: string) => {
        id && logger.debug("Field changed, id: ", id, props);
        if (lockUntil < Date.now()) {
          updateFormData(props.formData);
          // setCounter((prev) => prev + 1);
        }
      },
      [lockUntil],
    );

    const updateFields = useCallback(
      (updated: Record<string, unknown>) => {
        logger.debug("updateFields", updated);
        setLockUntil(Date.now() + 300);
        updateFormData((prevFormData: unknown) => {
          let d = cloneDeep(prevFormData) as Record<string, unknown>;
          Object.entries(updated).forEach(([field, value]) => {
            d = set(d, field, value);
          });
          return { ...d };
        });
        setCounter((prev) => prev + 1);
      },
      [],
    );

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
            key={counter}
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
            formContext={{
              formData,
              updateFields,
              updateFormData,
            }}
            onBlur={(id: string, value: string) =>
              logger.debug(`Touched ${id} with value ${value}`)
            }
            onFocus={(id: string, value: string) =>
              logger.debug(`Focused ${id} with value ${value}`)
            }
            onError={(errorList: RJSFValidationError[]) =>
              logger.debug("errors", errorList)
            }
          />
        </Box>
        {showJsonOutput && test && <JsonForm formData={formData} />}
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

function JsonForm({ formData }: { formData: GenericObject }) {
  return (
    <Box h={"300px"} mt={10}>
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
