import { AccountType } from "@/common/enums";
import { FormProps } from "@rjsf/core";

export * from "./account";
export * from "./asset";
export * from "./auth";

export type RouteConfig = {
  path: string;
  element: React.JSX.Element;
};

export type FormSchema = Omit<FormProps, "validator">;

export type SPEResponse = {
  code: number;
  message: string;
  result: unknown | null;
};

export type Account = {
  id: string
  name: string
  isFunding: boolean
  isCopyMaster: boolean
  type: AccountType
};
