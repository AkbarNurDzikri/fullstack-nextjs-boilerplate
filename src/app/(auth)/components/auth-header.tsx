"use client";

import { ThemeCustomizer } from "@/components/theme-customizer";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-10 w-10 rounded-full border-2 hover:cursor-pointer"
    >
      {theme === "dark" ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </Button>
  );
}

export function AuthHeader() {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
      <ThemeCustomizer />
      <ModeToggle />
    </div>
  );
}
