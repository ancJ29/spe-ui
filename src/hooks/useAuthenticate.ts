import { convertToCheckFormData, convertToForgotPasswordFormData, convertToLoginFormData, convertToResetPasswordFormData, convertToSignUpFormData } from "@/routes/login/config";
import axios from "@/services/apis/api";
import { samples } from "@/ui/Form/Sample";
import { error, success } from "@/utils/notifications";
import { useRef, useState } from "react";
import * as R from "ramda";

type status2FA = "disabled" | "enabled" | "notset";
type check2fa = { formData: any, is2FA: status2FA, toggle: () => void, close: () => void };
type loginInfo = { formData: any, is2FA: status2FA };

const check2fa = ({ formData, is2FA, toggle, close }: check2fa): Promise<loginInfo> => {
  return new Promise((resolve) => {
    if (is2FA !== "notset") {
      resolve({ is2FA, formData });
    } else {
      toggle();
      axios.post("/api/check", convertToCheckFormData(formData)).then(res => {
        const hasMfa = Boolean(res.data?.result?.hasMfa);
        const status: status2FA = hasMfa ? "enabled" : "disabled";
        if (hasMfa) {
          success("Enable Two-Factor Authentication", "Two-Factor Authentication (2FA) has been enabled successfully on your account. Your account is now more secure.", {
            color: "teal",
            position: "top-left"
          });
        } else {
          success("Disable Two-Factor Authentication", "Two-Factor Authentication (2FA) has been disabled successfully on your account. Remember to enable it again for added security.", {
            color: "orange",
            position: "top-center",
          });
        }

        resolve({ is2FA: status, formData });
      }).catch(err => {
        error("Checking Two-Factor Authentication Something went wrong", "Please try again");
      }).finally(close);
    }
  });
};

