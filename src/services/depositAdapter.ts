import { DepositService } from "@/application/ports";
import { fetchDepositAddressApi, internalDepositApi } from "./apis";

export function useDeposit(): DepositService {
  return {
    tryDeposit(formData) {
      return internalDepositApi(formData);
    },
    getDepositAddress(formData) {
      return fetchDepositAddressApi(formData);
    },
  };
}
