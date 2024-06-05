import deepFreeze from "deep-freeze-es6";
import ResetPassword from "./Forms/ResetPassword";
import SignUp from "./Forms/SignUp";
import ForgotPassword from "./Forms/forgotPassword";
import simple from "./Forms/simple";
import { Sample } from "./Sample";
import SignInForm from "./Forms/SignInForm";


const _samples: Record<string, Sample> = {
  Blank: { schema: {}, uiSchema: {}, formData: {} },
  Simple: simple,
  SignUp: SignUp,
  ForgotPassword: ForgotPassword,
  ResetPassword: ResetPassword,
  SignIn: SignInForm
};

export const samples = deepFreeze(_samples);
