import deepFreeze from "deep-freeze-es6";
import ResetPassword from "./authentication/ResetPasswordSchema";
import SignUp from "./authentication/SignUpSchema";
import ForgotPassword from "./authentication/forgotPasswordSchema";
import simple from "./authentication/simpleSchema";
import { Sample } from "./Sample";
import SignInForm from "./authentication/SignInFormSchema";
import NewOrderOfLimitTradeSchema from "./trades/NewOrderOfLimitTradeSchema";
import AddTPandSLOfTrade from "./trades/AddTPandSLOfTradeSchema";
import NewOrderOfMarketTradeSchema from "./trades/NewOrderOfMarketTradeSchema";
import NewOrderOfConditionalTradeSchema from "./trades/NewOrderOfConditionalTradeSchema";

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
  
};

export const samples = deepFreeze(_samples);
