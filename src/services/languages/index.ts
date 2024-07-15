import { delay } from "@/utils";
import CN from "./configs/cn.json";
import EN from "./configs/en.json";
import JA from "./configs/ja.json";

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

export function getDictionary() {
  switch (localStorage.__LANGUAGE__) {
    case Language.EN:
      return EN;
    case Language.JA:
      return JA;
    case Language.CN:
      return CN;
    default:
      return EN;
  }
}
