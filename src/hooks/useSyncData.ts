import { useInterval } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";

export default function useSyncData<T>(
  fetchData: () => Promise<T | undefined>,
  intervalTime = 30e3,
  _defaultData?: T,
) {
  const [{ data }, setData] = useState<{ data?: T }>({
    data: _defaultData,
  });

  const fetch = useCallback(() => {
    return fetchData().then((data) => {
      data && setData({ data });
    });
  }, [fetchData]);

  const interval = useInterval(() => {
    fetch();
  }, Math.min(intervalTime, 2e3));

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [interval]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return data;
}
