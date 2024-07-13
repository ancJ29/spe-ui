import { FormProps } from "@rjsf/core";

export * from "./assets";
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
