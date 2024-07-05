import { SignupFormData, SignupPayload } from "@/types";

export function convertToSignUpFormData(formData: SignupFormData) {
  if (formData.type === "1") {
    return {
      email: formData.email?.email,
      type: 1,
      password: formData.email.password,
    } as SignupPayload;
  }
  const region = `+${parseInt(
    formData.mobile?.phoneLocale || "1",
  )}`;
  const mobile = (formData.mobile?.mobile || "").replace(/^0/g, "");
  return {
    type: 2,
    mobile: region + mobile,
    password: formData.mobile?.password || "",
  } as SignupPayload;
}
