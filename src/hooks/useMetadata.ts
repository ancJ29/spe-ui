import { Application } from "@/common/types";
import { fetchMetadata } from "@/services/apis";
import useSWR from "swr";

export default function useMetadata() {
  const { data, error, isLoading } = useSWR<Application>(
    "/api/information",
    fetchMetadata,
  );
  return {
    data: data,
    error,
    isLoading,
  };
}
