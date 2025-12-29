"use client";

import * as React from "react";
import { useThemeStore } from "@/store/theme-store";

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

export function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  const { theme } = useThemeStore();

  React.useEffect(() => {
    const body = document.body;
    // Remove all previous theme classes
    body.classList.remove(
      "theme-zinc",
      "theme-red",
      "theme-green",
      "theme-blue",
      "theme-orange",
      "theme-violet"
    );
    // Add current theme class
    body.classList.add(`theme-${theme}`);
  }, [theme]);

  // Return children directly; or a div if you need a wrapper
  return <>{children}</>;
}
