import { DepositService } from "@/application/ports";
import { fetchDepositAddressApi } from "./apis";

export function useDeposit(): DepositService {
  return {
    getDepositAddress(formData) {
      return fetchDepositAddressApi(formData);
    },
  };
}
