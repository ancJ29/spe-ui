import deepFreeze from "deep-freeze-es6";
import ResetPassword from "./Forms/ResetPassword";
import SignIn from "./Forms/SignIn";
import SignUp from "./Forms/SignUp";
import ForgotPassword from "./Forms/forgotPassword";
import simple from "./Forms/simple";
import { Sample } from "./Sample";


const _samples: Record<string, Sample> = {
  Blank: { schema: {}, uiSchema: {}, formData: {} },
  Simple: simple,
  SignUp: SignUp,
  ForgotPassword: ForgotPassword,
  ResetPassword: ResetPassword,
  SignIn: SignIn
};

export const samples = deepFreeze(_samples);
