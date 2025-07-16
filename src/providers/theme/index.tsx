"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeLocalStorageKey = "payload-theme";
const getStoredTheme = (): "light" | "dark" | null => {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(themeLocalStorageKey);
  return stored === "light" || stored === "dark" ? stored : null;
};

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<"light" | "dark">(() => getStoredTheme() || getSystemTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(themeLocalStorageKey, theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: "light" | "dark") => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};
