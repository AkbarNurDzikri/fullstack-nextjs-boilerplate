"use client";

import * as React from "react";
import { useThemeStore, ThemeColor } from "@/store/theme-store";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const themes: { name: ThemeColor; color: string }[] = [
  { name: "zinc", color: "bg-zinc-900" },
  { name: "red", color: "bg-red-500" },
  { name: "green", color: "bg-green-500" },
  { name: "blue", color: "bg-blue-500" },
  { name: "orange", color: "bg-orange-500" },
  { name: "violet", color: "bg-violet-500" },
];

export function ThemeCustomizer() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex items-center gap-2">
      {themes.map((t) => (
        <Button
          key={t.name}
          variant={"outline"}
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full border-2",
            theme === t.name ? "border-primary" : "border-transparent"
          )}
          onClick={() => setTheme(t.name)}
        >
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              t.color
            )}
          >
            {theme === t.name && <Check className="h-4 w-4 text-white" />}
          </span>
          <span className="sr-only">{t.name}</span>
        </Button>
      ))}
    </div>
  );
}
