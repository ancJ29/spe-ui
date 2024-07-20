import { useInterval } from "@mantine/hooks";
import { useEffect } from "react";

export default function useSPEInterval(fetch: () => void, intervalTime: number) {
  useEffect(() => {
    fetch();
  }, [fetch]);

  const interval = useInterval(
    fetch,
    intervalTime,
  );

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [interval, fetch]);
}
