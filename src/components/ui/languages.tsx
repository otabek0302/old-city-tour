"use client";

import { Button } from "./button";
import { Globe, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useLanguage } from "@/providers/language";
import { languages } from "@/utilities/constants";
import { Locale } from "@/utilities/i18n/config";
import { useEffect, useState } from "react";

export const LanguagesButton = () => {
  const { language, setLanguage, isChangingLanguage } = useLanguage();
  const [path, setPath] = useState("left");

  const handleLanguageChange = (lang: Locale) => {
    if (isChangingLanguage || lang === language) return;
    setLanguage(lang);
    setPath("left");
  };

  useEffect(() => {
    window.innerWidth < 768 ? setPath("bottom") : setPath("left");
  }, [language]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="icon" size="clear" className="group h-8 w-8 relative" disabled={isChangingLanguage}>
          {isChangingLanguage ? <Loader2 className="h-4 w-4 lg:h-5 lg:w-5 animate-spin text-inherit" /> : <Globe className="h-4 w-4 lg:h-5 lg:w-5 text-inherit" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent side={path as "left" | "top" | "right" | "bottom"} align="center" className={`${path === "bottom" ? "mt-1" : "mr-1"} p-0 flex w-fit gap-2 border-none shadow-none bg-transparent`}>
        {languages.map((lang) => (
          <Button key={lang.code} variant="icon" size="clear" onClick={() => handleLanguageChange(lang.code as Locale)} disabled={isChangingLanguage} className={`group h-8 w-8 relative ${language === lang.code ? "bg-primary text-white" : ""} ${isChangingLanguage ? "opacity-50 cursor-not-allowed" : ""}`}>
            {isChangingLanguage && language === lang.code ? <Loader2 className="h-3 w-3 animate-spin" /> : <span className="text-sm uppercase">{lang.code}</span>}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
