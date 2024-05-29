import { delay } from "@/utils";
import CN from "./configs/cn.json";
import EN from "./configs/en.json";
import JA from "./configs/ja.json";

// export type Language = "EN" | "JA" | "CN";
export enum Language {
  EN = "EN",
  JA = "JA",
  CN = "CN",
}

export type Dictionary = Record<string, string>;

export async function loadDictionaries(lang: Language) {
  await delay(10);
  return {
    [Language.EN]: EN,
    [Language.JA]: JA,
    [Language.CN]: CN,
  }[lang] as Dictionary;
}
