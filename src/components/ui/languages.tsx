"use client";

import { Button } from "./button";
import { Globe } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useLanguage } from "@/providers/language";
import { languages } from "@/utilities/constants";
import { Locale } from "@/utilities/i18n/config";

export const LanguagesButton = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: Locale) => {
    setLanguage(lang);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="icon" size="clear" className="group h-8 w-8">
          <Globe className="h-4 w-4 lg:h-5 lg:w-5 text-inherit" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" align="center" className="mr-1 p-0 flex w-fit gap-2 border-none shadow-none bg-transparent">
        {languages.map((lang) => (
          <Button key={lang.code} variant="icon" size="clear" onClick={() => handleLanguageChange(lang.code as Locale)} className={`group h-8 w-8 ${language === lang.code ? "bg-primary text-white" : ""}`}>
            <span className="text-sm uppercase">{lang.code}</span>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
