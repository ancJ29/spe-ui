import { LoginFormData, LoginPayload } from "@/types";

export function convertToLoginFormData(formData: LoginFormData) {
  if (formData.type === "1") {
    return {
      email: formData.email?.email || "",
      type: 1,
      password: formData.email?.password || "",
      mfaCode: formData.email?.mfaCode || "",
    } as LoginPayload;
  }
  const region = `+${parseInt(
    formData.mobile?.phoneLocale || "1",
  )}`;
  const mobile = (formData.mobile?.mobile || "").replace(/^0/g, "");
  return {
    type: 2,
    mobile: region + mobile,
    password: formData.mobile?.password || "",
    mfaCode: formData.mobile?.mfaCode || "111111", // TODO: remove this
  } as LoginPayload;
}
