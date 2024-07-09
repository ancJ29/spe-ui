import { Application } from "@/common/types";
import { fetcher } from "@/services/apis/api";
import useSWR from "swr";

export default function useMetadata() {
  const { data, error, isLoading } = useSWR<Application>(
    "/api/information",
    fetcher,
  );
  return {
    data: data,
    error,
    isLoading,
  };
}
