import { Application } from "@/common/types";
import { fetch } from "@/services/apis";
import useSWR from "swr";

export default function useMetadata() {
  const { data, error, isLoading } = useSWR<Application>(
    "/api/information",
    fetch,
  );
  return {
    data: data,
    error,
    isLoading,
  };
}
