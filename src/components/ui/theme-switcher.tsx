"use client";

import { Button } from "./button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Button variant="icon" size="clear" className="group h-8 w-8" onClick={handleThemeToggle}>
      {theme === "dark" ? <Sun className="h-4 w-4 lg:h-5 lg:w-5 text-inherit" /> : <Moon className="h-4 w-4 lg:h-5 lg:w-5 text-inherit" />}
    </Button>
  );
};
