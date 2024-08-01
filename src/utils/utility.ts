import logger from "@/services/logger";
import debounce from "lodash/debounce";

export function reloadWindow(delay = 500) {
  setTimeout(() => {
    window.location.reload();
  }, delay);
}

export function splitAndFormatString(str: string) {
  str = str.replace(/^linkTo/, "");
  str = str.replace(/^click/, "");
  str = str.replace(/^check/, "");
  let result = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}

export function debounceBuilder(
  fn: (...args: any[]) => void, // eslint-disable-line
  delay: number,
) {
  return debounce(fn, delay);
}

export function extractPhoneNumber({
  phoneLocale,
  mobile,
}: {
  phoneLocale?: string;
  mobile?: string;
} = {}) {
  logger.trace("extractPhoneNumber", phoneLocale, mobile);
  const region = `+${parseInt(phoneLocale || "1")}`;
  return `${region}${(mobile || "").replace(/^0/g, "")}`;
}

export function extractSuffix(obj: unknown) {
  return (obj as { suffix?: string })?.suffix || "USDT";
}

export function generateUri2FA(
  // cspell:disable
  type: "hotp" | "totp",
  label: string,
  secret: string,
  issuer: string,
  counter: string,
) {
  let s = `otpauth://${type}/${encodeURIComponent(
    label,
  )}?secret=${secret.replace(/ /g, "")}`;

  if (issuer !== "") {
    s += `&issuer=${encodeURIComponent(issuer)}`;
  }
  if (type === "hotp") {
    s += `&counter=${counter || "0"}`;
  }
  // if (advanced_options_checked) {
  //   s += `&algorithm=${algorithm}&digits=${digits}`;
  //   if (type === "totp") {
  //     s += `&period=${period || "30"}`;
  //   }
  // }
  return s;
  // cspell:enable
}

export function valueColor(value: number) {
  return value > 0 ? "green" : "red";
}


export function maskEmail(email: string) {
  const [username, domain] = email.split('@');
  const maskedUsername = username[0] + '*'.repeat(username.length - 2) + username[username.length - 1];
  const maskedEmail = `${maskedUsername}@${domain}`;
  return maskedEmail;
}
