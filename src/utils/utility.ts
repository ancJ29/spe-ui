import { debounce } from "lodash";

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
  const region = `+${parseInt(phoneLocale || "1")}`;
  return `${region}${(mobile || "").replace(/^0/g, "")}`;
}

export function extractSuffix(obj: unknown) {
  return (obj as { suffix?: string })?.suffix || "USDT";
}
