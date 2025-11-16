import { create } from "zustand";

export const useTranslationStore = create((set) => ({
  translation: {},
  setTranslation: (translation) => set({ translation }),
}));
