"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type Language = "en" | "vi"

interface LanguageStore {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
      toggleLanguage: () =>
        set((state) => ({
          language: state.language === "en" ? "vi" : "en",
        })),
    }),
    {
      name: "language-storage",
    },
  ),
)
