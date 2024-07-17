import logger from "@/services/logger";
import { useInterval } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";

export default function useSyncData<T>(fetchData: () => Promise<T[]>, intervalTime = 30e3) {
  const [data, setData] = useState<T[]>([]);

  const fetch = useCallback(() => {
    return fetchData().then((data) => {
      setData(data);
    });
  }, [fetchData]);

  const interval = useInterval(() => {
    fetch();
  }, intervalTime);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [interval]);

  useEffect(() => {
    logger.debug("Fetching data");
    fetch();
  }, [fetch]);

  return data;
}
