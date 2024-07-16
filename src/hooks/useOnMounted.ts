import logger from "@/services/logger";
import { useEffect } from "react";
import { useBoolean } from "usehooks-ts";

export default function useOnMounted(callback: () => void, key = "") {
  const { value: loaded, setFalse } = useBoolean(false);
  useEffect(() => {
    key && logger.trace(`useOnMounted ${key} ${loaded}`);
    if (!loaded) {
      setFalse();
      callback();
    }
  }, [key, loaded, callback, setFalse]);
}
