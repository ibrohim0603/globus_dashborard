import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLang = create(
  persist(
    (set) => ({
      lang: "en",
      setLang: (newLang) =>
        set(() => ({
          lang: newLang,
        })),
    }),
    { name: "login" }
  )
);
