import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import en from "@/utils/translation/en";
import vi from "@/utils/translation/vi";

const languages: Record<string, any> = { en, vi };
const DEFAULT_LANGUAGE = "vi";

interface LanguageState {
  currentLang: string;
  translation: Record<string, string>;
  setLanguage: (lang: string) => Promise<void>;
  loadLanguage: () => Promise<void>;
}

// 🏪 Zustand Store
export const useLanguage = create<LanguageState>((set) => ({
  currentLang: DEFAULT_LANGUAGE,
  translation: languages[DEFAULT_LANGUAGE],

  // Hàm tải ngôn ngữ từ SecureStore
  loadLanguage: async () => {
    const lang = (await SecureStore.getItem("appLanguage")) || DEFAULT_LANGUAGE;
    set({ currentLang: lang, translation: languages[lang] });
  },

  // Hàm đổi ngôn ngữ và lưu vào SecureStore
  setLanguage: async (lang: string) => {
    if (languages[lang]) {
      await SecureStore.setItem("appLanguage", lang);
      set({ currentLang: lang, translation: languages[lang] });
    }
  },
}));
