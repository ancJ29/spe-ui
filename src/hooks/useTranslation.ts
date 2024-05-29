import { LanguageContext } from "@/context/LanguageContext";
import { useCallback, useContext } from "react";

export default function useTranslation(): (key?: string) => string {
  const { dictionary } = useContext(LanguageContext);
  const t = useCallback(
    (key?: string) => {
      if (!key) {
        return "";
      }
      if (dictionary[key]) {
        return dictionary[key];
      } else {
        return key;
      }
    },
    [dictionary],
  );
  return t;
}
