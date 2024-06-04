import deepFreeze from "deep-freeze-es6";
import ResetPassword from "./Forms/ResetPassword";
import SignIn from "./Forms/SignIn";
import SignUp from "./Forms/SignUp";
import ForgotPassword from "./Forms/forgotPassword";
import { Sample } from "./Sample";
import simple from "./simple";


const _samples: Record<string, Sample> = {
  Blank: { schema: {}, uiSchema: {}, formData: {} },
  Simple: simple,
  SignUp: SignUp,
  SignIn: SignIn,
  ForgotPassword: ForgotPassword,
  ResetPassword: ResetPassword
};

export const samples = deepFreeze(_samples);
