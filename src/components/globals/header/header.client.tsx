"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LanguagesButton } from "@/components/ui/languages";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Menu } from "@/components/ui/menu";

interface Navigation {
  label: string;
  url: string;
  isExternal: boolean;
}

interface HeaderData {
  logo: {
    url: string;
    alt?: string;
  };
  navigations: Navigation[];
}

const Header = ({ data }: { data: HeaderData }) => {
  return (
    <header className="sticky top-6 z-50">
      <div className="container">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <div className="relative h-10 w-32">{data.logo?.url && <Image src={data.logo.url} alt={data.logo.alt || "Logo"} fill className="object-contain" priority sizes="calc(100vw - 32px)" />}</div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <nav className="flex items-center justify-center gap-6">
              {data.navigations?.map((item: Navigation, index: number) => (
                <Button key={index} variant="nav" className={`${index === 0 ? "text-primary-dark" : ""}`} asChild>
                  <Link href={item.url} target={item.isExternal ? "_blank" : undefined} rel={item.isExternal ? "noopener noreferrer" : undefined}>
                    {item.label}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-shrink-0 items-center gap-2">
            <LanguagesButton />
            <ThemeSwitcher />
            <Menu navigations={data.navigations} />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
