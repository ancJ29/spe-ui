import deepFreeze from "deep-freeze-es6";
import simple from "./Forms/simple";
import { Sample } from "./Sample";
import SignUp from "./Forms/SignUp";
import ForgotPassword from "./Forms/forgotPassword";
import ResetPassword from "./Forms/ResetPassword";
import SignIn from "./Forms/SignIN";


const _samples: Record<string, Sample> = {
  Blank: { schema: {}, uiSchema: {}, formData: {} },
  Simple: simple,
  SignUp: SignUp,
  ForgotPassword: ForgotPassword,
  ResetPassword: ResetPassword,
  SignIn: SignIn
};

export const samples = deepFreeze(_samples);
