import {
  ForgotPasswordFormData,
  ForgotPasswordPayload,
} from "@/types";

export function convertToForgotPasswordFormData(
  formData: ForgotPasswordFormData,
) {
  if (formData.type === "1") {
    return {
      email: formData.email?.email,
      type: 1,
    } as ForgotPasswordPayload;
  }
  return {
    email: formData.mobile?.mobile || "",
    type: 2,
  } as ForgotPasswordPayload;
}
