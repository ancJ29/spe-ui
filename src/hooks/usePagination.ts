import { ROWS_PER_PAGE } from "@/common/configs";
import { useEffect, useState } from "react";

export default function useSPEPagination<T>(fetch: (
  cursor: string,
  limit: number,
  reverse: boolean,
) => Promise<T[]>) {
  const [data, setData] = useState<T[]>([]);
  const [haveNextPage, setHaveNextPage] = useState(false);
  const [havePreviousPage, setHavePreviousPage] = useState(false);
  const [{ cursor, reverse }, setCursor] = useState({
    cursor: "",
    reverse: false,
  });
  useEffect(() => {
    const limit = ROWS_PER_PAGE + (reverse ? 2 : 1);
    fetch(
      cursor,
      limit,
      reverse,
    ).then((data: T[]) => {
      setData(data);
      reverse
        ? setHavePreviousPage(data.length === limit)
        : setHaveNextPage(data.length === limit);
    });
  }, [cursor, fetch, reverse]);
  return {
    data,
    reverse,
    haveNextPage,
    setCursor,
    setHaveNextPage,
    setHavePreviousPage,
    havePreviousPage,
  };
}
