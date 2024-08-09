import logger from "@/services/logger";
import { isBlur } from "@/utils/utility";
import { useInterval } from "@mantine/hooks";
import { useCallback, useEffect } from "react";

export default function useSPEInterval(
  fetch: () => void,
  intervalTime: number,
  skipFirstFetch = false,
) {
  const _fetch = useCallback(() => {
    if (isBlur()) {
      logger.trace("Skip fetching data");
      return;
    }
    logger.trace("Fetching data...");
    fetch();
  }, [fetch]);
  useEffect(() => {
    !skipFirstFetch && _fetch();
  }, [_fetch, skipFirstFetch]);

  const interval = useInterval(_fetch, intervalTime);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [interval, fetch]);
}
