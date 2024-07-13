import { t as _t } from "@/common/utils";
import { LanguageContext } from "@/context/LanguageContext";
import { useCallback, useContext } from "react";
export default function useTranslation(): (key?: string) => string {
  const { dictionary } = useContext(LanguageContext);
  const t = useCallback(
    (key?: string) => {
      return key ? _t(dictionary, key) : "";
    },
    [dictionary],
  );
  return t;
}
