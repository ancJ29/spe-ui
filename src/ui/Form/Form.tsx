import { GenericObject } from "@/common/types";
import { delay } from "@/common/utils";
import useTranslation from "@/hooks/useTranslation";
import axios from "@/services/apis";
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
  useEffect,
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
  xFlag?: boolean;
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
  (
    {
      api,
      xFlag = false,
      showJsonOutput = false,
      messages,
      onSubmit,
      onSuccess,
      formDataConverter,
      ...props
    }: AppFormProps,
    ref,
  ) => {
    const t = useTranslation();
    const [visible, { toggle, close }] = useDisclosure(false);
    const [counter, setCounter] = useState(0);
    const [schema, setSchema] = useState<RJSFSchema>(props.schema);
    const [uiSchema, setUiSchema] = useState(props.uiSchema);
    const [paused, setPause] = useState(false);
    const [formData, updateFormData] = useState({
      ...props.formData,
    });

    const formRef = useRef<React.ElementRef<typeof Form>>(null);

    const onFormDataSubmit = useCallback(
      async (evt: IChangeEvent, event: FormEvent<unknown>) => {
        await delay(300); // TODO: do we need this?
        if (onSubmit) {
          onSubmit(evt, event);
          return;
        }
        logger.trace("submitted formData", evt.formData);
        logger.trace("submit event", event);
        if (api) {
          const rawData = { ...evt.formData };
          const params = formDataConverter?.(rawData) ?? rawData;
          toggle();
          axios
            .post<SPEResponse>(api, params)
            .then((res) => {
              if (res.data.code !== 0) {
                // Error handling
                return notifications.show({
                  color: "red",
                  title:
                    messages?.titleError ?? t("Something went wrong"),
                  message: messages?.msgError ?? res.data.message,
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
              onSuccess?.(res.data.result);
              notifications.show({
                color: "teal",
                title:
                  messages?.titleSuccess ??
                  t("The form was submitted successfully."),
                message:
                  messages?.msgSuccess ?? t("The action was success"),
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
      [
        api,
        close,
        onSuccess,
        formDataConverter,
        messages,
        onSubmit,
        t,
        toggle,
      ],
    );

    const onFormDataChange = useCallback(
      (props: IChangeEvent, id?: string) => {
        if (paused) {
          return;
        }
        id && logger.trace("Field changed, id: ", id, props);
        updateFormData(props.formData);
      },
      [paused],
    );

    useEffect(() => {
      updateFormData(props.formData);
    }, [props.formData]);

    // TODO: remove XFlag
    const updateFields = useCallback(
      (updated: Record<string, unknown>) => {
        if (xFlag) {
          setPause(true);
        }
        Object.entries(updated).forEach(([field, value]) => {
          updateFormData((prevFormData: unknown) => {
            const d = cloneDeep(prevFormData) as GenericObject;
            const v = set(d, field, value);
            return { ...v };
          });
        });
        if (xFlag) {
          setPause(false);
          setCounter((prev) => prev + 1);
        }
      },
      [xFlag],
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
            disabled={paused}
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
            onSubmit={onFormDataSubmit}
            formContext={{
              formData,
              updateFields,
              updateFormData,
              updateField: (field: string, value: unknown) => {
                updateFields({ [field]: value });
              },
              submit: () => formRef.current?.submit(),
            }}
            onBlur={(id: string, value: string) =>
              logger.trace(`Touched ${id} with value ${value}`)
            }
            onFocus={(id: string, value: string) =>
              logger.trace(`Focused ${id} with value ${value}`)
            }
            onError={(errorList: RJSFValidationError[]) =>
              logger.trace("errors", errorList)
            }
          />
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
        </Box>
        {showJsonOutput && test && <JsonForm formData={formData} />}
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