export function useAuthenticate() {
  const formRef = useRef<any>(null);
  const [is2Fa, setIs2FA] = useState<status2FA>("notset");

  const login = async ({ formData }: loginInfo) => {
    formRef.current?.toggle();
    axios.post("/api/login", convertToLoginFormData(formData, is2Fa === "enabled")).then(res => {
      if (res.data.result === null) {
        error("Invalid credentials", res.data.message);
      } else {
        authenticated(res.data.result);
      }
    }).catch(err => {
      // error(error.message)
      console.log(err);
      error("Invalid credentials", err.message);
    }).finally(() => {
      formRef.current?.close();
    });
  };

  const signUp = async ({ formData }: loginInfo) => {
    formRef.current?.toggle();
    axios.post("/api/register", convertToSignUpFormData(formData, is2Fa === "enabled")).then(res => {
      if (res.data.result === null) {
        error("Invalid credentials", res.data.message);
      } else {
        success("Account Registration Successful", `
                    Congratulations! Your account has been successfully created. Welcome to our community. Please check your email for a verification link to complete your registration.
                    `);
        authenticated(res.data.result);
      }
    }).catch(err => {
      console.log(err);
      error("Invalid credentials", err.message);
    }).finally(() => {
      formRef.current?.close();
    });
  };

  const forgotPassword = async ({ formData }: loginInfo) => {
    formRef.current?.toggle();
    axios.post("/api/password/forgot", convertToForgotPasswordFormData(formData, is2Fa === "enabled")).then(res => {
      if (res.data.result === null) {
        error("Invalid credentials", res.data.message);
      } else {
        success("Account Registration Successful", "You have successfully submitted a password change request.");
      }
    }).catch(err => {
      console.log(err);
      error("Invalid credentials", err.message);
    }).finally(() => {
      formRef.current?.close();
    });
  };

  const resetPassword = async ({ formData }: loginInfo) => {
    formRef.current?.toggle();
    axios.post("/api/password/reset", convertToResetPasswordFormData(formData, is2Fa === "enabled")).then(res => {
      if (res.data.result === null) {
        error("Invalid credentials", res.data.message);
      } else {
        success("Password Reset Successful", "Your password has been successfully reset. You can now log in with your new password. If you did not request this change, please contact our support team immediately.");
      }
    }).catch(err => {
      console.log(err);
      error("Invalid credentials", err.message);
    }).finally(() => {
      formRef.current?.close();
    });
  };

  const processlogin = (_props: any) => {
    R.pipeWith(R.andThen, [
      check2fa, 
      ({ formData, is2FA }: loginInfo): Promise<loginInfo> => {
        return new Promise((resolve) => {
          if (is2FA === "enabled") {
            formRef.current?.setSchema(samples.SignIn2FAFormSchema.schema);
            formRef.current?.setUiSchema(samples.SignIn2FAFormSchema.uiSchema);
            resolve({ formData, is2FA });
          } else {
            resolve({ formData, is2FA });
          }
        });
      }
    ])({
      formData: _props.formData,
      is2FA: is2Fa,
      close: formRef.current?.close,
      toggle: formRef.current?.toggle
    }).then((rs: loginInfo) => {
      console.log("LOGIN_THEN", rs);
      if (rs.is2FA != "notset" && is2Fa !== "notset") {
        login(rs);
      }
      setIs2FA(rs.is2FA);
    });
  };

  const processSignUp = (_props: any) => {
    R.pipeWith(R.andThen, [
      check2fa, 
      ({ formData, is2FA }: loginInfo): Promise<loginInfo> => {
        return new Promise((resolve) => {
          if (is2FA === "enabled") {
            formRef.current?.setSchema(samples.SignUp2FASchema.schema);
            formRef.current?.setUiSchema(samples.SignUp2FASchema.uiSchema);
            resolve({ formData, is2FA });
          } else {
            resolve({ formData, is2FA });
          }
        });
      }
    ])({
      formData: _props.formData,
      is2FA: is2Fa,
      close: formRef.current?.close,
      toggle: formRef.current?.toggle
    }).then((rs: loginInfo) => {
      console.log("LOGIN_THEN", rs);
      if (rs.is2FA != "notset" && is2Fa !== "notset") {
        signUp(rs);
      }
      setIs2FA(rs.is2FA);
    });
  };

  const processForgotPassword = (_props: any) => {
    R.pipeWith(R.andThen, [check2fa, ({ formData, is2FA }: loginInfo): Promise<loginInfo> => {
      return new Promise((resolve) => {
        if (is2FA === "enabled") {
          formRef.current?.setSchema(samples.ForgotPassword2FASchema.schema);
          formRef.current?.setUiSchema(samples.ForgotPassword2FASchema.uiSchema);
          resolve({ formData, is2FA });
        } else {
          resolve({ formData, is2FA });
        }
      });
    }])({
      formData: _props.formData,
      is2FA: is2Fa,
      close: formRef.current?.close,
      toggle: formRef.current?.toggle
    }).then((rs: loginInfo) => {
      console.log("LOGIN_THEN", rs);
      if (rs.is2FA != "notset" && is2Fa !== "notset") {
        forgotPassword(rs);
      }
      setIs2FA(rs.is2FA);
    });
  };

  const processResetPassword = (_props: any) => {
    R.pipeWith(R.andThen, [
      check2fa,
      ({ formData, is2FA }: loginInfo): Promise<loginInfo> => {
        return new Promise((resolve) => {
          if (is2FA === "enabled") {
            formRef.current?.setSchema(samples.ResetPassword2FASchema.schema);
            formRef.current?.setUiSchema(samples.ResetPassword2FASchema.uiSchema);
            resolve({ formData, is2FA });
          } else {
            resolve({ formData, is2FA });
          }
        });
      }
    ])({
      formData: _props.formData,
      is2FA: is2Fa,
      close: formRef.current?.close,
      toggle: formRef.current?.toggle
    }).then((rs: loginInfo): Promise<any> => {
      return new Promise(() => {
        console.log("LOGIN_THEN", rs);
        if (rs.is2FA != "notset" && is2Fa !== "notset") {
          resetPassword(rs);
        }
        setIs2FA(rs.is2FA);
      });
    });
  };


  const authenticated = (res: any) => {
    console.log(res);
    if(res.token) {
      localStorage.setItem("__USER__", "true");
      localStorage.setItem("token", res.token);
      window.open("/", "_self");
    }else {
      window.open("/login", "_self");
    }
        
  };

  return {
    is2Fa,
    setIs2FA,
    login: processlogin,
    signUp: processSignUp,
    forgotPassword: processForgotPassword,
    resetPassword: processResetPassword,
    formRef
  };
}

