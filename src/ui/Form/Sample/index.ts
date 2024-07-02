import deepFreeze from "deep-freeze-es6";
import { Sample } from "./Sample";
import ResetPassword from "./authentication/ResetPasswordSchema";
import SignUp from "./authentication/SignUpSchema";
import ForgotPassword from "./authentication/forgotPasswordSchema";
import simple from "./authentication/simpleSchema";
import SignInForm from "./authentication/SignInFormSchema";
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
  ForgotPassword: ForgotPassword,
  ResetPassword: ResetPassword,
  SignIn: SignInForm,
  NewOrderOfMarketTradeSchema,
  NewOrderOfLimitTradeSchema,
  NewOrderOfConditionalTradeSchema,
  AddTPandSLOfTrade,
  NewOrderOfSpotTradeSchema,
  NewOrderOfSpotMarginTradeSchema
  
};

export const samples = deepFreeze(_samples);
