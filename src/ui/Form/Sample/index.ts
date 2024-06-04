import simple from "./simple";
import { Sample } from "./Sample";
import deepFreeze from "deep-freeze-es6";
import SignUp from "./Forms/SignUp";
import SignIn from "./Forms/SignIN";
import ForgotPassword from "./Forms/forgotPassword";
import ResetPassword from "./Forms/ResetPassword";


const _samples: Record<string, Sample> = {
  Blank: { schema: {}, uiSchema: {}, formData: {} },
  Simple: simple,
  SignUp: SignUp,
  SignIn: SignIn,
  ForgotPassword: ForgotPassword,
  ResetPassword: ResetPassword
};

export const samples = deepFreeze(_samples);
