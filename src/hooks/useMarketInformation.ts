import { SymbolInformation } from "@/common/types";
import { fetch } from "@/services/apis";
import { useParams } from "react-router-dom";
import useSWR from "swr";

export default function useMarketInformation() {
  const { base, quote } = useParams();
  const { data, error, isLoading } = useSWR<SymbolInformation>(
    `/api/market/information?symbol=${base}${quote}`,
    fetch,
  );
  return {
    data: data,
    error,
    isLoading,
  };
}
