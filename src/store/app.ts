import { Language } from "@/services/languages";
import { create } from "zustand";

type AppStore = {
  language: Language;
};

export default create<AppStore>(() => ({
  language: Language.EN,
}));
