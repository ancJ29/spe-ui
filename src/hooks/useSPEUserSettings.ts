import { updateUserApi } from "@/services/apis";
import authStore from "@/store/auth";
import { UserUpdateType } from "@/types";
import { error, success } from "@/utils/notifications";
import { UseFormReturnType } from "@mantine/form";
import { useInterval } from "@mantine/hooks";
import { omit } from "lodash";
import { FormEvent, useEffect, useMemo, useState } from "react";
import useSPETranslation from "./useSPETranslation";

const SECONDS = 54;

type FormType = `${UserUpdateType}`;

const useSPEUserSettings = <T>(type: FormType) => {
  const [loading, setLoading] = useState(false);
  const [seconds1, setSeconds1] = useState(SECONDS);
  const [seconds2, setSeconds2] = useState(SECONDS);
  const interval1 = useInterval(
    () =>
      setSeconds1((s) => {
        if (s == 0) {
          interval1.stop();
          return 0;
        }
        return s - 1;
      }),
    1000,
  );

  const interval2 = useInterval(
    () =>
      setSeconds2((s) => {
        if (s == 0) {
          interval2.stop();
          return 0;
        }
        return s - 1;
      }),
    1000,
  );
  const { me } = authStore();
  const isHasMfa = useMemo(() => {
    return Boolean(me?.hasMfa) === true;
  }, [me]);

  useEffect(() => {
    return () => {
      interval2.stop();
      interval1.stop();
    };
  }, [interval1, interval2]);

  const messages = useMemo(() => {
    const initialData: { [key in UserUpdateType]?: string[] } = {
      [UserUpdateType.ADD_EMAIL]: [
        "Bind Email Successful",
        "Bind Email Has Been Changed successfully.",
        "Bind Email Setup Failed",
        "We couldn't set up your Bind Email. Ensure you have followed the steps correctly and try again.",
      ],
    };
    return initialData[type] as string[];
  }, [type]);

  const t = useSPETranslation();
  const startSending1 = (cb: () => void) => {
    setSeconds1(SECONDS);
    cb();
  };
  const startSending2 = (cb: () => void) => {
    setSeconds2(SECONDS);
    cb();
  };
  const onSubmit = (form: UseFormReturnType<T>) => {
    const [titleS, msgS, titleF, msgF] = messages;
    const formData = omit(
      form.getValues() as Record<string, unknown>,
    );

    setLoading(true);
    updateUserApi(type as UserUpdateType, formData)
      .then((res) => {
        if (res.data?.result?.success) {
          success(t(titleS), t(msgS));

          form.setValues(form.values);
        } else {
          error(t(titleF), t(msgF));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const submit = (e: FormEvent, form: UseFormReturnType<T>) => {
    e.preventDefault();
    if (form.isValid() === false) {
      form.validate();
      return false;
    }
    onSubmit(form);
  };
  return {
    loading,
    setLoading,
    seconds1,
    setSeconds1,
    seconds2,
    setSeconds2,
    startSending1,
    startSending2,
    submit,
    type,
    isHasMfa,
    me,
    SECONDS,
    interval1,
    interval2,
    t,
  };
};

export default useSPEUserSettings;
