import { Metadata } from "@/domain/MetaData";
import { fetcher } from "@/services/apis/api";
import useSWR from "swr";

export default function useMetadata() {
  const { data, error, isLoading } = useSWR<Metadata>(
    "/api/meta-data",
    fetcher,
  );
  return {
    data,
    error,
    isLoading,
  };
}
