import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeColor =
  | "zinc"
  | "red"
  | "green"
  | "blue"
  | "orange"
  | "violet";

interface ThemeState {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "zinc",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    }
  )
);
