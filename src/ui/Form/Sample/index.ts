import deepFreeze from "deep-freeze-es6";
import { Sample } from "./Sample";
import ResetPassword, { ResetPassword2FASchema } from "./authentication/ResetPasswordSchema";
import SignUp, { SignUp2FASchema } from "./authentication/SignUpSchema";
import ForgotPassword, { ForgotPassword2FASchema } from "./authentication/forgotPasswordSchema";
import simple from "./authentication/simpleSchema";
import SignInForm, { SignIn2FAFormSchema } from "./authentication/SignInFormSchema";
import NewOrderOfLimitTradeSchema from "./trades/NewOrderOfLimitTradeSchema";
import AddTPandSLOfTrade from "./trades/AddTPandSLOfTradeSchema";
import NewOrderOfMarketTradeSchema from "./trades/NewOrderOfMarketTradeSchema";
import NewOrderOfConditionalTradeSchema from "./trades/NewOrderOfConditionalTradeSchema";
import NewOrderOfSpotTradeSchema from "./trades/NewOrderOfSpotTradeSchema";
import NewOrderOfSpotMarginTradeSchema from "./trades/NewOrderOfSpotMarginTradeSchema";

const _samples: Record<string, Sample> = {
  Blank: { schema: {}, uiSchema: {}, formData: {} },
  Simple: simple,
  SignUp: SignUp,
  SignUp2FASchema,
  ForgotPassword: ForgotPassword,
  ForgotPassword2FASchema,
  ResetPassword: ResetPassword,
  ResetPassword2FASchema,
  SignIn: SignInForm,
  SignIn2FAFormSchema,
  NewOrderOfMarketTradeSchema,
  NewOrderOfLimitTradeSchema,
  NewOrderOfConditionalTradeSchema,
  AddTPandSLOfTrade,
  NewOrderOfSpotTradeSchema,
  NewOrderOfSpotMarginTradeSchema
  
};

export const samples = deepFreeze(_samples);
