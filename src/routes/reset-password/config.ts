import { ResetPasswordFormData, ResetPasswordPayload } from "@/types";

export function convertToResetPasswordFormData(formData: ResetPasswordFormData) {
  if (formData.type === "1") {
    return {
      type: 1,
      email: formData.email.email || "",
      password: formData.email?.password || "",
      code: formData.email?.code || "",
      mfaCode: formData.email?.mfaCode || "",
    } as ResetPasswordPayload;
  }
  const region = `+${parseInt(
    formData.mobile?.phoneLocale || "1",
  )}`;
  const mobile = (formData.mobile?.mobile || "").replace(/^0/g, "");
  return {
    type: 2,
    mobile: region + mobile,
    password: formData.mobile?.password || "",
    code: formData.mobile?.code || "",
    mfaCode: formData.mobile?.mfaCode || "",
  } as ResetPasswordPayload;
}
