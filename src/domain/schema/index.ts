import { FormSchema } from "@/types";
import deepFreeze from "deep-freeze-es6";
import DepositSchema from "./assets/DepositSchema";
import SwapSchema from "./assets/SwapSchema";
import TransferSchema from "./assets/TransferSchema";
import WithdrawSchema from "./assets/WithdrawSchema";
import ForgotPassword from "./authentication/ForgotPasswordSchema";
import LoginForm from "./authentication/LoginFormSchema";
import ResetPassword from "./authentication/ResetPasswordSchema";
import SignUp from "./authentication/SignUpSchema";
import AddTPandSLOfTrade from "./trades/AddTPandSLOfTradeSchema";
import NewOrderOfConditionalTradeSchema from "./trades/NewOrderOfConditionalTradeSchema";
import NewOrderOfLimitTradeSchema from "./trades/NewOrderOfLimitTradeSchema";
import NewOrderOfMarketTradeSchema from "./trades/NewOrderOfMarketTradeSchema";
import NewOrderOfSpotMarginTradeSchema from "./trades/NewOrderOfSpotMarginTradeSchema";
import NewOrderOfSpotTradeSchema from "./trades/NewOrderOfSpotTradeSchema";

const _schema: Record<string, FormSchema> = {
  Blank: { schema: {}, uiSchema: {}, formData: {} },
  SignUp: SignUp,
  ForgotPassword: ForgotPassword,
  ResetPassword: ResetPassword,
  Login: LoginForm,
  NewOrderOfMarketTradeSchema,
  NewOrderOfLimitTradeSchema,
  NewOrderOfConditionalTradeSchema,
  AddTPandSLOfTrade,
  NewOrderOfSpotTradeSchema,
  NewOrderOfSpotMarginTradeSchema,
  DepositSchema,
  SwapSchema,
  TransferSchema,
  WithdrawSchema

};

export const schema = deepFreeze(_schema);
