import { useInterval } from "@mantine/hooks";
import { useEffect } from "react";

export default function useSPEInterval(
  fetch: () => void,
  intervalTime: number,
  skipFirstFetch = false,
) {
  useEffect(() => {
    !skipFirstFetch && fetch();
  }, [fetch, skipFirstFetch]);

  const interval = useInterval(fetch, intervalTime);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [interval, fetch]);
}
