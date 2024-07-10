import deepFreeze from "deep-freeze-es6";
import ForgotPassword from "./authentication/forgotPasswordSchema";
import ResetPassword from "./authentication/ResetPasswordSchema";
import SignInForm from "./authentication/SignInFormSchema";
import SignUp from "./authentication/SignUpSchema";
import simple from "./authentication/simpleSchema";
import { Sample } from "./Sample";
import AddTPandSLOfTrade from "./trades/AddTPandSLOfTradeSchema";
import NewOrderOfConditionalTradeSchema from "./trades/NewOrderOfConditionalTradeSchema";
import NewOrderOfLimitTradeSchema from "./trades/NewOrderOfLimitTradeSchema";
import NewOrderOfMarketTradeSchema from "./trades/NewOrderOfMarketTradeSchema";
import NewOrderOfSpotMarginTradeSchema from "./trades/NewOrderOfSpotMarginTradeSchema";
import NewOrderOfSpotTradeSchema from "./trades/NewOrderOfSpotTradeSchema";
import DepositSchema from "./trades/DepositSchema";
import FundSwapSchema from "./trades/FundSwapSchema";
import FundTransferSchema from "./trades/FundTransferSchema";
import FundWithdrawSchema from "./trades/FundWithdrawSchema";

const _samples: Record<string, Sample> = {
  Blank: { schema: {}, uiSchema: {}, formData: {} },
  Simple: simple,
  SignUp: SignUp,
  ForgotPassword: ForgotPassword,
  ResetPassword: ResetPassword,
  SignIn: SignInForm,
  NewOrderOfMarketTradeSchema,
  NewOrderOfLimitTradeSchema,
  NewOrderOfConditionalTradeSchema,
  AddTPandSLOfTrade,
  NewOrderOfSpotTradeSchema,
  NewOrderOfSpotMarginTradeSchema,
  DepositSchema,
  FundSwapSchema,
  FundTransferSchema,
  FundWithdrawSchema

};

export const samples = deepFreeze(_samples);
