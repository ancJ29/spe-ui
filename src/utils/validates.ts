import { t as _t } from "@/common/utils";
import { getDictionary } from "@/services/languages";
import { z } from "zod";

const dictionary = getDictionary();

export const passwordSchemaValidate = () => {
  return z
    .string()
    .min(8, {
      message: _t(
        dictionary,
        "Password must be at least 8 characters",
      ),
    })
    .max(20, {
      message: _t(
        dictionary,
        "Password must be at most 20 characters",
      ),
    })
    .regex(/[A-Z]/, {
      message: _t(
        dictionary,
        "Password must contain at least one uppercase letter",
      ),
    })
    .regex(/[a-z]/, {
      message: _t(
        dictionary,
        "Password must contain at least one lowercase letter",
      ),
    })
    .regex(/[0-9]/, {
      message: _t(
        dictionary,
        "Password must contain at least one number",
      ),
    });
};

export const antiPhishingCodeValidate = () => {
  return z
    .string()
    .min(3, { message: _t(dictionary, "3-10 digits or letters") })
    .max(10, { message: _t(dictionary, "3-10 digits or letters") });
};

export const emailVerificationCodeValidate = () => {
  return z
    .string()
    .min(6, { message: _t(dictionary, "Verification code error") })
    .max(8, { message: _t(dictionary, "Verification code error") });
};

export const requiredFieldValidate = () => {
  return z
    .string()
    .min(1, { message: _t(dictionary, "It cannot be empty") });
};

export const emailValidate = () => {
  return z
    .string()
    .email({ message: _t(dictionary, "Invalid email address") });
};
