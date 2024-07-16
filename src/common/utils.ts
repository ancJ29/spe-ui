import BN from "./big-number";
import { GenericObject } from "./types";

export function t(
  dictionary: Record<string, string>,
  key?: string,
  ...args: (string | number)[]
) {
  if (localStorage.___CHECK_LANGUAGE___ === "1") {
    return "xxxxxxxxx";
  }
  if (!key) {
    return "";
  }
  if (dictionary[key]) {
    return _convert(dictionary[key], ...args);
  } else {
    return _convert(key, ...args);
  }
}

function _convert(
  template: string,
  ...args: (string | number)[]
): string {
  let result = template;
  args.forEach((arg) => {
    result = arg
      ? result.replace("%s", (arg || "").toString())
      : result;
  });
  return result;
}

export function randomAddress(chain?: string) {
  let list = "0123456789abcdef".split("");
  let length = 40;
  let prefix = "0x";
  if (chain === "Bitcoin") {
    list =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
        "",
      );
    prefix = "3";
    length = 33;
  }

  return (
    prefix +
    new Array(length)
      .fill(0)
      .map(() => list[Math.floor(Math.random() * list.length)])
      .join("")
  );
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomString() {
  return (Math.random() + 1).toString(36).substring(7);
}

export function cleanObj<T extends Record<string, unknown>>(obj: T) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
}

export function code(length = 6) {
  return Math.random()
    .toString()
    .slice(2, 2 + length);
}

export function last<T>(arr: T[]) {
  return arr.length ? arr[arr.length - 1] : undefined;
}

export function shuffle<T>(arr: T[]) {
  if (arr.length < 2) {
    return arr;
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

export function unique<T>(arr: T[]) {
  return [...new Set(arr)];
}

export function chunk<T>(arr: T[], size: number) {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

export function buildContentFromTemplate(
  template: string,
  params: Record<string, string>,
) {
  return Object.entries(params).reduce((content, [key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    return content.replace(regex, value);
  }, template);
}

export function buildOptions<T extends GenericObject>(
  arr: T[],
  key: string,
  value: string,
) {
  return arr.map((item) => ({
    label: item[key] as string,
    value: item[value] as string,
  }));
}

export function freeAmount({
  amount,
  locked,
}: {
  amount?: number | string;
  locked?: number | string;
}) {
  return BN.sub(amount || 0, locked || 0);
}

export function masking(text: string): string {
  if (text.includes("@")) {
    const [username, domain] = text.split("@");
    if (username.length > 6) {
      return `${username.slice(0, 3)}***@${masking(domain)}`;
    }
    return `${username.slice(0, 1)}***@${masking(domain)}`;
  }
  return text.replace(/.(?=.{4})/g, "*");
}

export function dailyChange(lastPrice: number, high: number, low: number) {
  const change24h = Number(BN.sub(high, low));
  const percent = low ? Number(BN.div(BN.mul(change24h, 100), low)) : 0;
  return { change24h, percent }
}
