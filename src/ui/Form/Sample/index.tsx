import deepFreeze from "deep-freeze-es6";
import ResetPassword from "./Forms/ResetPasswordSchema";
import SignUp from "./Forms/SignUpSchema";
import ForgotPassword from "./Forms/forgotPasswordSchema";
import simple from "./Forms/simpleSchema";
import { Sample } from "./Sample";
import SignInForm from "./Forms/SignInFormSchema";
import LimitMarketConditionalTrade from "./trades/LimitMarketConditionalTradeSchema";
import AddTPandSLOfTrade from "./trades/AddTPandSLOfTradeSchema";

const _samples: Record<string, Sample> = {
  Blank: { schema: {}, uiSchema: {}, formData: {} },
  Simple: simple,
  SignUp: SignUp,
  ForgotPassword: ForgotPassword,
  ResetPassword: ResetPassword,
  SignIn: SignInForm,
  LimitMarketConditionalTrade: LimitMarketConditionalTrade,
  AddTPandSLOfTrade: AddTPandSLOfTrade
};

export const samples = deepFreeze(_samples);
