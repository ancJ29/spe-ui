import { AccountType } from "@/common/enums";

export type Account = {
  id: string
  name: string
  isFunding: boolean
  isCopyMaster: boolean
  type: AccountType
};
